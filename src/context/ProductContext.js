// context/ProductContext.js

import { createContext, useContext, useState } from 'react';

const ProductContext = createContext();



export const ProductProvider = ({ children }) => {
 const [product, setProduct] = useState({
  name: '',
  notes: '',
  category: '',
  color: '',
  currency: '',
  madeFrom: '',
  unit: '',
  usage: '',
  quantity: '',
  price: '',
  size_value: '',
  sizeUnit: '',
  location: '',
  warehouse:'',
  image: null, // 👈 صح للعرض فقط
  imageFile: null,

});



  return (
    <ProductContext.Provider value={{ product, setProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
