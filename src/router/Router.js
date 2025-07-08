import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/login/Login'
import AddProduct from '../pages/AddProduct';
import ProductForm from '../components/Products/ProductForm';

function Router() {
  return (
      <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/addproduct" element={<AddProduct />} />
       <Route path="/productform" element={<ProductForm />} />
      
    </Routes>
  )
}

export default Router
