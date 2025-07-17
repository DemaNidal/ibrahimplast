import React, { useState } from "react";
import "../styles/SearchProduct.css";
import ProductCard from "../components/Products/ProductCard";
import testImage from "../assets/test.png";
import CustomDropDown from "../components/dropdown/CustomDropDown";
// const products = [
//   { name: "Beige Handbag", price: "$200", sold: 382, outOfStock: false },
//   { name: "Pink Quilted Bag", price: "$200", sold: 382, outOfStock: false },
//   { name: "Small Handbag", price: "$150", sold: 382, outOfStock: false },
//   { name: "Pink Quilted Bag", price: "$200", sold: 382, outOfStock: false },
//   { name: "Velvet Shoes", price: "$200", sold: 382, outOfStock: true },
//   { name: "Satchel Bag", price: "$150", sold: 382, outOfStock: true },
//   { name: "Beige Handbag", price: "$140", sold: 382, outOfStock: false },
//   { name: "Beige Handbag", price: "$200", sold: 382, outOfStock: false },
//   { name: "Purple Handbag", price: "$200", sold: 382, outOfStock: false },
// ];

const SearchProduct = () => {
  const rawOptions = ["أضيف حديثا", "الأقدم"];

  const dropdownOptions = rawOptions.map((text) => ({
    label: text,
    value: text.replace(/\s/g, "-").toLowerCase(), // ex: "أضيف حديثا" → "أضيف-حديثا"
  }));

  const [showImage, setShowImage] = useState(true);
  const [hideAnimation, setHideAnimation] = useState(false);

  const handleClose = () => {
    setHideAnimation(true);
    setTimeout(() => {
      setShowImage(false);
    }, 300); // نفس مدة الأنيميشن
  };
  return (
    <div className="search-page">
      {showImage && (
        <div className={`top-section ${hideAnimation ? "fade-out" : ""}`}>
          <div className="image-wrapper">
            <img src={testImage} alt="Search match" className="search-image" />
            <button
              className="close-button"
              onClick={handleClose}
              aria-label="إغلاق الصورة"
            >
              ×
            </button>
          </div>
        </div>
      )}
      <div className="top-bar">
        <div className="product-count">1001 منتج</div>
        {/* <select className="sort-dropdown">
          <option>اضيف حديثا</option>
          <option>الاقدم</option>
        </select> */}
        <CustomDropDown options={dropdownOptions} />
      </div>

      <div className="content">
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

        <div className="product-grid">
            <ProductCard />
             <ProductCard />
              <ProductCard />
               <ProductCard />
                <ProductCard />

                 <ProductCard />
                  <ProductCard />
                   <ProductCard />
                    <ProductCard />
                     <ProductCard />
        </div>
      </div>

      <div className="pagination">
        <button>{"<"}</button>
        <button>1</button>
        <button>2</button>
        <button className="active">3</button>
        <button>4</button>
        <button>5</button>
        <span>...</span>
        <button>11</button>
        <button>{">"}</button>
      </div>
    </div>
  );
};

export default SearchProduct;
