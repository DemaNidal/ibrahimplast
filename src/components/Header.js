import React from 'react';
import '../styles/header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IoCameraOutline } from "react-icons/io5";
import { faBarsStaggered , faUser, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
const Header = () => {
  return (
    <div className="header">
      <div className="header-left">
        {/* <img
          src="/dd0b5ae2-cc26-4a80-ae13-b5d95f97b769.png"
          alt="Shopping icon"
          className="shopping-icon"
        /> */}
          <img src="/logo192.png" alt="Al Ibrahem Plast" style={{ width: '120px' }} />

        <span className="title">الابراهيم بلاست</span>
      </div>

      <div className="search-bar">
        <FontAwesomeIcon className="search-icon" icon={faMagnifyingGlass} />
        <input type="text" placeholder="bag" />
        
        <IoCameraOutline 
          className="camera-icon"
        />
      </div>

      <div className="header-right">
        <FontAwesomeIcon icon={faBarsStaggered} />
        <FontAwesomeIcon className="icon profile-icon" icon={faUser} />
      </div>
    </div>
  );
};

export default Header;
