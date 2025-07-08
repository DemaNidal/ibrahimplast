// src/components/TaxTypeSelect.js
import React, { useState } from 'react';
import Select from 'react-select';
import customStyles from '../../styles/reactSelectStyles';

const CustomDropDown = ({ options, label, placeholder , onChange }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (option) => {
    setSelectedOption(option);
    if (onChange) onChange(option); 
  };

  return (
    <div>
      <label className="form-label">{label}</label>
      <Select
        options={options}
        value={selectedOption}
        onChange={handleChange}
        placeholder={placeholder}
        styles={customStyles}
        isSearchable={false}
      />
    </div>
  );
};

export default CustomDropDown;
