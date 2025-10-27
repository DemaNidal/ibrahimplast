import React from "react";
import ColorList from "../../components/ProductView/ColorList";
import "../../styles/ProductView.css";

const ProductHeader = ({product}) => (
     <div className="product-box header-box">
            <div className="title-row">
              <h2 className="product-title">{product.product_name}</h2>
              <div className="category-badge">
                {product.category_name} • {product.size_value}{" "}
                {product.size_unit_name}
              </div>
            </div>
            <p className="product-notes">{product.notes}</p>

            <div className="meta-row">
              <div>
                <strong>الاستخدام:</strong> {product.usage_name || "—"}
              </div>
              <div>
                <strong>المادة:</strong> {product.made_from_name || "—"}
              </div>
              <div>
                <strong>السعر:</strong>{" "}
                {product.price
                  ? `${product.price} ${product.currency_name || ""}`
                  : "—"}
              </div>
            </div>

            <div className="colors-row">
              <ColorList colors={product.colors || []} />
            </div>
          </div>
);

export default ProductHeader;