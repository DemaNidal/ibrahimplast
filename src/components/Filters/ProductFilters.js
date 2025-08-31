import React, { useState , useEffect} from "react";
import "../../styles/ProductFilters.css";
import { useLookupData } from "../../hooks/useLookupData";
import {
  fetchCategories,
  fetchMadeFrom,
  fetchSizeUnits,
  fetchwarehouse,
  fetchUsages,
} from "../../services/lookupService";
import { fetchProductByBarcode, searchProducts } from "../../services/productService";
import { useOutletContext } from "react-router-dom";
import CategoryFilter from "./CategoryFilter";
import SizeFilter from "./SizeFilter";
import UsageFilter from "./UsageFilter";
import MadeFromFilter from "./MadeFromFilter";
import WarehouseFilter from "./WarehouseFilter";
import BarcodeFilter from "./BarcodeFilter";

function ProductFilters({ setProducts }) {
  const { searchTerm, setSearchTerm } = useOutletContext();
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
  });
  const [barcodeInput, setBarcodeInput] = useState("");


  // inside your component
 const handleFilterChange = async (updatedFilters) => {
    try {
      const data = await searchProducts(updatedFilters, searchTerm, {
        categories, madeFrom, warehouses, sizeUnits, usages
      });
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };





  const handleBarcodeSearch = async () => {
    if (!barcodeInput.trim()) {
      alert("أدخل الباركود أولاً");
      return;
    }
    try {
      const res = await fetchProductByBarcode(barcodeInput);
      const data = Array.isArray(res.data) ? res.data : [res.data];
      setProducts(data);

      // Clear barcode + global search term
      setBarcodeInput("");
      setSearchTerm("");
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
  setFilters((prev) => {
    const newFilters = { ...prev, [key]: value };
    console.log("new", JSON.stringify(newFilters));
    handleFilterChange(newFilters);
    return newFilters;
  });
};

const handleInputChange = (key, value) => {
  setFilters((prev) => {
    const newFilters = { ...prev, [key]: value };
    console.log("input"+JSON.stringify(newFilters));
    handleFilterChange(newFilters);
    return newFilters;
  });
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

  useEffect(() => {
  if (searchTerm) {
    handleFilterChange(filters);
  }
}); 

  return (
    <div className="filters" dir="rtl">
      <div className="filter-header">
        <span style={{ fontWeight: "600" }}>تصفيه</span>
      </div>

      {/* ✅ الفئة */}
      <CategoryFilter
        categories={categories}
        selectedCategories={filters.selectedCategories}
        onChange={handleCategoryChange}
        onClear={clearAllSelections}
      />

      {/* ✅ مصنوع من */}
       <MadeFromFilter
        madeFrom={madeFrom}
        selectedMadeFrom={filters.selectedMadeFrom}
        onChange={(value) => handleRadioChange("selectedMadeFrom", value)}
      />


      {/* ✅ الحجم */}
         <SizeFilter
        size={filters.size}
        sizeUnit={filters.sizeUnit}
        sizeUnits={sizeUnits}
        onInputChange={handleInputChange}
      />

            {/* ✅الاستخدام  */}
      <UsageFilter
        usages={usages}
        selectedUsage={filters.selectedUsage}
        onChange={(value) => handleRadioChange("selectedUsage", value)}
      />

      {/* ✅ مكان التخزين */}
     <WarehouseFilter
        warehouses={warehouses}
        selectedWarehouse={filters.selectedWarehouse}
        onChange={(value) => handleRadioChange("selectedWarehouse", value)}
      />

      {/* ✅ الباركود */}
    <BarcodeFilter
  barcode={barcodeInput}
  onBarcodeChange={setBarcodeInput}
  onBarcodeSearch={handleBarcodeSearch}
/>

    </div>
  );
}

export default ProductFilters;
