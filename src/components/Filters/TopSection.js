// src/components/SearchPage/TopSection.js
import React from "react";
import "../../styles/SearchProduct.css"; // تأكد من مسار الملف
import { useLocation } from 'react-router-dom';


const TopSection = ({ onClose, hideAnimation }) => {
    const location = useLocation();
  const imageUrl = location.state?.imageUrl;
  return (
    <div className={`top-section ${hideAnimation ? "fade-out" : ""}`}>
      <div className="image-wrapper">
      {imageUrl && <img src={imageUrl} alt="Selected" className="search-image"  />}
        <button
          className="close-button"
          onClick={onClose}
          aria-label="إغلاق الصورة"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default TopSection;
