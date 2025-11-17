import React, { useState } from "react";
import "../../styles/HorizontalFilters.css";
import { useLookupData } from "../../hooks/useLookupData";
import {
  fetchCategories,
  fetchMadeFrom,
  fetchwarehouse,
  fetchSizeUnits,
  fetchUsages,
} from "../../services/lookupService";
import { searchProducts } from "../../services/productService";
import { useOutletContext } from "react-router-dom";

export default function ProductFilters({ setProducts }) {
  const { searchTerm } = useOutletContext();

  const categories = useLookupData(fetchCategories, "category_id", "category_name");
  const madeFrom = useLookupData(fetchMadeFrom, "made_from_id", "made_from_name");
  const warehouses = useLookupData(fetchwarehouse, "id", "name");
  const usages = useLookupData(fetchUsages, "usage_id", "usage_name");
  const sizeUnits = useLookupData(fetchSizeUnits, "size_unit_id", "size_unit_name");

  const [filters, setFilters] = useState({
    selectedCategories: [],
    selectedMadeFrom: [],
    selectedWarehouse: [],
    selectedUsage: [],
    size: "",
    sizeUnit: "",
  });

  // Toggle checkbox
  const toggleItem = (key, value) => {
    const updated = filters[key].includes(value)
      ? filters[key].filter((v) => v !== value)
      : [...filters[key], value];

    updateFilters(key, updated);
  };

  // Core update logic
  const updateFilters = async (key, value) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);

    const lookups = { categories, madeFrom, warehouses, usages };

    // FIXED MAPPING (do not send empty filters)
    const mappedFilters = {};

    if (updated.selectedCategories.length > 0)
      mappedFilters.category = updated.selectedCategories.join(",");

    if (updated.selectedMadeFrom.length > 0)
      mappedFilters.made_from = updated.selectedMadeFrom.join(",");

    if (updated.selectedWarehouse.length > 0)
      mappedFilters.warehouse_name = updated.selectedWarehouse.join(",");

    if (updated.selectedUsage.length > 0)
      mappedFilters.usage_name = updated.selectedUsage.join(",");

    if (updated.size)
      mappedFilters.size_value = updated.size;

    if (updated.sizeUnit)
      mappedFilters.sizeUnit = updated.sizeUnit;

    console.log("Mapped Filters:", mappedFilters);

    const res = await searchProducts(mappedFilters, searchTerm, lookups);
    console.log(res);
    setProducts(Array.isArray(res) ? res : []);
  };

  const removeChip = (key, value) => {
    updateFilters(key, filters[key].filter((v) => v !== value));
  };

  const renderCheckbox = (list, key) =>
    list.map((item) => (
      <label key={item.value} className="checkbox-item">
        <input
          type="checkbox"
          checked={filters[key].includes(item.label)}
          onChange={() => toggleItem(key, item.label)}
        />
        {item.label}
      </label>
    ));

  return (
    <div className="horizontal-filters" dir="rtl">
      
      {/* CATEGORY */}
      <div className="dropdown-select">
        <div className="select-box">الفئة</div>
        <div className="dropdown-panel">
          {renderCheckbox(categories, "selectedCategories")}
        </div>
      </div>

      {/* MADE FROM */}
      <div className="dropdown-select">
        <div className="select-box">مصنوع من</div>
        <div className="dropdown-panel">
          {renderCheckbox(madeFrom, "selectedMadeFrom")}
        </div>
      </div>

      {/* WAREHOUSE */}
      <div className="dropdown-select">
        <div className="select-box">المخزن</div>
        <div className="dropdown-panel">
          {renderCheckbox(warehouses, "selectedWarehouse")}
        </div>
      </div>

      {/* USAGE */}
      <div className="dropdown-select">
        <div className="select-box">الاستخدام</div>
        <div className="dropdown-panel">
          {renderCheckbox(usages, "selectedUsage")}
        </div>
      </div>

      {/* SIZE */}
      <div className="size-wrapper">
        <input
          type="number"
          placeholder="الحجم"
          value={filters.size}
          onChange={(e) => updateFilters("size", e.target.value)}
        />
        <select
          value={filters.sizeUnit}
          onChange={(e) => updateFilters("sizeUnit", e.target.value)}
        >
          <option value="">وحدة</option>
          {sizeUnits.map((s) => (
            <option key={s.value} value={s.label}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {/* FILTER CHIPS */}
      <div className="chips-area">
        {Object.entries(filters).map(([key, values]) =>
          Array.isArray(values)
            ? values.map((v) => (
                <span key={v} className="chip">
                  {v} <span onClick={() => removeChip(key, v)}>×</span>
                </span>
              ))
            : null
        )}
      </div>
    </div>
  );
}
