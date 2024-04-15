import React, { useState, useEffect } from 'react';
import axios from 'axios';
import greeting from 'greeting'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import TreeNode from './TreeNode';
import Modal from '../Modal/Modal';
import ContentArea from '../ContentArea/ContentArea';
import './TreeMenu.css';


const backendServerURL = "http://localhost:1234"

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
  const [treeData, setTreeData] = useState([]);

  const [parentLabel, setParentLabel] = useState('');
  const [childLabel, setChildLabel] = useState('');

  useEffect(() => {
    fetchTreeData();
  }, []);

  const fetchTreeData = async () => {
    console.log('Fetching tree data from :', backendServerURL);
    try {
      const response = await axios.get(`${backendServerURL}/api/treeData`);
      console.log("Data from backed: ", response)
      setTreeData(response.data);
    } catch (error) {
      console.error('Error fetching tree data:', error);
    }
  };

  const handleToggle = (node) => {
    setOpenNodes((prevOpenNodes) => ({
      ...prevOpenNodes,
      [node]: !prevOpenNodes[node],
    }));
  };

  const handleNodeClick = (nodeLabel) => {
    const fullItemData = findItemData(nodeLabel, treeData);
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

  const addNode = async (parentNode, newNode) => {
    try {
      const response = await axios.post(`${backendServerURL}/api/addNode`, {
        parentNode,
        newNode
      });
      console.log(response);
      if (response.data.hasOwnProperty("updatedTreeData")) {
        setTreeData(response.data.updatedTreeData);
      }
    } catch (error) {
      console.error('Error adding node:', error);
    }
  };

  const deleteNode = async (parentNode, nodeToDeleteLabel) => {
    try {
      const response = await axios.delete(`${backendServerURL}/api/deleteNode`, {
        data: { parentNode, nodeToDeleteLabel }
      });
      console.log(response);
      if (response.data.hasOwnProperty("updatedTreeData")) {
        setTreeData(response.data.updatedTreeData);
      }
    } catch (error) {
      console.error('Error deleting node:', error);
    }
  };

  const handleAddNode = async () => {
    // Use the parentLabel and childLabel from the state
    const parentNode = findItemData(parentLabel, treeData);
    if (!parentNode) {
      console.error(`Parent node '${parentLabel}' not found.`);
      return;
    }
    const newNode = { label: childLabel, children: [] };
    await addNode(parentNode, newNode);
    setParentLabel('');
    setChildLabel('');
  };

  const handleDeleteNode = async () => {
    // Use the parentLabel and childLabel from the state
    const parentNode = findItemData(parentLabel, treeData);
    if (!parentNode) {
      console.error(`Parent node '${parentLabel}' not found.`);
      return;
    }
    await deleteNode(parentNode, childLabel);
    setParentLabel('');
    setChildLabel('');
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
    <Typography variant="h6">
            {`${greeting.random()}! You clicked: ${modalContent}`}
          </Typography>
        </Modal>
      <div className={`tree-list ${isModalOpen ? 'disabled' : ''}`}>
        <div className="tree-nodes-container">
          {renderTreeNodes(treeData)}
          </div>
          <div className="input-button-container">
          <div className="input-container">
          <TextField
    label="Parent Node Label"
    variant="outlined"
    value={parentLabel}
    onChange={(e) => setParentLabel(e.target.value)}
    size="small" // Setting the size to small
    sx={{ mr: 1, width: 'calc(50% - 10px)' }} // Adjusting the width similar to buttons
  />
  <TextField
    label="Child Node Label"
    variant="outlined"
    value={childLabel}
    onChange={(e) => setChildLabel(e.target.value)}
    size="small" // Setting the size to small
    sx={{ ml: 1, width: 'calc(50% - 10px)' }} // Adjusting the width similar to buttons
  />
        </div>
        <div className="button-container">
        <Button className="button"
                variant="contained" 
                color="primary" 
                onClick={handleAddNode}
                sx={{ width: 'calc(50% - 10px)', marginRight: '20px' }}
              >
                Add Child
              </Button>
              <Button className="button"
                variant="contained" 
                color="secondary" 
                onClick={handleDeleteNode}
                sx={{ width: 'calc(50% - 10px)' }}
              >
                Delete Child
              </Button>
        </div>
        </div>
        </div>
        </div>
      <ContentArea selectedItem={selectedItem} />
    </div>
  );
};

export default TreeMenu;
