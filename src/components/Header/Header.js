// src/components/Header/Header.js

import React from 'react';
import logo from '../../assets/logo.jpeg'; 
import './Header.css'; 

const Header = () => {
  return (
    <header className="header">
      <img src={logo} className="logo" alt="logo" />
      <h1>TabaPay UI Project</h1>
    </header>
  );
};

export default Header;
