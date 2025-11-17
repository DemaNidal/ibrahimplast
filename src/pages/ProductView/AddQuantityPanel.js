import React, { useState } from "react";
import {addQuantityToExistingProduct  } from "../../services/productService";
import QuantityManager from "../../components/Products/QuantityManager";
import "../../styles/AddQuantityPanel.css";

const AddQuantityPanel = ({ productId, warehouseOptions, onClose, onAdded }) => {
  const [quantities, setQuantities] = useState([
    { rows: "", perRow: "", locations: [{ location: "", warehouse_id: null }] },
  ]);
  const [loading, setLoading] = useState(false);

  // handle add/remove/update
  const handleAddQuantity = () => {
    setQuantities([
      ...quantities,
      { rows: "", perRow: "", locations: [{ location: "", warehouse_id: null }] },
    ]);
  };

  const handleRemoveQuantity = (index) => {
    setQuantities(quantities.filter((_, i) => i !== index));
  };

  const handleQuantityChange = (index, field, value) => {
    const newQuantities = [...quantities];
    newQuantities[index][field] = value;
    setQuantities(newQuantities);
  };

  const handleAddLocation = (index) => {
    const newQuantities = [...quantities];
    newQuantities[index].locations.push({ location: "", warehouse_id: null });
    setQuantities(newQuantities);
  };

  const handleRemoveLocation = (qIndex, lIndex) => {
    const newQuantities = [...quantities];
    newQuantities[qIndex].locations.splice(lIndex, 1);
    setQuantities(newQuantities);
  };

  const handleLocationChange = (qIndex, lIndex, field, value) => {
    const newQuantities = [...quantities];
    newQuantities[qIndex].locations[lIndex][field] = value;
    setQuantities(newQuantities);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      for (const qty of quantities) {
        await addQuantityToExistingProduct(productId, qty);
      }
      alert("✅ تمت إضافة الكميات بنجاح");
      onAdded?.(); // refresh parent
      onClose();
    } catch (err) {
      console.error("Error saving quantities:", err);
      alert("حدث خطأ أثناء الحفظ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-quantity-overlay">
      <div className="add-quantity-panel">
        <div className="panel-header">
          <h3>➕ إضافة كمية جديدة</h3>
          <button onClick={onClose} className="close-btn">✕</button>
        </div>

        <div className="panel-body scroll">
          <QuantityManager
            quantities={quantities}
            warehouseOptions={warehouseOptions}
            onAddQuantity={handleAddQuantity}
            onRemoveQuantity={handleRemoveQuantity}
            onQuantityChange={handleQuantityChange}
            onAddLocation={handleAddLocation}
            onRemoveLocation={handleRemoveLocation}
            onLocationChange={handleLocationChange}
          />
        </div>

        <div className="panel-footer">
          <button className="primary-btn" onClick={handleSave} disabled={loading}>
            {loading ? "جاري الحفظ..." : "💾 حفظ الكمية"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddQuantityPanel;
