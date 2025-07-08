import React from 'react';
import { Card } from 'react-bootstrap';
import CustomDropDown from '../dropdown/CustomDropDown';
import { useLookupData } from '../../hooks/useLookupData';
import { fetchMadeFrom } from '../../services/lookupService';
import { useProduct } from '../../context/ProductContext';

const MadeFromCard = () => {
  const madeFromOptions = useLookupData(fetchMadeFrom, 'made_from_id', 'made_from_name');
  const { product, setProduct } = useProduct();

  const handleChange = (selected) => {
    setProduct(prev => ({
      ...prev,
      madeFrom: selected?.value || null,
      madeFromName: selected?.label || ''
    }));
  };

  return (
    <Card
      className="outline-card border-0"
    >
      <Card.Body>
        <Card.Title>مادة الصنع</Card.Title>
        <CustomDropDown
          options={madeFromOptions}
          label="مصنوع من"
          placeholder="اختر المادة المصنوع منها المنتج"
          onChange={handleChange}
          value={madeFromOptions.find(opt => opt.value === product.madeFrom) || null}
        />
        <small className="text-muted mt-2 d-block">
          قم بإختيار المادة التي صنع منها المنتج
        </small>
      </Card.Body>
    </Card>
  );
};

export default MadeFromCard;
