// context/ProductContext.js

import { createContext, useContext, useState } from 'react';

const ProductContext = createContext();



export const ProductProvider = ({ children }) => {
const [product, setProduct] = useState({
  name: '',
  notes: '',
  categoryId: '',
  categoryName: '', 
  color: [], // 👈 لازم يكون array للألوان المتعددة
  currency: '',
  madeFrom: '',
  unit: '',
  usage: '',

  price: '',
  size_value: '',
  sizeUnit: '',
  image_url: null,
  imageFile: null,
  quantities: [], // 👈 جديد
  locations: []   // 👈 جديد
});


  return (
    <ProductContext.Provider value={{ product, setProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
