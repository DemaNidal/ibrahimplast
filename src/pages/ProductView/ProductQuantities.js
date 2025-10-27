import React from "react";
import "../../styles/ProductView.css";

const ProductQuantities = ({product}) => (
    <div className="product-box quantities-box">
            <h3 className="box-title">الكميات والمواقع</h3>

            <div className="quantities-grid">
              {product.quantities && product.quantities.length > 0 ? (
                product.quantities.map((q) => (
                  <div className="quantity-card" key={q.quantity_id}>
                    <div className="quantity-top">
                      <div className="qty-id"># {q.quantity_id}</div>
                      <div className="qty-total">
                        {q.quantity_rows} × {q.quantity_per_row} ={" "}
                        <strong>
                          {(q.quantity_rows || 0) * (q.quantity_per_row || 0)}
                        </strong>{" "}
                        {product.quantity_unit || ""}
                      </div>
                    </div>

                    <div className="locations-compact">
                      {q.locations && q.locations.length > 0 ? (
                        q.locations.map((loc) => (
                          <div className="location-chip" key={loc.location_id}>
                            <div className="loc-warehouse">
                              {loc.warehouse_name}
                            </div>
                            <div className="loc-name">{loc.location}</div>
                          </div>
                        ))
                      ) : (
                        <div className="no-location">لا يوجد مواقع</div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p>لا توجد كميات مسجلة</p>
              )}
            </div>
          </div>
);

export default ProductQuantities;