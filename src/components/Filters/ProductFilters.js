import React, { useState } from "react";
import "../../styles/ProductFilters.css";
import { useLookupData } from "../../hooks/useLookupData";
import {
  fetchCategories,
  fetchMadeFrom,
  fetchSizeUnits,
  fetchwarehouse,
} from "../../services/lookupService";

function ProductFilters() {
  const categories = useLookupData(
    fetchCategories,
    "category_id",
    "category_name"
  );
  const madeFrom = useLookupData(
    fetchMadeFrom,
    "made_from_id",
    "made_from_name"
  );
  const warehouses = useLookupData(fetchwarehouse, "id", "name");
  const sizeUnits = useLookupData(
    fetchSizeUnits,
    "size_unit_id",
    "size_unit_name"
  );

  const [filters, setFilters] = useState({
    selectedCategories: [],
    selectedMadeFrom: "",
    selectedWarehouse: "",
    size: "",
    sizeUnit: "",
    barcode: "",
  });

  const handleCategoryChange = (value) => {
    setFilters((prev) => {
      const alreadySelected = prev.selectedCategories.includes(value);
      return {
        ...prev,
        selectedCategories: alreadySelected
          ? prev.selectedCategories.filter((v) => v !== value)
          : [...prev.selectedCategories, value],
      };
    });
  };

  const handleRadioChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleInputChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearAllSelections = () => {
    setFilters({
      selectedCategories: [],
      selectedMadeFrom: "",
      selectedWarehouse: "",
      size: "",
      sizeUnit: "",
      barcode: "",
    });
  };

  return (
    <div className="filters" dir="rtl">
      <div className="filter-header">
        <span style={{ fontWeight: "600" }}>تصفيه</span>
      </div>

      {/* ✅ الفئة */}
      <div className="filter-group">
        <div className="row">
          <div className="col">
            <h4>الفئة</h4>
          </div>
          <div className="col">
            <button onClick={clearAllSelections} style={{color:"#C49A6C "}}>مسح الكل</button>
          </div>
        </div>
        {categories.map((cat) => {
          const id = `category-${cat.value}`;
          return (
            <div
              key={cat.value}
              className="form-check"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "8px",
              }}
            >
              <input
                id={id}
                type="checkbox"
                className="form-check-input"
                checked={filters.selectedCategories.includes(cat.value)}
                onChange={() => handleCategoryChange(cat.value)}
              />
              <label className="form-check-label" htmlFor={id}>
                {cat.label}
              </label>
            </div>
          );
        })}
      </div>

      {/* ✅ مصنوع من */}
      <div className="filter-group">
        <h4>مصنوع من</h4>
        {madeFrom.map((m) => {
          const id = `warehouse-${m.value}`;
          return (
            <div
              key={m.value}
              className="form-check"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "8px",
              }}
            >
              <input
                id={id}
                type="radio"
                className="form-check-input"
                name="madeFrom"
                value={m.value}
                checked={filters.selectedWarehouse === m.value}
                onChange={() => handleRadioChange("selectedWarehouse", m.value)}
              />
              <label className="form-check-label" htmlFor={id}>
                {m.label}
              </label>
            </div>
          );
        })} 
      </div>



      {/* ✅ الحجم */}
      <div className="filter-group">
        <h4>الحجم</h4>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <input
            placeholder="الحجم"
            className="size-input"
            value={filters.size}
            onChange={(e) => handleInputChange("size", e.target.value)}
          />
          <select
            className="size-unit"
            style={{ direction: "rtl" }}
            value={filters.sizeUnit}
            onChange={(e) => handleInputChange("sizeUnit", e.target.value)}
          >
            <option value="">اختر</option>
            {sizeUnits.map((unit) => (
              <option key={unit.value} value={unit.value}>
                {unit.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ✅ مكان التخزين */}
      <div className="filter-group">
        <h4>مكان التخزين</h4>
        {warehouses.map((w) => {
          const id = `warehouse-${w.value}`;
          return (
            <div
              key={w.value}
              className="form-check"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "8px",
              }}
            >
              <input
                id={id}
                type="radio"
                className="form-check-input"
                name="warehouse"
                value={w.value}
                checked={filters.selectedWarehouse === w.value}
                onChange={() => handleRadioChange("selectedWarehouse", w.value)}
              />
              <label className="form-check-label" htmlFor={id}>
                {w.label}
              </label>
            </div>
          );
        })}
      </div>

      {/* ✅ الباركود */}
      <div className="filter-group">
        <h4>الباركود</h4>
        <input
          placeholder="الباركود"
          className="size-input"
          value={filters.barcode}
          onChange={(e) => handleInputChange("barcode", e.target.value)}
        />
      </div>
    </div>
  );
}

export default ProductFilters;
