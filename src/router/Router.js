import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/login/Login';
import AddProduct from '../pages/product/AddProduct';
import Dashboard from '../pages/Dashboard';
import DashboardLayout from '../layout/DashboardLayout';
import SearchProduct from '../pages/product/SearchProduct';
import ProductView from "../pages/product/ProductView";
import PrivateRoute from "../router/PrivateRoute";
import Register from '../pages/login/Register';

function AppRouter() {
  return (
    <Routes>
      {/* Protected routes */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="addproduct" element={<AddProduct />} />
        <Route path="search" element={<SearchProduct />} />
        <Route path="productview/:id" element={<ProductView />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Public route */}
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
export default AppRouter;
