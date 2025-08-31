// src/components/filters/BarcodeFilter.js
import React from "react";

function BarcodeFilter({ barcode, onBarcodeChange, onBarcodeSearch }) {
  return (
    <div className="filter-group">
      <h4>الباركود</h4>
      <div style={{ display: "flex", gap: "8px" }}>
        <input
          placeholder="الباركود"
          className="size-input"
          value={barcode}
          onChange={(e) => onBarcodeChange(e.target.value)}
        />
        <button
          onClick={onBarcodeSearch}
          style={{
            padding: "4px 8px",
            background: "#C49A6C",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          بحث
        </button>
      </div>
    </div>
  );
}

export default BarcodeFilter;
