import React from 'react';
import { Card, Form } from 'react-bootstrap';
import CustomDropDown from '../dropdown/CustomDropDown';
import { useLookupData } from '../../hooks/useLookupData';
import { fetchCurrencies } from '../../services/lookupService';
import { useProduct } from '../../context/ProductContext';

const PricingCard = () => {
  const currencies = useLookupData(fetchCurrencies, 'currency_id', 'currency_name');
  const { product, setProduct } = useProduct();

  const handlePriceChange = (e) => {
    setProduct(prev => ({
      ...prev,
      price: e.target.value
    }));
  };

  const handleCurrencyChange = (selected) => {
    setProduct(prev => ({
      ...prev,
      currencyId: selected?.value || null,
      currencyName: selected?.label || ''
    }));
  };

  return (
    <Card
      className="outline-card border-0"
    >
      <Card.Body>
        <h5 className="mb-3">تفاصيل السعر</h5>
        <Form>
          {/* حقل السعر */}
          <Form.Group className="mb-3" controlId="productPrice">
            <Form.Label>
              السعر الأساسي <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="number"
              placeholder="سعر المنتج"
              value={product.price || ''}
              onChange={handlePriceChange}
            />
            <Form.Text className="text-muted">حدد سعر المنتج</Form.Text>
          </Form.Group>

          {/* قائمة العملة */}
          <CustomDropDown
            options={currencies}
            label="العملة"
            placeholder="اختر العملة"
            onChange={handleCurrencyChange}
            value={currencies.find(opt => opt.value === product.currencyId) || null}
          />
        </Form>
      </Card.Body>
    </Card>
  );
};

export default PricingCard;
