
import React, { useState } from 'react';
import './ContentArea.css'; 

const ContentArea = ({ selectedItem }) => {
  const [openCategory, setOpenCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  const renderCategories = (item) => {
    if (!item || !item.children || item.children.length === 0) {
      return <p>Details of {item.label}: No additional information.</p>;
    }
    
    return item.children.map((child, index) => (
      <div key={index} className="category">
        <button onClick={() => handleCategoryClick(child.label)}>
          {child.label}
        </button>
        {openCategory === child.label && (
          <div className="category-details">
            {child.details ? <p>{child.details}</p> : <p>This is the child of {item.label}</p>}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="content-area">
      {!selectedItem ? (
        <p>Select an item from the tree</p>
      ) : (
        <>
          <h1>{selectedItem.label}</h1>
          <div className="categories-container">
            {renderCategories(selectedItem)}
          </div>
        </>
      )}
    </div>
  );
};

export default ContentArea;