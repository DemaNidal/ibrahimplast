import React, { useState } from "react";
import "../styles/SearchProduct.css";

import testImage from "../assets/test.png";
const products = [
  { name: "Beige Handbag", price: "$200", sold: 382, outOfStock: false },
  { name: "Pink Quilted Bag", price: "$200", sold: 382, outOfStock: false },
  { name: "Small Handbag", price: "$150", sold: 382, outOfStock: false },
  { name: "Pink Quilted Bag", price: "$200", sold: 382, outOfStock: false },
  { name: "Velvet Shoes", price: "$200", sold: 382, outOfStock: true },
  { name: "Satchel Bag", price: "$150", sold: 382, outOfStock: true },
  { name: "Beige Handbag", price: "$140", sold: 382, outOfStock: false },
  { name: "Beige Handbag", price: "$200", sold: 382, outOfStock: false },
  { name: "Purple Handbag", price: "$200", sold: 382, outOfStock: false },
];

const SearchProduct = () => {
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
  <select className="sort-dropdown">
    <option>Sort by Featured</option>
  </select>
</div>

      <div className="content">
       
        <div className="filters">
          <div className="filter-header">
            <span>تصفيه</span>
            <button>مسح الكل</button>
          </div>

          <div className="filter-group">
    <h4>الفئة</h4>
    <label><input type="checkbox" /> أغطية</label>
    <label><input type="checkbox" /> بخاخات</label>
    <label><input type="checkbox" /> زجاج</label>
    <label><input type="checkbox" /> علب بلاستيك</label>
    <label><input type="checkbox" /> جلان</label>
    <label><input type="checkbox" /> سلندرات</label>
    <label><input type="checkbox" /> محارم</label>
    <label><input type="checkbox" /> كاسات</label>
    <label><input type="checkbox" /> سطل</label>
    <label><input type="checkbox" /> مطبوعات</label>
    <label><input type="checkbox" /> رولات</label>
    <label><input type="checkbox" /> مادة خام</label>
  </div>

          <div className="filter-group">
            <h4>Size</h4>
            <label>
              <input type="checkbox" /> S
            </label>
            <label>
              <input type="checkbox" /> M
            </label>
            <label>
              <input type="checkbox" /> L
            </label>
          </div>

          <div className="filter-group">
            <h4>Price ($)</h4>
            <input type="range" min="0" max="1000" />
          </div>

          <div className="filter-group">
            <h4>Deals & Discounts</h4>
            <label>
              <input type="checkbox" /> All Discounts
            </label>
            <label>
              <input type="checkbox" /> Today’s Deals
            </label>
          </div>

          <div className="filter-group">
            <h4>New Arrivals</h4>
            <label>
              <input type="checkbox" /> Last 7 days
            </label>
            <label>
              <input type="checkbox" /> Last 30 days
            </label>
            <label>
              <input type="checkbox" /> Last 90 days
            </label>
          </div>

          <div className="filter-group">
            <h4>Rating</h4>
            <label>
              <input type="checkbox" /> ★★★★★
            </label>
            <label>
              <input type="checkbox" /> ★★★★☆
            </label>
            <label>
              <input type="checkbox" /> ★★★☆☆
            </label>
            <label>
              <input type="checkbox" /> ★★☆☆☆
            </label>
            <label>
              <input type="checkbox" /> ★☆☆☆☆
            </label>
          </div>
        </div>

        <div className="product-grid">
          {products.map((product, i) => (
            <div className="product-card" key={i}>
              <div className="product-img">
                <img src={testImage} alt={product.name} />
                {product.outOfStock && (
                  <span className="badge">Out of Stock</span>
                )}
                <span className="like-btn">♡</span>
              </div>
              <div className="product-info">
                <div className="product-name">{product.name}</div>
                <div className="product-price">{product.price}</div>
                <div className="rating">★★★★★</div>
                <div className="sold">{product.sold} items sold</div>
              </div>
            </div>
          ))}
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
