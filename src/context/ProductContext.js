// context/ProductContext.js

import { createContext, useContext, useState } from 'react';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    category: null,
    color: null,
    currency: null,
    madeFrom: null,
    usage: null,
    unit: null,
    sizeUnit: null,
    quantity: '',
    volume: '',
    location: '',
    price: '',
    barcode: '',
    image: ''
  });

  return (
    <ProductContext.Provider value={{ product, setProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
