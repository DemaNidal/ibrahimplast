import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { translateArabicColorToCss } from "../../hooks/translateColor";

function ProductCard({ product }) {
  const navigate = useNavigate();

  const {
    name,
    image_url,
    location,
    size_value,
    sizeUnit,
    price,
    currency,
    category,
    colors = [],
    product_id,
  } = product;

  const status = "متوفر"; // لاحقاً يمكن ربطها بالحالة الحقيقية

  return (
    <MDBCard
      dir="rtl"
      className="text-black product-card h-100 shadow-sm rounded-4 overflow-hidden"
      style={{ transition: "transform 0.2s", cursor: "pointer" }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      onClick={() => navigate(`/productview/${product_id}`)} // ✅ هنا كانت المشكلة
    >
      {status === "غير متوفر" && (
        <div
          className="position-absolute top-0 start-0 bg-danger text-white px-3 py-1"
          style={{
            borderBottomRightRadius: "10px",
            fontSize: "0.9rem",
            fontWeight: "bold",
          }}
        >
          غير متوفر
        </div>
      )}

      <MDBCardImage
        src={`${process.env.REACT_APP_API_URL}/uploads/${image_url}`}
        alt="صورة المنتج"
        position="top"
        style={{
          aspectRatio: "4 / 3",
          objectFit: "contain",
          objectPosition: "center",
          backgroundColor: "#f8f8f8",
          display: "block",
          width: "100%",
        }}
      />

      <MDBCardBody className="p-4">
        <div className="text-center mb-3">
          <MDBCardTitle
            className="fs-5 fw-bold mb-1 text-truncate"
            style={{ maxWidth: "100%" }}
          >
            {name}
          </MDBCardTitle>
          <p className="text-muted small">{location || "—"}</p>
        </div>

        <div className="mb-2">
          {[
            { label: "الحجم", value: `${size_value} ${sizeUnit}` },
            { label: "السعر", value: `${price} ${currency}` },
            { label: "الفئة", value: category },
          ].map((item, idx) => (
            <div className="d-flex justify-content-between mb-1" key={idx}>
              <span className="text-muted">{item.label}</span>
              <span className="fw-semibold">{item.value}</span>
            </div>
          ))}

          <div className="d-flex justify-content-between align-items-center mt-2">
            <span className="text-muted">اللون</span>
            <div className="d-flex gap-2">
              {colors.map((color, index) => (
                <div
                  key={index}
                  title={color.colorName}
                  style={{
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    backgroundColor: translateArabicColorToCss(color.colorName),
                    border: "1px solid #ccc",
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>

        <hr className="my-3" />
      </MDBCardBody>
    </MDBCard>
  );
}

export default ProductCard;
