import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/login/Login';
import AddProduct from '../pages/product/AddProduct';
import Dashboard from '../pages/Dashboard';
import DashboardLayout from '../layout/DashboardLayout';
import SearchProduct from '../pages/product/SearchProduct';
import ProductView from "../pages/product/ProductView";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="addproduct" element={<AddProduct />} />
        <Route path="search" element={<SearchProduct />} />
        <Route path="productview" element={<ProductView />} />
        {/* أضف صفحات أخرى هنا */}
      </Route>

      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default AppRouter;
