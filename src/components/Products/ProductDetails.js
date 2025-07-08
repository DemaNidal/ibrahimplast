import React from 'react';
import { Card } from 'react-bootstrap';
import CustomDropDown from '../dropdown/CustomDropDown';
import { fetchCategories, fetchUsages } from '../../services/lookupService';
import { useLookupData } from '../../hooks/useLookupData';
import { useProduct } from '../../context/ProductContext';
import '../../styles/categoryButtonStyle.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const ProductDetails = () => {
  const categories = useLookupData(fetchCategories, 'category_id', 'category_name');
  const usages = useLookupData(fetchUsages, 'usage_id', 'usage_name');
  const { product, setProduct } = useProduct();

  const handleCategoryChange = (selected) => {
    setProduct(prev => ({
      ...prev,
      categoryId: selected?.value || null,
      categoryName: selected?.label || ''
    }));
  };

  const handleUsageChange = (selected) => {
    setProduct(prev => ({
      ...prev,
      usageId: selected?.value || null,
      usageName: selected?.label || ''
    }));
  };

  return (
    <Card

      className=" mb-4 outline-card border-0"
    >
      <Card.Body>
        <Card.Title>تفاصيل المنتج</Card.Title>

        {/* الفئة */}
        <CustomDropDown
          options={categories}
          label="الفئة"
          placeholder="تصنيف الفئة"
          onChange={handleCategoryChange}
          value={categories.find(opt => opt.value === product.categoryId) || null}
        />
        <small className="text-muted mt-2 d-block">
          اختر الفئة التي يصنف منها المنتج
        </small>

        <button className="btn-add-category mt-3">
          <i className="bi bi-plus"></i> إنشاء فئة جديدة
        </button>

        {/* الاستخدام */}
        <CustomDropDown
          options={usages}
          label="الاستخدام"
          placeholder="استخدام المنتج"
          onChange={handleUsageChange}
          value={usages.find(opt => opt.value === product.usageId) || null}
        />
        <small className="text-muted mt-2 d-block">
          اختر الاستخدام الشائع للمنتج
        </small>
      </Card.Body>
    </Card>
  );
};

export default ProductDetails;
