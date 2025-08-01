import React, { useEffect, useState } from "react";
import "../../styles/SearchProduct.css";
import ProductCard from "../../components/Products/ProductCard";
import CustomDropDown from "../../components/dropdown/CustomDropDown";
import ProductFilters from "../../components/Filters/ProductFilters";
import { fetchAllProducts } from "../../services/productService";

const SearchProduct = () => {
  const [products, setProducts] = useState([]);
  const rawOptions = ["أضيف حديثا", "الأقدم"];

  const dropdownOptions = rawOptions.map((text) => ({
    label: text,
    value: text.replace(/\s/g, "-").toLowerCase(),
  }));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formData = new FormData(); // إذا عندك فلترة حطها هون
        const response = await fetchAllProducts(formData);
        console.log(response.data);
        setProducts(response.data); // تأكد من المسار حسب الباك
      } catch (error) {
        console.error("خطأ في جلب المنتجات", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="search-page">
      <div className="content">
        <ProductFilters />
        <div className="right-section" style={{ flex: 1 }}>
          <div className="top-bar">
            <div className="product-count">{products.length} منتج</div>
            <CustomDropDown options={dropdownOptions} />
          </div>
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product.product_id} product={product} />
            ))}
          </div>
        </div>
      </div>

      <div className="pagination">
        <button>{"<"}</button>
        <button>1</button>
        <button>2</button>
        <button className="active">3</button>
        <button>4</button>
        <button>5</button>
        <span>...</span>
        <button>11</button>
        <button>{">"}</button>
      </div>
    </div>
  );
};

export default SearchProduct;
