import React from "react";
import Barcode from "react-barcode";
import "../../styles/ProductView.css";
import { FaPrint } from "react-icons/fa";

const ProductBarcodes = ({product, printBarcode}) => (
   
          <div className="product-box barcode-box">
            <h3 className="box-title">الباركود — لكل موقع</h3>
            <div className="barcode-list">
              {product.quantities && product.quantities.length > 0 ? (
                product.quantities.flatMap((q) =>
                  (q.locations || []).map((loc) => {
                    const barcodeValue = `${product.product_id}-${q.quantity_id}-${loc.location_id}`;
                    return (
                      <div
                        className="barcode-row"
                        key={`${q.quantity_id}-${loc.location_id}`}
                      >
                        <div className="barcode-info">
                          <div className="barcode-name">
                            {product.product_name}
                          </div>
                          <div className="barcode-sub">
                            {loc.warehouse_name} — {loc.location}
                          </div>
                          <div className="barcode-qty">
                            {q.quantity_rows} × {q.quantity_per_row}{" "}
                            {product.quantity_unit || ""}
                          </div>
                        </div>

                        <div className="barcode-actions">
                          <Barcode
                            value={barcodeValue}
                            height={46}
                            width={1.2}
                            displayValue={false}
                            background="#fff"
                            lineColor="#000"
                          />
                          <button
                            className="print-btn"
                            onClick={() => {
                              console.log("Quantity:", q);
                              printBarcode(product, barcodeValue, {
                                warehouse_name: loc.warehouse_name,
                                location: loc.location,
                                quantity_rows: q.quantity_rows,
                                quantity_per_row: q.quantity_per_row,
                                unit: product.quantity_unit,
                              });
                            }}
                            title="طباعة"
                          >
                            <FaPrint />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )
              ) : (
                <p>لا توجد مواقع لعرض الباركود</p>
              )}
            </div>
          </div>
);
export default ProductBarcodes ;