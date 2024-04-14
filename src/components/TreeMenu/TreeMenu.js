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

  const handleNodeClick = (item) => {
    setModalContent(item.label);
    setIsModalOpen(true);
    setSelectedItem(item);
  };

  const renderTreeNodes = (treeData) => {
    return treeData.map((node) => (
      // TODO: Add key to the component? 
      <TreeNode label={node.label} isOpen={openNodes[node.label]} onToggle={() => handleToggle(node.label)} onClick={() => handleNodeClick({ label: node.label })}>
        {node.children && renderTreeNodes(node.children)}
      </TreeNode>
    ));
  };

  return (
    <div className="tree-menu-container">
    <div className="tree-menu">
        <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <p>{`Item clicked: ${modalContent}`}</p>
      </Modal>
        {renderTreeNodes(initialTreeData)}
      </div>
      <ContentArea selectedItem={selectedItem} />
    </div>
  );
};

export default TreeMenu;
