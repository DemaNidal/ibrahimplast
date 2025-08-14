import React, { useEffect, useState } from "react";
import "../../styles/SearchProduct.css";
import ProductCard from "../../components/Products/ProductCard";
import ProductFilters from "../../components/Filters/ProductFilters";
import { fetchAllProducts, fetchProductByTerm } from "../../services/productService";
import { useNavigate, useOutletContext } from "react-router-dom";

const SearchProduct = () => {
  const [products, setProducts] = useState([]);
  const { searchTerm, setSearchTerm } = useOutletContext();
  const navigate = useNavigate();
  
  // const rawOptions = ["أضيف حديثا", "الأقدم"];
  // const dropdownOptions = rawOptions.map((text) => ({
  //   label: text,
  //   value: text.replace(/\s/g, "-").toLowerCase(),
  // }));
 

useEffect(() => {
  const fetchData = async () => {
    try {
      if (searchTerm.trim()) {
        const response = await fetchProductByTerm(searchTerm);
        setProducts(response.data);
      } else {
        const response = await fetchAllProducts();
        setProducts(response.data);
      }
    } catch (error) {
      console.error("خطأ في جلب المنتجات", error);
    }
  };

  fetchData();
}, [searchTerm]);
  const handleClose = () => {
    setSearchTerm('');
    navigate('/search', {
      replace: true,
      state: { clearSearch: true }
    });
  };

  return (
    <div className="search-page">
      {searchTerm && (
        <div className="search-header">
          <button
            type="button"
            aria-label="Close"
            className="close-btn"
            onClick={handleClose}
          >
            &times;
          </button>
          <strong>نتائج البحث عن "{searchTerm}"</strong>
        </div>
      )}

      <div className="content">
        <ProductFilters  setProducts={setProducts} />
        <div className="right-section" style={{ flex: 1 }}>
          <div className="top-bar">
            <div className="product-count">{products.length} منتج</div>
            {/* <CustomDropDown options={dropdownOptions} /> */}
          </div>
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product.product_id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchProduct;
 