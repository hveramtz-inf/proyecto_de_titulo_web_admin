// src/components/Layout/Layout.jsx
import React from 'react';
import NavBar from '../Navbar/NavBar';
import { Outlet } from 'react-router-dom';

const Layout = ({ onSelect }) => {
  return (
    <div>
      <NavBar onSelect={onSelect} />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;