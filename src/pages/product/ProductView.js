import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/ProductView.css";
import Barcode from "react-barcode";
import { FaPrint, FaHistory } from "react-icons/fa";
import { fetchProductById } from "../../services/productService";
import {
  getMovementsByProduct,
  addMovement,
} from "../../services/movementService";

import QuantityList from "../../components/ProductView/QuantityList";
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
    quantityId: "",
    rows: "",
    perRow: "",
    note: "",
  });

  const printBarcode = usePrintBarcode();

  // Load product info
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

  // Load product movements
  const loadMovements = async () => {
    try {
      const response = await getMovementsByProduct(id);
      setMovements(response.data);
    } catch (err) {
      console.error("Failed to fetch movements", err);
    }
  };

  useEffect(() => {
    loadMovements();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Add movement
  const handleAddMovement = async () => {
    if (!movementForm.quantityId) return alert("الرجاء اختيار الموقع / الكمية");
    if (!movementForm.rows || !movementForm.perRow)
      return alert("الرجاء إدخال عدد الكراتين وعدد القطع في كل كرتونة");

    try {
      await addMovement({
        quantity_id: movementForm.quantityId,
        movment_type: movementForm.type === "in" ? "IN" : "OUT",
        quantity_rows: movementForm.rows,
        quantity_per_row: movementForm.perRow,
        note: movementForm.note,
      });

      alert("تمت إضافة الحركة بنجاح ✅");

      // Reset form and reload data
      setMovementForm({
        type: "in",
        quantityId: "",
        rows: "",
        perRow: "",
        note: "",
      });
      loadMovements();
    } catch (err) {
      console.error("Failed to add movement", err);
      alert("حدث خطأ أثناء إضافة الحركة");
    }
  };

  if (loading) return <p>...جاري تحميل البيانات</p>;
  if (!product) return <p>تعذر العثور على المنتج</p>;

  // const barcodeValue = product.product_id.toString().padStart(8, "0");

  return (
    <div className="product-page">
      <div className="product-content">
            <div className="product-image-container">
          <img
            src={`${process.env.REACT_APP_IMAGE_BASE_URL}${product.image_url}`}
            alt="المنتج"
            className="product-image"
          />
          <div className="product-shadow"></div>
        </div>
        <div className="product-info">
          
          <small className="product-category">
            <strong>{product.category_name}</strong> | {product.size_value}{" "}
            {product.size_unit_name}
          </small>

          <h2>{product.product_name}</h2>
          <p>{product.notes}</p>

          {product.quantities.map((q) => (
            <div key={q.quantity_id} className="quantity-location-block">
              <h5>
                الكمية رقم {q.quantity_id}: {q.total} {product.quantity_unit}
              </h5>
              {q.locations && q.locations.length > 0 ? (
                <ul className="location-list">
                  {q.locations.map((loc) => (
                    <li key={loc.location_id}>
                      {loc.warehouse_name} – {loc.location}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="no-location">لا يوجد مواقع مرتبطة</p>
              )}
            </div>
          ))}

          <ul>
            <li>
              <strong>الاستخدام:</strong> {product.usage_name}
            </li>
            <li>
              <strong>المادة:</strong> {product.made_from_name}
            </li>
            <li>
              <QuantityList
                quantities={product.quantities}
                Unit={product.quantity_unit}
              />
            </li>
            <li>
              <strong>السعر:</strong> ${product.price}
            </li>
            <li>
              <ColorList colors={product.colors} />
            </li>
          </ul>

         {/* --- Barcode Section per Location --- */}
<div className="barcode-section">
  <h4>الباركود لكل موقع</h4>
  {product.quantities && product.quantities.length > 0 ? (
    product.quantities.map((q) =>
      q.locations && q.locations.length > 0 ? (
        q.locations.map((loc) => {
          const locationBarcodeValue = `${product.product_id}-${q.quantity_id}-${loc.location_id}`;
          return (
            <div
              key={`${q.quantity_id}-${loc.location_id}`}
              className="barcode-item"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                border: "1px solid #d4af37", // gold border
                background: "#000", // black box
                color: "#d4af37", // gold text
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "10px",
              }}
            >
              <div>
                <strong>{product.product_name}</strong> <br />
                {loc.warehouse_name} – {loc.location} <br />
                الكمية: {q.total} {product.quantity_unit}
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Barcode
                  value={locationBarcodeValue}
                  height={50}
                  width={1.2}
                  displayValue={false}
                  background="#000"
                  lineColor="#d4af37"
                />
                <FaPrint
  onClick={() =>
    printBarcode(product, locationBarcodeValue, {
      warehouse_name: loc.warehouse_name,
      location: loc.location,
      quantity_total: q.total,
      unit: product.quantity_unit,
    })
  }
/>

              </div>
            </div>
          );
        })
      ) : (
        <div key={q.quantity_id} style={{ margin: "10px 0", color: "gray" }}>
          لا يوجد مواقع مرتبطة بهذه الكمية ({q.quantity_id})
        </div>
      )
    )
  ) : (
    <p>لا توجد كميات لعرضها</p>
  )}
</div>


          {/* --- Movement Section --- */}
          <div className="movement-section mt-4">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h4>الحركات</h4>
              <button
                className="btn-history"
                onClick={() => setShowMovements((prev) => !prev)}
                style={{ display: "flex", alignItems: "center", gap: 5 }}
              >
                <FaHistory />{" "}
                {showMovements ? "إخفاء الحركات" : "عرض الحركات السابقة"}
              </button>
            </div>

            <div className="movement-form">
              <select
                value={movementForm.quantityId}
                onChange={(e) =>
                  setMovementForm({
                    ...movementForm,
                    quantityId: e.target.value,
                  })
                }
              >
                <option value="">اختر الموقع / الكمية</option>
                {product.quantities.map((q) => (
                  <option key={q.quantity_id} value={q.quantity_id}>
                    {q.warehouse_name} - {q.location_name} ({q.total} قطعة)
                  </option>
                ))}
              </select>

              <select
                value={movementForm.type}
                onChange={(e) =>
                  setMovementForm({ ...movementForm, type: e.target.value })
                }
              >
                <option value="in">إدخال</option>
                <option value="out">إخراج</option>
              </select>

              <input
                type="number"
                placeholder="عدد الكراتين"
                value={movementForm.rows}
                onChange={(e) =>
                  setMovementForm({ ...movementForm, rows: e.target.value })
                }
              />

              <input
                type="number"
                placeholder="عدد القطع في كل كرتونة"
                value={movementForm.perRow}
                onChange={(e) =>
                  setMovementForm({ ...movementForm, perRow: e.target.value })
                }
              />

              <input
                type="text"
                placeholder="ملاحظة"
                value={movementForm.note}
                onChange={(e) =>
                  setMovementForm({ ...movementForm, note: e.target.value })
                }
              />

              <button onClick={handleAddMovement}>إضافة</button>
            </div>

            {/* Movement History Panel */}
            {/* Movement History Fullscreen Overlay */}
{showMovements && (
  <div className="movement-overlay">
    <div className="movement-panel">
      <div className="panel-header">
        <h3>سجل الحركات السابقة</h3>
        <button
          className="close-btn"
          onClick={() => setShowMovements(false)}
        >
          ✕
        </button>
      </div>

      <div className="panel-body">
       <table className="movement-table">
  <thead>
    <tr>
      <th>التاريخ</th>
      <th>النوع</th>
      <th>المخزن</th>
      <th>الموقع</th>
      <th>عدد الكراتين</th>
      <th>القطع في الكرتونة</th>
      <th>الإجمالي</th>
      <th>الملاحظة</th>
    </tr>
  </thead>
  <tbody>
    {movements.length > 0 ? (
      movements.map((m, idx) => (
        <tr key={idx}>
          <td>{new Date(m.created_at).toLocaleDateString("ar-EG")}</td>
          <td
  style={{
    color: m.movment_type === "IN" ? "green" : "red",
    fontWeight: "bold",
  }}
>
  {m.movment_type === "IN" ? "إدخال" : "إخراج"}
</td>
          <td>{m.warehouse_name || "غير محدد"}</td>
          <td>{m.location || "غير محدد"}</td>
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
        </div>
      </div>
    </div>
  );
};

export default ProductView;
