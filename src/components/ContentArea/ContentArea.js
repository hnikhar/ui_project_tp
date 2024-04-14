// src/components/ContentArea/ContentArea.js

import React from 'react';
import './ContentArea.css'; 

const ContentArea = ({ selectedItem }) => {
  if (!selectedItem) {
    return <div className="content-area">Select an item from the tree</div>;
  }

  return (
    <div className="content-area">
      <h1>{selectedItem.label}</h1>
      <p>{selectedItem.details}</p>
    </div>
  );
};

export default ContentArea;
