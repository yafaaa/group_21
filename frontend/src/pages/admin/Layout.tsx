// src/pages/restaurant/Layout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
// import Sidebar from './Sidebar';
// import AdminNavbar from '@/components/foodMenu/AdminNavbar';

const Layout = () => {
  return (
  <>
    {/* <AdminNavbar/> */}
    <div className="flex">
      {/* <Sidebar /> */}
      {/* Main content - responsive padding */}
      <div className="flex-1 md:ml-64 p-4 pt-24">
        <Outlet />
      </div>
    </div>
  </>
  );
};

export default Layout;
