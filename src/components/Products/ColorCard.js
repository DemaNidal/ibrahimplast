// components/product/color/ColorCard.jsx

import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import CustomDropDown from "../dropdown/CustomDropDown";
import { fetchColors } from "../../services/lookupService";
import { useLookupData } from "../../hooks/useLookupData";
import { translateArabicColorToCss } from "../../hooks/translateColor.js";
import { useProduct } from "../../context/ProductContext.js";

const ColorCard = () => {
  const colors = useLookupData(fetchColors, "color_id", "color_name");
  const { product, setProduct } = useProduct();

  const [selectedColor, setSelectedColor] = useState(null);

  const handleAddColor = () => {
    if (selectedColor) {
      if (!product.color?.includes(selectedColor.value)) {
        setProduct((prev) => ({
          ...prev,
          color: [...(prev.color || []), selectedColor.value], // حفظ فقط IDs
        }));
      } else {
        alert("هذا اللون مضاف بالفعل.");
      }
    }

    setSelectedColor(null);
  };

  const handleRemoveColor = (id) => {
    setProduct((prev) => ({
      ...prev,
      color: (prev.color || []).filter((c) => c !== id),
    }));
  };

  return (
    <Card className="mb-4 outline-card border-0">
      <Card.Body>
        <Card.Title>لون المنتج</Card.Title>

        <div className="d-flex align-items-center gap-3 mb-3">
          <div style={{ flex: 1, minWidth: 180 }}>
            <CustomDropDown
              options={colors}
              label="اللون"
              placeholder="اختر لون المنتج"
              onChange={setSelectedColor}
              value={selectedColor}
            />
          </div>
          <Button
            variant="success"
            onClick={handleAddColor}
            disabled={!selectedColor}
          >
            إضافة
          </Button>
        </div>

        {/* Preview of selected colors */}
        <div className="d-flex flex-wrap gap-2">
          {(product.color || []).map((id) => {
            const colorInfo = colors.find((c) => c.value === id);
            const name = colorInfo?.label || "غير معروف";

            return (
              <div
                key={id}
                className="d-flex align-items-center gap-2 border p-2 rounded"
                style={{ backgroundColor: "#f9f9f9" }}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    backgroundColor: translateArabicColorToCss(name),
                    border: "1px solid #999",
                  }}
                  title={name}
                ></div>
                <span>{name}</span>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleRemoveColor(id)}
                >
                  حذف
                </Button>
              </div>
            );
          })}
        </div>
      </Card.Body>
    </Card>
  );
};

export default ColorCard;
