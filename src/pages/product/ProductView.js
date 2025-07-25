import React from "react";
import "../../styles/ProductView.css";
import productImage from "../../assets/facom.png";
import { translateArabicColorToCss } from "../../hooks/translateColor";
import Barcode from "react-barcode";

const ProductView = () => {
  const product = {
    name: "بخاخ زيت ذهبي",
    description: "بخاخ مثالي للزيوت العطرية ومستحضرات التجميل.",
    category: "بخاخات",
    location: "الطابق الأول",
    storage: "مخزن  ",
    usage: "يستخدم لتعبئة الزيوت",
    material: "بلاستيك + معدن",
    quantity: "152 × 13",
    stock: 7197,
    price: 999,
    color: "ذهبي",
    itemId: 86,
  };

  const colorCode = translateArabicColorToCss(product.color);
  const barcodeValue = product.itemId.toString().padStart(8, "0");

  return (
    <div className="product-page">
      <div className="product-content">
        {/* معلومات المنتج */}
        <div className="product-info">
          <small className="product-category">{product.category}</small>
<h2>{product.name}</h2>

          <p>{product.description}</p>
          <ul>
           
            <li className="location-box">
  <span> {product.location}</span>
  <span> {product.storage}</span>
</li>

            <li><strong>الاستخدام:</strong> {product.usage}</li>
            <li><strong>المادة:</strong> {product.material}</li>
            <li><strong>الكمية:</strong> {product.quantity}</li>
            <li><strong>الرصيد:</strong> {product.stock.toLocaleString()}</li>
            <li><strong>السعر:</strong> ${product.price}</li>
            <li style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <strong>اللون:</strong>
              <span
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  backgroundColor: colorCode,
                  border: "1px solid #999",
                }}
              />
              <span>{product.color}</span>
            </li>
          </ul>

          {/* باركود */}
          <div className="barcode">
            <Barcode value={barcodeValue} height={50} width={1.5} displayValue={false} />
          </div>
        </div>

        {/* صورة المنتج */}
        <div className="product-image-container">
          <img src={productImage} alt="المنتج" className="product-image" />
          <div className="product-shadow"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
