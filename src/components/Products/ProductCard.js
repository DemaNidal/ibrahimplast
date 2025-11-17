
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
    product_id,
    name,
    image_url,

    size_value,
    sizeUnit,
    price,
    currency,
    category,
    colors = [],
    quantities = [],
  } = product;

  // ✅ حساب المخزون الكلي
  const totalStock = quantities.reduce((sum, q) => sum + (q.total || 0), 0);

  // ✅ كل المواقع من كل الكميات
 
const allLocations = quantities.map((q) => q.location).filter(Boolean);


  return (
    <MDBCard
      dir="rtl"
      className="text-black product-card h-100 shadow-sm rounded-4 overflow-hidden"
      style={{ transition: "transform 0.2s", cursor: "pointer" }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      onClick={() => navigate(`/productview/${product_id}`)}
    >
      {totalStock === 0 && (
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
        {/* اسم المنتج */}
        <div className="text-center mb-3">
          <MDBCardTitle
            className="fs-5 fw-bold mb-1 text-truncate"
            style={{ maxWidth: "100%" }}
          >
            {name}
          </MDBCardTitle>
          <p className="text-muted small">{category || "—"}</p>
        </div>

        {/* تفاصيل المنتج الأساسية */}
        <div className="mb-2">
          {[
            { label: "الحجم", value: `${size_value} ${sizeUnit || ""}` },
            { label: "السعر", value: `${price} ${currency || ""}` },
            { label: "المخزون الكلي", value: `${totalStock} وحدة` },
          ].map((item, idx) => (
            <div className="d-flex justify-content-between mb-1" key={idx}>
              <span className="text-muted">{item.label}</span>
              <span className="fw-semibold">{item.value}</span>
            </div>
          ))}

          {/* الألوان */}
          <div className="d-flex justify-content-between align-items-center mt-2">
            <span className="text-muted">الألوان</span>
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

        {/* المواقع (عرض أول موقعين فقط) */}
        {allLocations.length > 0 ? (
          <div className="small">
            {allLocations.slice(0, 2).map((loc, idx) => (
              <div key={idx} className="text-muted">

                🏬 {loc.warehouse_name} - 📍 {loc.location}
              </div>
            ))}
            {allLocations.length > 2 && (
              <div className="text-muted">+ المزيد...</div>
            )}
          </div>
        ) : (
          <p className="text-muted small">لا يوجد مواقع مسجلة</p>
        )}
      </MDBCardBody>
    </MDBCard>
  );
}

export default ProductCard;

