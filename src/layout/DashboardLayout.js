import React, { useState } from 'react';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <main>
        <Outlet context={{ searchTerm, setSearchTerm }} /> {/* Pass to children */}
      </main>
    </>
  );
};

export default DashboardLayout;
