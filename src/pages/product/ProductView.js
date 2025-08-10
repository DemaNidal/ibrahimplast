import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/ProductView.css";
import { translateArabicColorToCss } from "../../hooks/translateColor";
import Barcode from "react-barcode";
// import productImage from "../../assets/facom.png";
import { FaPrint } from "react-icons/fa";
import { fetchProductById } from "../../services/productService";

const ProductView = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const imageBaseUrl = "http://localhost:5000/uploads/";

  console.log("Product ID:", id); // لتتأكد أنه ليس undefined
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

  const handlePrintBarcode = () => {
    const printWindow = window.open("", "PRINT", "height=1000,width=1000");

    const locationText = product.locations
      ?.map((loc) => `${loc.location} - ${loc.warehouse_name}`)
      .join(", ");

    const htmlContent = `
<html>
  <head>
    <title>Barcode</title>
    <style>
      @media print {
        @page {
          size: 80mm 50mm;
          margin: 3mm;
        }
        body {
          margin: 0;
          padding: 0;
        }
      }

      body {
        text-align: center;
        font-family: Arial, sans-serif;
        padding: 0px;
      }
      .product-name {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 8px;
      }
      #barcode {
        margin: 0 auto;
        display: block;
      }
      .product-location {
        font-size: 16px;
        font-weight: bold;
        color: #000; /* Full black for clarity */
        margin-top: 6px;
        margin-bottom: 4px;
      }
      .barcode-value {
        font-size: 16px;
        letter-spacing: 6px;
        margin-top: 4px;
        margin-bottom: 6px;
      }
    </style>
  </head>
  <body>
    <div class="product-name">${product.product_name}</div>
    <svg id="barcode"></svg>
    <div class="product-location">${locationText || ""}</div>
    <div class="barcode-value">${barcodeValue}</div>
  </body>
</html>
`;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();

    printWindow.onload = () => {
      const script = printWindow.document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js";
      script.onload = () => {
        printWindow.JsBarcode("#barcode", barcodeValue, {
          format: "CODE128",
          width: 2,
          height: 60,
          displayValue: false,
          margin: 0,
        });
        printWindow.print();
        printWindow.close();
      };
      printWindow.document.body.appendChild(script);
    };
  };

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
          <ul>
            <div className="location-list">
              {product.locations?.map((loc, index) => (
                <span key={index} className="location-badge">
                  {loc.location} - {loc.warehouse_name}
                </span>
              ))}
            </div>

            <li>
              <strong>الاستخدام:</strong> {product.usage_name}
            </li>
            <li>
              <strong>المادة:</strong> {product.made_from_name}
            </li>

            <li>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                  marginTop: "5px",
                }}
              >
                {product.quantities?.map((q, index) => (
                  <span
                    key={index}
                    style={{
                      backgroundColor: "#f1f1f1",
                      padding: "4px 8px",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                    }}
                  >
                    {q.quantity_rows} × {q.quantity_per_row} = {q.total}{" "}
                    {q.unit}
                  </span>
                ))}
              </div>
            </li>

            <li>
              <strong>السعر:</strong> ${product.price}
            </li>

            <li>
              <div className="color-list">
                {product.colors?.map((color, index) => (
                  <div key={index} className="color-item">
                    <span
                      style={{
                        backgroundColor: translateArabicColorToCss(
                          color.color_name
                        ),
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        display: "inline-block",
                        border: "1px solid #999",
                        marginRight: "5px",
                      }}
                    ></span>
                    <span>{color.color_name}</span>
                  </div>
                ))}
              </div>
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
              style={{ cursor: "pointer", fontSize: "18px" }}
              onClick={handlePrintBarcode}
            />
          </div>
        </div>

        <div className="product-image-container">
          <img
            src={`${imageBaseUrl}${product.image_url}`}
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
