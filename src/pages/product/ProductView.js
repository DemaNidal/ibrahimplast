import React from "react";
import "../../styles/ProductView.css";
import productImage from "../../assets/بخاخ ذهبي كبير     2.8-2.8-4.7      86.png";

const ProductView = () => {
  // const product = {
  //   name: "بخاخ زيت أبيض",
  //   description: "يستخدم في التشحيم الصناعي",
  //   quantity: 20,
  //   material: "بلاستيك",
  //   price: "₪15.00",
  //   usage: "الصناعة العامة",
  // };

  return (
    <div className="product-page">
      {/* الصورة على اليمين والمعلومات على اليسار */}
      <div className="product-content">
        <div className="product-info">
          {/* <h2>{product.name}</h2>
          <p>{product.description}</p>
          <ul>
            <li><strong>الكمية:</strong> {product.quantity}</li>
            <li><strong>المادة:</strong> {product.material}</li>
            <li><strong>الاستخدام:</strong> {product.usage}</li>
            <li><strong>السعر:</strong> {product.price}</li>
          </ul>
          <button className="buy-button">شراء</button> */}
        </div>

       <div className="product-image-container">
  <img src={productImage} alt="المنتج" className="product-image" />
  <div className="product-shadow"></div> {/* هذا هو الخيال البيضاوي */}
</div>

      </div>
    </div>
  );
};

export default ProductView;
