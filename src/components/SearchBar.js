import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/SearchBar.css';

const SearchBar = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="search-container d-flex align-items-center px-3 py-2 shadow bg-white rounded-pill">
        <FontAwesomeIcon icon={faSearch} className="text-muted me-2" />
        <input
          type="text"
          placeholder="Search anything..."
          className="form-control border-0 shadow-none"
          style={{ width: '250px' }}
        />
        <button className="btn btn-primary rounded-pill px-4 ms-2">
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
