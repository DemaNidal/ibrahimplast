import React from 'react';
import { Dropdown } from 'react-bootstrap';
import '../styles/header.css'

const Header = () => {
  return (
    <div className="d-flex justify-content-between align-items-center px-4 py-3 bg-light shadow-sm rounded" style={{ height: '70px' }}>

      <div className="d-flex align-items-center gap-3">
         {/* صورة البروفايل */}
        <Dropdown align="start">
          <Dropdown.Toggle as="div" className="profile-image rounded-circle" role="button">
            <img
              src="/profile.png"
              alt="User"
              style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '50%' }}
            />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>الملف الشخصي</Dropdown.Item>
            <Dropdown.Item>الإعدادات</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>تسجيل الخروج</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        {/* أيقونة التطبيقات */}
        <div className="icon-button">
          <i className="bi bi-grid-3x3-gap-fill"></i>
        </div>

       
      </div>
    </div>
  );
};

export default Header;
