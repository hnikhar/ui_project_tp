// src/components/Footer/Footer.js

import React from 'react';
import './Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <p>Copyright © {new Date().getFullYear()}. Harsha Nikhar. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
