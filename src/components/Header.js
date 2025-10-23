import React, { useRef, useEffect,useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IoCameraOutline } from "react-icons/io5";
import { faUser, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import SidebarMenu from './Menu/SidebarMenu';
// import SidebarMenu,{SidebarItem} from './dropdown/DropDownMenuHeader';
import api from '../config/api';

const Header = ({ searchTerm, setSearchTerm }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [inputKey, setInputKey] = React.useState(Date.now());
 const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  useEffect(() => {
    if (location.state?.clearSearch) {
      setSearchTerm('');
    }
  }, [location.state, setSearchTerm]);

  const handleCameraClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      navigate('/search', { state: { imageUrl } });
      setInputKey(Date.now());
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?term=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/search'); // No term, load all products
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

const handleDelete = () => {
  sessionStorage.removeItem("user-token");
  console.log("After remove:", sessionStorage.getItem("user-token")); // should be null

  api.get('/logout')
    .then(res => {
      console.log("Logout response:", res.data);
      console.log("After API call:", sessionStorage.getItem("user-token"));
      navigate('/login');
    })
    .catch(err => {
      console.log("Error:", err);
      console.log("After error:", sessionStorage.getItem("user-token"));
      navigate('/login');
    });
};


  return (
    <div className="header">
      <div className="header-left">
        <img src="/logo192.png" alt="Al Ibrahem Plast" style={{ width: '120px' }} />
        <span className="title">الابراهيم بلاست</span>
      </div>

      <div className="search-bar">
        <FontAwesomeIcon className="search-icon" icon={faMagnifyingGlass} />
        <input
          type="text"
          placeholder="ابحث هنا"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <IoCameraOutline className="camera-icon" onClick={handleCameraClick} />
        <input
          key={inputKey}
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />
      </div>

      <div className="header-right">
        <SidebarMenu isOpen={isSidebarOpen} onClose={toggleSidebar} handleDelete={handleDelete}  />

        <FontAwesomeIcon className="icon profile-icon" icon={faUser} />
      </div>
      
    </div>
    
  );
};

export default Header;
