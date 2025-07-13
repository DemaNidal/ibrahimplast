import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/login/Login'
import AddProduct from '../pages/AddProduct';
import ProductForm from '../components/Products/ProductForm';
import Dashboard from '../pages/Dashboard';
import SearchPage from '../pages/SearchPage';

function Router() {
  return (
      <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/addproduct" element={<AddProduct />} />
      <Route path="/productform" element={<ProductForm />} />
      <Route path="/" element={<Dashboard />} />
      <Route path='/search' element={<SearchPage />} />
      
    </Routes>
  )
}

export default Router
