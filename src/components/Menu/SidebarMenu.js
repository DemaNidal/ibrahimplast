import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBarsStaggered,
  faHouse,
  faUser,
  faMagnifyingGlass,
  faPlus,
  faRightFromBracket,
  faMapMarkedAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "../../styles/SidebarMenu.css";

const SidebarMenu = ({ handleDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="sidebar-container">
      {/* Trigger Icon */}
      <div className="sidebar-trigger">
        <FontAwesomeIcon icon={faBarsStaggered} />
      </div>

      {/* Sidebar Menu */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h4>الابراهيم بلاست</h4>
          <p className="sidebar-subtitle">نظام إدارة المخازن</p>
        </div>

        <div className="sidebar-items">
          <div className="sidebar-item" onClick={() => navigate("/")}>
            <FontAwesomeIcon icon={faHouse} /> الصفحة الرئيسية
          </div>

          <div className="sidebar-item" onClick={() => navigate("/profile")}>
            <FontAwesomeIcon icon={faUser} /> الحساب الشخصي
          </div>

          <div className="sidebar-item" onClick={() => navigate("/search")}>
            <FontAwesomeIcon icon={faMagnifyingGlass} /> البحث عن منتج
          </div>

          <div className="sidebar-item" onClick={() => navigate("/addproduct")}>
            <FontAwesomeIcon icon={faPlus} /> إضافة منتج
          </div>

          <div className="sidebar-item logout" onClick={handleDelete}>
            <FontAwesomeIcon icon={faRightFromBracket} /> تسجيل الخروج
          </div>
        </div>

        {/* Mini Map */}
        <div className="sidebar-map">
          <h6>
            <FontAwesomeIcon icon={faMapMarkedAlt} /> الموقع 
          </h6>
          <iframe
            title="warehouse-map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1688.0165100297902!2d35.27318608402885!3d32.20334089719299!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151ce09ac87e9555%3A0x2c3f03b28a71e5b6!2sSamaritan%20Museum!5e0!3m2!1sar!2s!4v1761036201277!5m2!1sar!2s"
            width="100%"
            height="120"
            style={{ border: 0, borderRadius: "10px" }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>

        </div>
      </div>
    </div>
  );
};
export default SidebarMenu;
