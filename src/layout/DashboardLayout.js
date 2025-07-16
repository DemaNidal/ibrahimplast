
import React from 'react';
import Header from '../components/Header'; // Adjust the path if needed
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet /> {/* This will render the page content */}
      </main>
    </>
  );
};

export default DashboardLayout;
