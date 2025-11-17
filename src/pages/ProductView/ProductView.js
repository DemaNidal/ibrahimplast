// src/pages/ProductView/ProductView.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/ProductView.css";
import { FaHistory } from "react-icons/fa";

import { fetchProductById } from "../../services/productService";
import {
  getMovementsByProduct,
  addMovement,
} from "../../services/movementService";
import usePrintBarcode from "../../hooks/usePrintBarcode";

import ProductHeader from "./ProductHeader";
import ProductQuantities from "./ProductQuantities";
import ProductBarcodes from "./ProductBarcodes";

import { useLookupData } from "../../hooks/useLookupData";
import AddQuantityPanel from "./AddQuantityPanel";
import {
  fetchwarehouse
} from "../../services/lookupService";

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
  const [showAddQuantity, setShowAddQuantity] = useState(false);

  const printBarcode = usePrintBarcode();
  const warehouseOptions = useLookupData(fetchwarehouse, "id", "name");
  

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

  const rows = parseInt(movementForm.rows, 10) || 0;
  const perRow = parseInt(movementForm.perRow, 10) || 0;

  if (rows <= 0 || perRow <= 0) {
    return alert("يجب إدخال عدد الكراتين وعدد القطع بشكل صحيح");
  }

  const [quantity_id_str] = movementForm.quantityLocationValue.split("-");
  const quantity_id = parseInt(quantity_id_str, 10);

  try {
    console.log({
      quantityId: quantity_id,
      rows,
      perRow,
      type: movementForm.type === "in" ? "IN" : "OUT",
      note: movementForm.note,
    });

    await addMovement({
      quantityId: quantity_id,
      rows,
      perRow,
      type: movementForm.type === "in" ? "IN" : "OUT",
      note: movementForm.note,
    });

    alert("تمت إضافة الحركة بنجاح ✅");

    setMovementForm({
      type: "in",
      quantityLocationValue: "",
      rows: "",
      perRow: "",
      note: "",
    });

    try {
      await loadMovements();
      const refreshed = await fetchProductById(id);
      setProduct(refreshed.data);
    } catch (e) {
      console.error("Reload error", e);
    }

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
              src={`${process.env.REACT_APP_IMAGE_BASE_URL || ""}${
                product.image_url || ""
              }`}
              alt={product.product_name || "product"}
              className="product-image"
            />
          </div>
        </div>

        {/* Info Column */}
        <div className="info-column">
          <ProductHeader product={product} />
          <ProductQuantities product={product} />
          <div className="text-end mt-3">
  <button className="primary-btn" onClick={() => setShowAddQuantity(true)}>
    ➕ إضافة كمية جديدة
  </button>
</div>

          <ProductBarcodes product={product} printBarcode={printBarcode} />

          {/* Movement / form box */}
          <div className="product-box movement-box">
            <div className="movement-top">
              <h3 className="box-title">💼 حركة المخزون</h3>
              <button
                className="history-toggle"
                onClick={() => setShowMovements((s) => !s)}
              >
                <FaHistory /> {showMovements ? "إخفاء السجل" : "عرض السجل"}
              </button>
            </div>

            <div className="movement-form">
              {/* اختيار الموقع / الكمية */}
              <label className="form-row">
                <span>اختر الموقع / الكمية</span>
                <select
                  value={movementForm.quantityLocationValue}
                  onChange={(e) =>
                    setMovementForm({
                      ...movementForm,
                      quantityLocationValue: e.target.value,
                    })
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

              {/* تفاصيل الحركة */}
              <div className="form-row triple">
                <label>
                  <span>نوع الحركة</span>
                  <select
                    value={movementForm.type}
                    onChange={(e) =>
                      setMovementForm({ ...movementForm, type: e.target.value })
                    }
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
                    onChange={(e) =>
                      setMovementForm({ ...movementForm, rows: e.target.value })
                    }
                  />
                </label>

                <label>
                  <span>القطع في الكرتونة</span>
                  <input
                    type="number"
                    value={movementForm.perRow}
                    onChange={(e) =>
                      setMovementForm({
                        ...movementForm,
                        perRow: e.target.value,
                      })
                    }
                  />
                </label>
              </div>

              {/* ملاحظة */}
              <label className="form-row">
                <span>ملاحظة</span>
                <input
                  type="text"
                  value={movementForm.note}
                  onChange={(e) =>
                    setMovementForm({ ...movementForm, note: e.target.value })
                  }
                  placeholder="مثلاً: إدخال من المورد الرئيسي"
                />
              </label>

              {/* زر الإرسال */}
              <div className="form-actions">
                <button className="primary-btn" onClick={handleAddMovement}>
                  ➕ إضافة حركة
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
              <button
                className="close-btn"
                onClick={() => setShowMovements(false)}
              >
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
                        <td>
                          {new Date(m.created_at).toLocaleString("ar-EG")}
                        </td>
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
      {showAddQuantity && (
  <AddQuantityPanel
    productId={product.product_id}
    warehouseOptions={warehouseOptions}
    onClose={() => setShowAddQuantity(false)}
    onAdded={async () => {
      const refreshed = await fetchProductById(id);
      setProduct(refreshed.data);
    }}
  />
)}

    </div>
  );
};

export default ProductView;
