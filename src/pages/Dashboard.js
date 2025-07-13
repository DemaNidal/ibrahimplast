import React from 'react';
import Header from '../components/Header';

function Dashboard() {
  return (
    <>
      <Header />

      <div className="container mt-4">
        {/* باقي محتوى الداشبورد */}
        <h2>مرحباً بك في لوحة التحكم</h2>
      </div>
    </>
  );
}

export default Dashboard;
