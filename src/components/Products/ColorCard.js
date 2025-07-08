// components/product/color/ColorCard.jsx

import React from 'react';
import { Card } from 'react-bootstrap';
import CustomDropDown from '../dropdown/CustomDropDown';
import { fetchColors } from '../../services/lookupService';
import { useLookupData } from '../../hooks/useLookupData';
import { translateArabicColorToCss } from '../../hooks/translateColor.js'
import { useProduct } from '../../context/ProductContext.js';// ← ربط الـ context

const ColorCard = () => {
  const colors = useLookupData(fetchColors, 'color_id', 'color_name');
  const { product, setProduct } = useProduct();

  //const selectedLabel = colors.find(opt => opt.value === product.color)?.label || null;

  const handleColorChange = (selected) => {
    setProduct(prev => ({
      ...prev,
      color: selected?.value || null,
      colorName: selected?.label || null
    }));
  };

  return (
    <Card

      className="mb-4 outline-card border-0"
    >
      <Card.Body style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Card.Title style={{ flex: '1 1 auto' }}>لون المنتج</Card.Title>

        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: '50%',
            backgroundColor: translateArabicColorToCss(product.colorName),
            border: '1px solid #999',
            transition: 'background-color 0.3s ease',
          }}
          title={product.colorName || 'لم يتم الاختيار'}
        ></div>

        <div style={{ flex: '2 1 auto', minWidth: 180 }}>
          <CustomDropDown
            options={colors}
            label="اللون"
            placeholder="اختر لون المنتج"
            onChange={handleColorChange}
            value={colors.find(opt => opt.value === product.color) || null}
          />
        </div>
      </Card.Body>
    </Card>
  );
};

export default ColorCard;
