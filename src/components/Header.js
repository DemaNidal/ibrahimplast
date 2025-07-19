import React, { useRef ,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IoCameraOutline } from "react-icons/io5";
import { faBarsStaggered , faUser, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
const [inputKey, setInputKey] = useState(Date.now());

  const handleCameraClick = () => {
    fileInputRef.current.click(); // يفتح اختيار الملف
  };

const handleImageChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const imageUrl = URL.createObjectURL(file);
    navigate('/search', { state: { imageUrl } });
    setInputKey(Date.now()); // ✅ يجبر input يتحدث
  }
};


  return (
    <div className="header">
      <div className="header-left">
        <img src="/logo192.png" alt="Al Ibrahem Plast" style={{ width: '120px' }} />
        <span className="title">الابراهيم بلاست</span>
      </div>

      <div className="search-bar">
        <FontAwesomeIcon className="search-icon" icon={faMagnifyingGlass} />
        <input type="text" placeholder="bag" />
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
        <FontAwesomeIcon icon={faBarsStaggered} />
        <FontAwesomeIcon className="icon profile-icon" icon={faUser} />
      </div>
    </div>
  );
};

export default Header;
