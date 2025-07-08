// src/styles/reactSelectStyles.js

const customStyles = {
  control: (provided) => ({
    ...provided,
    borderRadius: '12px',
    border: '1px solid #dcdfe4',
    padding: '6px 10px',
    boxShadow: 'none',
    backgroundColor: '#f9f9fb',
  }),
  menu: (provided) => ({
    ...provided,
    border: 'none',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    borderRadius: '12px',
    overflow: 'hidden',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? '#f0f4ff' : 'white',
    color: state.isFocused ? '#2563eb' : '#333',
    padding: 12,
    cursor: 'pointer',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#999',
  }),
};

export default customStyles;
