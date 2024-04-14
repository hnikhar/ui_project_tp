import React, { useState } from 'react';
import TreeNode from './TreeNode';
import Modal from '../Modal/Modal';
import ContentArea from '../ContentArea/ContentArea';
import './TreeMenu.css';

const initialTreeData = [
  {
    label: 'Root',
    children: [
      {
        label: 'Parent A',
        children: [
          { label: 'Child A1' },
          {
            label: 'Child Parent A2',
            children: [
              { label: 'Child A21' },
              { label: 'Child A22' }
            ]
          }
        ]
      },
      {
        label: 'Parent B',
        children: [
          { label: 'Child B1' },
          { label: 'Child B2' },
          { label: 'Child Parent B3' }
        ]
      }
    ]
  }
];

const TreeMenu = () => {
  const [openNodes, setOpenNodes] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const handleToggle = (node) => {
    setOpenNodes((prevOpenNodes) => ({
      ...prevOpenNodes,
      [node]: !prevOpenNodes[node],
    }));
  };

  const handleNodeClick = (nodeLabel) => {
    const fullItemData = findItemData(nodeLabel, initialTreeData);
    setModalContent(nodeLabel);
    setIsModalOpen(true);
    setSelectedItem(fullItemData);
  };

  const findItemData = (label, nodes) => {
    for (const node of nodes) {
      if (node.label === label) {
        return node;
      }
      if (node.children) {
        const found = findItemData(label, node.children);
        if (found) return found;
      }
    }
    return null;
  };

  const renderTreeNodes = (nodes) => {
    return nodes.map((node, index) => (
      <TreeNode
        key={node.label + index} // This key assumes labels are unique. 
        label={node.label}
        isOpen={openNodes[node.label]}
        onToggle={() => handleToggle(node.label)}
        onClick={() => handleNodeClick(node.label)}
      >
        {node.children && renderTreeNodes(node.children)}
      </TreeNode>
    ));
  };
  
  return (
    <div className="tree-menu-container">
   <div className="tree-section">
        <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <p>{`Item clicked: ${modalContent}`}</p>
        </Modal>
      <div className="tree-list">
          {renderTreeNodes(initialTreeData)}
        </div>
        </div>
      <ContentArea selectedItem={selectedItem} />
    </div>
  );
};

export default TreeMenu;
