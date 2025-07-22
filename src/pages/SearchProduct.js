import React from "react";
import "../styles/SearchProduct.css";
import ProductCard from "../components/Products/ProductCard";
import CustomDropDown from "../components/dropdown/CustomDropDown";
import ProductFilters from "../components/Filters/ProductFilters";
//import TopSection from "../components/Filters/TopSection";


const SearchProduct = () => {
  const rawOptions = ["أضيف حديثا", "الأقدم"];

  const dropdownOptions = rawOptions.map((text) => ({
    label: text,
    value: text.replace(/\s/g, "-").toLowerCase(), // ex: "أضيف حديثا" → "أضيف-حديثا"
  }));

  // const [showImage, setShowImage] = useState(true);
  // const [hideAnimation, setHideAnimation] = useState(false);

  // const handleClose = () => {
  //   setHideAnimation(true);
  //   setTimeout(() => {
  //     setShowImage(false);
  //   }, 300); // نفس مدة الأنيميشن
  // };
  return (
    <div className="search-page">
    {/* {showImage && (
        <TopSection onClose={handleClose} hideAnimation={hideAnimation} />
      )} */}
      <div className="content">
        <ProductFilters />

        <div className="right-section" style={{ flex: 1 }}>
          {/* ✅ top-bar خارج product-grid */}
          <div className="top-bar">
            <div className="product-count">1001 منتج</div>
            <CustomDropDown options={dropdownOptions} />
          </div>
          <div className="product-grid">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
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
