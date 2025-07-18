import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBIcon,
} from "mdb-react-ui-kit";
import imgB from '../../assets/بخاخ ذهبي كبير.png';


function ProductCard() {
  return (
    <MDBCard className="text-black product-card h-100">
      <MDBIcon fab icon="apple" size="lg" className="px-3 pt-3 pb-2" />
      <MDBCardImage
        src={imgB}
        position="top"
        alt="Apple Computer"
        style={{ width: "100%",
  height: "250px",       /* اضبط الارتفاع حسب ما يناسبك */
 objectFit: "cover",
 objectPosition: "center",   /* هذا يجعل الصورة تقطع الزائد وتملأ المساحة بشكل جميل */
  borderTopLeftRadius: "0.5rem", /* نفس تنسيق MDBCard */
  borderTopRightRadius:" 0.5rem"}}
      />
      <MDBCardBody>
        <div className="text-center">
          <MDBCardTitle>بخاخ زيت ابيض</MDBCardTitle>
          <p className="text-muted mb-4">الطابق الاول</p>
        </div>
        <div>
          <div className="d-flex justify-content-between">
            <span>الحجم</span>
            <span>ا لتر</span>
          </div>
          <div className="d-flex justify-content-between">
            <span>السعر</span>
            <span>$999</span>
          </div>
          <div className="d-flex justify-content-between">
            <span>اللون</span>
            <span>الاحمر</span>
          </div>
          <div className="d-flex justify-content-between">
            <span>الكمية</span>
            <span>13*152</span>
          </div>
        </div>
        <div className="d-flex justify-content-between total font-weight-bold mt-4">
          <span>الرصيد</span>
          <span>7,197.00</span>
        </div>
      </MDBCardBody>
    </MDBCard>
  );
}

export default ProductCard;
