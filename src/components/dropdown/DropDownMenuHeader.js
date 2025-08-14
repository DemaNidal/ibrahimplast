import { useState, useEffect } from "react";

export default function SidebarMenu({ trigger, children }) {
  const [show, setShow] = useState(false);

  // Close on outside click
  useEffect(() => {
    const closeOnOutsideClick = (e) => {
      if (show && !e.target.closest(".sidebar-menu") && !e.target.closest(".menu-trigger")) {
        setShow(false);
      }
    };
    document.addEventListener("click", closeOnOutsideClick);
    return () => document.removeEventListener("click", closeOnOutsideClick);
  }, [show]);

  return (
    <>
      <div className="menu-trigger" onClick={() => setShow(true)}>
        {trigger}
      </div>

      {/* Overlay */}
      {show && <div className="overlay" onClick={() => setShow(false)}></div>}

      {/* Sidebar */}
      <div className={`sidebar-menu ${show ? "open" : ""}`}>
        <div className="sidebar-content">
          {children}
        </div>
      </div>
    </>
  );
}

export function SidebarItem({ children, onClick }) {
  return (
    <div
      className="sidebar-item"
      onClick={onClick}
    >
      {children}
    </div>
  );
}
