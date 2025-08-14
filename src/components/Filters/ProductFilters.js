import React, { useState } from "react";
import "../../styles/ProductFilters.css";
import { useLookupData } from "../../hooks/useLookupData";
import api from "../../config/api";
import {
  fetchCategories,
  fetchMadeFrom,
  fetchSizeUnits,
  fetchwarehouse,
  fetchUsages,
} from "../../services/lookupService";
import { fetchProductByBarcode } from "../../services/productService";
import { useOutletContext } from "react-router-dom";

function ProductFilters({ setProducts }) {
  const { setSearchTerm } = useOutletContext();


  // inside your component
const handleFilterChange = async (updatedFilters) => {
  try {
    let query = "";

    // Barcode / term
    if (updatedFilters.barcode) {
      query += `term=${updatedFilters.barcode}&`;
    }

    // Usage
    if (updatedFilters.selectedUsage) {
      const usageLabel = usages.find((u) => u.value === updatedFilters.selectedUsage)?.label;
      if (usageLabel) query += `usage_name=${usageLabel}&`;
    }

    // Category (use first one for now)
    if (updatedFilters.selectedCategories.length > 0) {
      const catLabel = categories.find((c) => c.value === updatedFilters.selectedCategories[0])?.label;
      if (catLabel) query += `category=${catLabel}&`;
    }

    // Made from
    if (updatedFilters.selectedMadeFrom) {
      const madeFromLabel = madeFrom.find((m) => m.value === updatedFilters.selectedMadeFrom)?.label;
      if (madeFromLabel) query += `made_from_name=${madeFromLabel}&`;
    }

    // Warehouse
    if (updatedFilters.selectedWarehouse) {
      const warehouseLabel = warehouses.find((w) => w.value === updatedFilters.selectedWarehouse)?.label;
      if (warehouseLabel) query += `warehouse_name=${warehouseLabel}&`;
    }

    // Size
    if (updatedFilters.size) {
      query += `size_value=${updatedFilters.size}&`;
    }

    // Size unit
    if (updatedFilters.sizeUnit) {
      const sizeUnitLabel = sizeUnits.find((s) => s.value === updatedFilters.sizeUnit)?.label;
      if (sizeUnitLabel) query += `size_unit_name=${sizeUnitLabel}&`;
    }

    // Remove trailing &
    if (query.endsWith("&")) query = query.slice(0, -1);

    // Skip API if empty
    if (!query) return;

    console.log("query:", query);

    const response = await api.get(`/search?${query}`);
    const data = Array.isArray(response.data) ? response.data : [response.data];
    setProducts(data);
  } catch (err) {
    console.error("Error fetching filtered products:", err);
  }
};


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

  const usages = useLookupData(fetchUsages, "usage_id","usage_name");

  const [filters, setFilters] = useState({
    selectedCategories: [],
    selectedMadeFrom: "",
    selectedWarehouse: "",
    selectedUsage: "",
    size: "",
    sizeUnit: "",
    barcode: "",
  });

  const handleBarcodeSearch = async (barcode) => {
    if (!barcode.trim()) {
      alert("أدخل الباركود أولاً");
      return;
    }
    try {
      const res = await fetchProductByBarcode(barcode);
      // Ensure products state is always an array
      const data = Array.isArray(res.data) ? res.data : [res.data];
      setProducts(data);
    } catch (err) {
      console.error("Error searching by barcode:", err);
    }
  };

const handleCategoryChange = (value) => {
  setFilters((prev) => {
    const alreadySelected = prev.selectedCategories.includes(value);
    const newFilters = {
      ...prev,
      selectedCategories: alreadySelected
        ? prev.selectedCategories.filter((v) => v !== value)
        : [...prev.selectedCategories, value],
    };
    console.log("new" + JSON.stringify(newFilters)); 
    handleFilterChange(newFilters);
    return newFilters;
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
            <button onClick={clearAllSelections} style={{ color: "#C49A6C" }}>
              مسح الكل
            </button>
          </div>
        </div>

        <div className="category-grid">
          {categories.map((cat) => {
            const id = `category-${cat.value}`;
            return (
              <div key={cat.value} className="form-check">
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
      </div>

      {/* ✅ مصنوع من */}
      <div className="filter-group">
        <h4>مصنوع من</h4>
        {madeFrom.map((m) => {
          const id = `madeFrom-${m.value}`;
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
                checked={filters.selectedMadeFrom === m.value}
                onChange={() => handleRadioChange("selectedMadeFrom", m.value)}
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

            {/* ✅الاستخدام  */}
      <div className="filter-group">
        <h4>الاستخدام</h4>
        {usages.map((us) => {
          const id = `usage-${us.value}`;
          return (
            <div
              key={us.value}
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
                name="usages"
                value={us.value}
                checked={filters.selectedUsage === us.value}
onChange={() => handleRadioChange("selectedUsage", us.value)}
              />
              <label className="form-check-label" htmlFor={id}>
                {us.label}
              </label>
            </div>
          );
        })}
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
        <div style={{ display: "flex", gap: "8px" }}>
          <input
            placeholder="الباركود"
            className="size-input"
            value={filters.barcode}
            onChange={(e) => handleInputChange("barcode", e.target.value)}
          />
          <button
            onClick={() => {
              handleBarcodeSearch(filters.barcode);
              setFilters((prev) => ({ ...prev, barcode: "" })); // clear barcode
              setSearchTerm(""); // clear top search bar
            }}
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
    </div>
  );
}

export default ProductFilters;
