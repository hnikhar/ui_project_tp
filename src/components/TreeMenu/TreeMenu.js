import React, { useState } from 'react';
import TreeNode from './TreeNode';

const TreeMenu = () => {
  const [openNodes, setOpenNodes] = useState({});

  const handleToggle = (node) => {
    setOpenNodes((prevOpenNodes) => ({
      ...prevOpenNodes,
      [node]: !prevOpenNodes[node],
    }));
  };

  return (
    <TreeNode
          label="Root"
          isOpen={openNodes['Root']}
          onToggle={() => handleToggle('Root')}
        >
          <TreeNode
            label="Parent A"
            isOpen={openNodes['ParentA']}
            onToggle={() => handleToggle('ParentA')}
          >
            <TreeNode label="Child A1" />
            <TreeNode
              label="Child Parent A2"
              isOpen={openNodes['ChildParentA2']}
              onToggle={() => handleToggle('ChildParentA2')}
            >
              <TreeNode label="Child A21"  />
              <TreeNode label="Child A22"  />
            </TreeNode>
          </TreeNode>
          <TreeNode
            label="Parent B"
            isOpen={openNodes['ParentB']}
            onToggle={() => handleToggle('ParentB')}
          >
            <TreeNode label="Child B1"  />
            <TreeNode label="Child B2"  />
            <TreeNode label="Child Parent B3"/>
          </TreeNode>
        </TreeNode>
  );
};

export default TreeMenu;
