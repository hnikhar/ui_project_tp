import React from 'react';

const TreeNode = ({ label, children, onToggle, onClick, isOpen }) => {
  const hasChildren = children && children.length > 0;

  const handleToggle = (e) => {
    e.stopPropagation(); 
    if (hasChildren) {
      onToggle();
    }
  };

  return (
    <div>
      <span onClick={handleToggle} style={{ cursor: 'pointer' }}>
        {hasChildren ? (isOpen ? '▼' : '►') : (
          <input
            type="radio"
            name="tree-leaf"
            onChange={handleToggle} 
          />
        )}
        {' '}
        <span>{label}</span>
      </span>
      {hasChildren && isOpen && <div style={{ paddingLeft: '20px' }}>{children}</div>}
    </div>
  );
};

export default TreeNode;
