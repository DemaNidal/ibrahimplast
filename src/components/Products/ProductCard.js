import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
} from "mdb-react-ui-kit";
import imgB from "../../assets/facom.png";

function ProductCard() {
  return (
    <MDBCard
      dir="rtl"
      className="text-black product-card h-100 shadow-sm rounded-4 overflow-hidden"
      style={{
        transition: "transform 0.2s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <MDBCardImage
        src={imgB}
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
            بخاخ زيت أبيض
          </MDBCardTitle>
          <p className="text-muted small">الطابق الأول</p>
        </div>

        <div className="mb-2">
          {[
            { label: "الحجم", value: "1 لتر" },
            { label: "السعر", value: "$999" },
            { label: "اللون", value: "الأحمر" },
            { label: "الكمية", value: "13 × 152 كرتونة" },
          ].map((item, idx) => (
            <div className="d-flex justify-content-between" key={idx}>
              <span className="text-muted">{item.label}</span>
              <span className="fw-semibold">{item.value}</span>
            </div>
          ))}
        </div>

        <hr className="my-3" />

        <div className="d-flex justify-content-between align-items-center">
          <span className="fw-semibold text-muted">الرصيد</span>
          <span
            style={{ color: "#C49A6C ", fontWeight: "600", fontSize: "1.1rem" }}
          >
            7,197.00  
          </span>
          
        </div>
      </MDBCardBody>
    </MDBCard>
  );
}

export default ProductCard;
