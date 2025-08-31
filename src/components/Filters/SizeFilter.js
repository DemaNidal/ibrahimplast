import React from "react";

function SizeFilter({ size, sizeUnit, sizeUnits, onInputChange }) {
  return (
    <div className="filter-group">
      <h4>الحجم</h4>
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <input
          placeholder="الحجم"
          className="size-input"
          value={size}
          onChange={(e) => onInputChange("size", e.target.value)}
        />
        <select
          className="size-unit"
          style={{ direction: "rtl" }}
          value={sizeUnit}
          onChange={(e) => onInputChange("sizeUnit", e.target.value)}
        >
          <option value="">اختر</option>
          {sizeUnits.map((unit) => (
            <option key={unit.value} value={unit.label}>
              {unit.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default SizeFilter;
