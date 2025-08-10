// src/components/ProductView/ColorList.jsx
import React from "react";
import { translateArabicColorToCss } from "../../hooks/translateColor";

const ColorList = ({ colors }) => (
  <div
    className="color-list"
    style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}
  >
    {colors?.map((color, idx) => (
      <div
        key={idx}
        className="color-item"
        style={{ display: "flex", alignItems: "center", gap: "5px" }}
      >
        <span
          style={{
            backgroundColor: translateArabicColorToCss(color.color_name),
            width: 20,
            height: 20,
            borderRadius: "50%",
            border: "1px solid #999",
            display: "inline-block",
          }}
        />
        <span>{color.color_name}</span>
      </div>
    ))}
  </div>
);

export default ColorList;
