// src/components/ProductView/QuantityList.jsx
import React from "react";

const QuantityList = ({ quantities }) => (
  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      gap: "10px",
      marginTop: "5px",
    }}
  >
    {quantities?.map((q, idx) => (
      <span
        key={idx}
        style={{
          backgroundColor: "#f1f1f1",
          padding: "4px 8px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      >
        {q.quantity_rows} × {q.quantity_per_row} = {q.total} {q.unit}
      </span>
    ))}
  </div>
);

export default QuantityList;
