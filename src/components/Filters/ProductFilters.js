import React from 'react'
import '../../styles/ProductFilters.css'

function ProductFilters() {
  return (
      <div className="filters" dir="rtl">
          <div className="filter-header">
            <span style={{ fontWeight: "600" }}>تصفيه</span>
          </div>

          <div className="filter-group">
            <div className="row">
              <div className="col">
                <h4>الفئة</h4>
              </div>
              <div className="col">
                <button>مسح الكل</button>
              </div>
            </div>
            <label>
              <input type="checkbox" /> أغطية
            </label>
            <label>
              <input type="checkbox" /> بخاخات
            </label>
            <label>
              <input type="checkbox" /> زجاج
            </label>
            <label>
              <input type="checkbox" /> علب بلاستيك
            </label>
            <label>
              <input type="checkbox" /> جلان
            </label>
            <label>
              <input type="checkbox" /> سلندرات
            </label>
            <label>
              <input type="checkbox" /> محارم
            </label>
            <label>
              <input type="checkbox" /> كاسات
            </label>
            <label>
              <input type="checkbox" /> سطل
            </label>
            <label>
              <input type="checkbox" /> مطبوعات
            </label>
            <label>
              <input type="checkbox" /> رولات
            </label>
            <label>
              <input type="checkbox" /> مادة خام
            </label>
          </div>

          <div className="filter-group">
            <h4>مصنوع من</h4>
            <label>
              <input type="radio" name="material" value="بلاستيك" /> بلاستيك
            </label>
            <label>
              <input type="radio" name="material" value="زجاج" /> زجاج
            </label>
            <label>
              <input type="radio" name="material" value="فلين" /> فلين
            </label>
            <label>
              <input type="radio" name="material" value="بوليستر" /> بوليستر
            </label>
            <label>
              <input type="radio" name="material" value="سيليكون" /> سيليكون
            </label>
          </div>

          <div className="filter-group">
            <h4>الحجم</h4>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <input placeholder="الحجم" className="size-input" />
              <select className="size-unit">
                <option value="cm">سم</option>
                <option value="m">متر</option>
                <option value="inch">إنش</option>
              </select>
            </div>
          </div>

          <div className="filter-group">
            <h4>مكان التخزين</h4>
            <label>
              <input type="radio" name="material" value="بلاستيك" /> الساحة
            </label>
            <label>
              <input type="radio" name="material" value="زجاج" /> الطابق 3
            </label>
            <label>
              <input type="radio" name="material" value="فلين" /> الطابق 2
            </label>
            <label>
              <input type="radio" name="material" value="بوليستر" /> الطابق 1
            </label>
            <label>
              <input type="radio" name="material" value="سيليكون" /> البركس
            </label>
            <label>
              <input type="radio" name="material" value="سيليكون" /> البيارة
            </label>
          </div>
          <div className="filter-group">
            <h4>الباركود</h4>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <input placeholder="الباركود" className="size-input" />
            </div>
          </div>
        </div>
  )
}

export default ProductFilters
