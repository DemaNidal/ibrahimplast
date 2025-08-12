// src/components/ProductView/ProductView.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/ProductView.css";
import Barcode from "react-barcode";
import { FaPrint } from "react-icons/fa";
import { fetchProductById } from "../../services/productService";
import LocationList from "../../components/ProductView/LoctationList";
import QuantityList from "../../components/ProductView/QuantityList";
import ColorList from "../../components/ProductView/ColorList";
import usePrintBarcode from "../../hooks/usePrintBarcode";

const ProductView = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const printBarcode = usePrintBarcode();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await fetchProductById(id);
        setProduct(response.data);
      } catch (err) {
        console.error("Failed to fetch product", err);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  if (loading) return <p>...جاري تحميل البيانات</p>;
  if (!product) return <p>تعذر العثور على المنتج</p>;

  const barcodeValue = product.product_id.toString().padStart(8, "0");

  return (
    <div className="product-page">
      <div className="product-content">
        <div className="product-info">
          <small className="product-category">
            <strong>{product.category_name}</strong> | {product.size_value}{" "}
            {product.size_unit_name}
          </small>

          <h2>{product.product_name}</h2>
          <p>{product.notes}</p>

          <LocationList locations={product.locations} />

          <ul>
            <li>
              <strong>الاستخدام:</strong> {product.usage_name}
            </li>
            <li>
              <strong>المادة:</strong> {product.made_from_name}
            </li>
            <li>
              <QuantityList quantities={product.quantities} Unit={product.quantity_unit} />
            </li>
            <li>
              <strong>السعر:</strong> ${product.price}
            </li>
            <li>
              <ColorList colors={product.colors} />
            </li>
          </ul>

          <div
            className="barcode"
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <Barcode
              value={barcodeValue}
              height={50}
              width={1.5}
              displayValue={false}
            />
            <FaPrint
              title="Print Barcode"
              style={{ cursor: "pointer", fontSize: 18 }}
              onClick={() => printBarcode(product, barcodeValue)}
            />
          </div>
        </div>

        <div className="product-image-container">
          <img
            src={`${process.env.REACT_APP_IMAGE_BASE_URL}${product.image_url}`}
            alt="المنتج"
            className="product-image"
          />

          <div className="product-shadow"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
