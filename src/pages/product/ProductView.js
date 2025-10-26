// src/pages/ProductView/ProductView.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/ProductView.css";
import Barcode from "react-barcode";
import { FaPrint, FaHistory } from "react-icons/fa";

import { fetchProductById } from "../../services/productService";
import { getMovementsByProduct, addMovement } from "../../services/movementService";
import ColorList from "../../components/ProductView/ColorList";
import usePrintBarcode from "../../hooks/usePrintBarcode";

const ProductView = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMovements, setShowMovements] = useState(false);
  const [movementForm, setMovementForm] = useState({
    type: "in",
    quantityLocationValue: "", // combined value "quantityId-locationId" for readability
    rows: "",
    perRow: "",
    note: "",
  });

  const printBarcode = usePrintBarcode();

  // Load product info
  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
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

  // Load product movements
  const loadMovements = async () => {
    try {
      const response = await getMovementsByProduct(id);
      setMovements(response.data || []);
    } catch (err) {
      console.error("Failed to fetch movements", err);
    }
  };

  useEffect(() => {
    loadMovements();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Add movement
  const handleAddMovement = async () => {
    if (!movementForm.quantityLocationValue) {
      return alert("الرجاء اختيار الموقع / الكمية");
    }
    if (!movementForm.rows || !movementForm.perRow) {
      return alert("الرجاء إدخال عدد الكراتين وعدد القطع في كل كرتونة");
    }

    // quantityLocationValue format is "quantityId-locationId" (locationId optional)
    const [quantity_id_str, location_id_str] = movementForm.quantityLocationValue.split("-");
    const quantity_id = parseInt(quantity_id_str, 10);
    const location_id = location_id_str ? parseInt(location_id_str, 10) : null;

    try {
      await addMovement({
        quantity_id,
        // backend expects movement type as "IN"/"OUT"
        movment_type: movementForm.type === "in" ? "IN" : "OUT",
        quantity_rows: parseInt(movementForm.rows, 10),
        quantity_per_row: parseInt(movementForm.perRow, 10),
        note: movementForm.note,
        // include location_id if backend later supports it (safe to send now)
        ...(location_id ? { location_id } : {}),
      });

      alert("تمت إضافة الحركة بنجاح ✅");

      // Reset form and reload data
      setMovementForm({
        type: "in",
        quantityLocationValue: "",
        rows: "",
        perRow: "",
        note: "",
      });
      await loadMovements();
      // refresh product quantities to reflect changes
      const refreshed = await fetchProductById(id);
      setProduct(refreshed.data);
    } catch (err) {
      console.error("Failed to add movement", err);
      alert("حدث خطأ أثناء إضافة الحركة");
    }
  };

  if (loading) return <p className="loading-text">...جاري تحميل البيانات</p>;
  if (!product) return <p className="loading-text">تعذر العثور على المنتج</p>;

  return (
    <div className="product-page">
      <div className="product-content card-grid">
        {/* Image Column */}
        <div className="product-card image-column">
          <div className="image-wrap">
            <img
              src={`${process.env.REACT_APP_IMAGE_BASE_URL || ""}${product.image_url || ""}`}
              alt={product.product_name || "product"}
              className="product-image"
            />
          </div>
        </div>

        {/* Info Column */}
        <div className="info-column">
          <div className="product-box header-box">
            <div className="title-row">
              <h2 className="product-title">{product.product_name}</h2>
              <div className="category-badge">
                {product.category_name} • {product.size_value} {product.size_unit_name}
              </div>
            </div>
            <p className="product-notes">{product.notes}</p>

            <div className="meta-row">
              <div><strong>الاستخدام:</strong> {product.usage_name || "—"}</div>
              <div><strong>المادة:</strong> {product.made_from_name || "—"}</div>
              <div><strong>السعر:</strong> {product.price ? `${product.price} ${product.currency_name || ""}` : "—"}</div>
            </div>

            <div className="colors-row">
              <ColorList colors={product.colors || []} />
            </div>
          </div>

          {/* Quantities & locations box */}
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
                        <strong>{(q.quantity_rows || 0) * (q.quantity_per_row || 0)}</strong>{" "}
                        {product.quantity_unit || ""}
                      </div>
                    </div>

                    <div className="locations-compact">
                      {q.locations && q.locations.length > 0 ? (
                        q.locations.map((loc) => (
                          <div className="location-chip" key={loc.location_id}>
                            <div className="loc-warehouse">{loc.warehouse_name}</div>
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

          {/* Barcode box */}
          <div className="product-box barcode-box">
            <h3 className="box-title">الباركود — لكل موقع</h3>
            <div className="barcode-list">
              {product.quantities && product.quantities.length > 0 ? (
                product.quantities.flatMap((q) =>
                  (q.locations || []).map((loc) => {
                    const barcodeValue = `${product.product_id}-${q.quantity_id}-${loc.location_id}`;
                    return (
                      <div className="barcode-row" key={`${q.quantity_id}-${loc.location_id}`}>
                        <div className="barcode-info">
                          <div className="barcode-name">{product.product_name}</div>
                          <div className="barcode-sub">
                            {loc.warehouse_name} — {loc.location}
                          </div>
                          <div className="barcode-qty">
                            {q.quantity_rows} × {q.quantity_per_row} {product.quantity_unit || ""}
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
                            onClick={() =>
                              printBarcode(product, barcodeValue, {
                                warehouse_name: loc.warehouse_name,
                                location: loc.location,
                                quantity_rows: q.quantity_rows,
                                quantity_per_row: q.quantity_per_row,
                                unit: product.quantity_unit,
                              })
                            }
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

          {/* Movement / form box */}
          <div className="product-box movement-box">
            <div className="movement-top">
              <h3 className="box-title">حركة مخزون</h3>
              <button
                className="history-toggle"
                onClick={() => setShowMovements((s) => !s)}
              >
                <FaHistory /> {showMovements ? "إخفاء السجل" : "عرض السجل"}
              </button>
            </div>

            <div className="movement-form">
              <label className="form-row">
                <span>اختر الموقع / الكمية</span>
                <select
                  value={movementForm.quantityLocationValue}
                  onChange={(e) =>
                    setMovementForm({ ...movementForm, quantityLocationValue: e.target.value })
                  }
                >
                  <option value="">-- اختر --</option>
                  {product.quantities &&
                    product.quantities.flatMap((q) =>
                      (q.locations || []).map((loc) => (
                        <option
                          key={`${q.quantity_id}-${loc.location_id}`}
                          value={`${q.quantity_id}-${loc.location_id}`}
                        >
                          {`#${q.quantity_id} — ${loc.warehouse_name} / ${loc.location} (${q.quantity_rows}×${q.quantity_per_row})`}
                        </option>
                      ))
                    )}
                </select>
              </label>

              <div className="form-row small-2">
                <label>
                  <span>نوع الحركة</span>
                  <select
                    value={movementForm.type}
                    onChange={(e) => setMovementForm({ ...movementForm, type: e.target.value })}
                  >
                    <option value="in">إدخال</option>
                    <option value="out">إخراج</option>
                  </select>
                </label>

                <label>
                  <span>عدد الكراتين</span>
                  <input
                    type="number"
                    value={movementForm.rows}
                    onChange={(e) => setMovementForm({ ...movementForm, rows: e.target.value })}
                  />
                </label>

                <label>
                  <span>القطع في الكرتونة</span>
                  <input
                    type="number"
                    value={movementForm.perRow}
                    onChange={(e) =>
                      setMovementForm({ ...movementForm, perRow: e.target.value })
                    }
                  />
                </label>
              </div>

              <label className="form-row">
                <span>ملاحظة</span>
                <input
                  type="text"
                  value={movementForm.note}
                  onChange={(e) => setMovementForm({ ...movementForm, note: e.target.value })}
                />
              </label>

              <div className="form-actions">
                <button className="primary-btn" onClick={handleAddMovement}>
                  إضافة حركة
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Movements overlay (small panel above content) */}
      {showMovements && (
        <div className="movement-overlay">
          <div className="movement-panel small">
            <div className="panel-header">
              <h3>سجل الحركات</h3>
              <button className="close-btn" onClick={() => setShowMovements(false)}>
                ✕
              </button>
            </div>

            <div className="panel-body scroll">
              <table className="movement-table">
                <thead>
                  <tr>
                    <th>التاريخ</th>
                    <th>النوع</th>
                    <th>المخزن</th>
                    <th>الموقع</th>
                    <th>عدد الكراتين</th>
                    <th>القطع/كرتونة</th>
                    <th>الإجمالي</th>
                    <th>ملاحظة</th>
                  </tr>
                </thead>
                <tbody>
                  {movements.length > 0 ? (
                    movements.map((m) => (
                      <tr key={m.movement_id || Math.random()}>
                        <td>{new Date(m.created_at).toLocaleString("ar-EG")}</td>
                        <td className={m.movment_type === "IN" ? "in" : "out"}>
                          {m.movment_type === "IN" ? "إدخال" : "إخراج"}
                        </td>
                        <td>{m.warehouse_name || "—"}</td>
                        <td>{m.location || "—"}</td>
                        <td>{m.quantity_rows}</td>
                        <td>{m.quantity_per_row}</td>
                        <td>{m.total}</td>
                        <td>{m.note}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" style={{ textAlign: "center" }}>
                        لا توجد حركات بعد
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductView;
