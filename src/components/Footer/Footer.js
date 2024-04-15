// src/components/Footer/Footer.js
'use client'

import React from 'react';
import Typography from '@mui/material/Typography';
import './Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <Typography variant="subtitle1">Copyright © {new Date().getFullYear()}. Harsha Nikhar. All Rights Reserved.</Typography>
    </footer>
  );
};

export default Footer;
