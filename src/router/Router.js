import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/login/Login';
import AddProduct from '../pages/product/AddProduct';
import Dashboard from '../pages/Dashboard';
import DashboardLayout from '../layout/DashboardLayout';
import SearchProduct from '../pages/product/SearchProduct';
import ProductView from "../pages/ProductView/ProductView";
import PrivateRoute from "../router/PrivateRoute";
import Register from '../pages/login/Register';
import Profile from '../pages/Profile';

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
        <Route path='/profile' element={<Profile />}></Route>
      </Route>

      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default AppRouter;
