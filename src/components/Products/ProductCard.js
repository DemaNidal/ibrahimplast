import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBIcon,
} from "mdb-react-ui-kit";


function ProductCard() {
  return (
    <MDBCard className="text-black product-card">
      <MDBIcon fab icon="apple" size="lg" className="px-3 pt-3 pb-2" />
      <MDBCardImage
        src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/3.webp"
        position="top"
        alt="Apple Computer"
      />
      <MDBCardBody>
        <div className="text-center">
          <MDBCardTitle>Believing is seeing</MDBCardTitle>
          <p className="text-muted mb-4">Apple pro display XDR</p>
        </div>
        <div>
          <div className="d-flex justify-content-between">
            <span>Pro Display XDR</span>
            <span>$5,999</span>
          </div>
          <div className="d-flex justify-content-between">
            <span>Pro stand</span>
            <span>$999</span>
          </div>
          <div className="d-flex justify-content-between">
            <span>Vesa Mount Adapter</span>
            <span>$199</span>
          </div>
        </div>
        <div className="d-flex justify-content-between total font-weight-bold mt-4">
          <span>Total</span>
          <span>$7,197.00</span>
        </div>
      </MDBCardBody>
    </MDBCard>
  );
}

export default ProductCard;
