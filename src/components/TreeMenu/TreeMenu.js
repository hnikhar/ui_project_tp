import React, { useState } from 'react';
import TreeNode from './TreeNode';
import Modal from '../Modal/Modal';

const TreeMenu = () => {
  const [openNodes, setOpenNodes] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const handleToggle = (node) => {
    setOpenNodes((prevOpenNodes) => ({
      ...prevOpenNodes,
      [node]: !prevOpenNodes[node],
    }));
  };

  const handleNodeClick = (item) => {
    setModalContent(item.label);
    setIsModalOpen(true);
  };

  return (
    <div>
        <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <p>{`Item clicked: ${modalContent}`}</p>
      </Modal>
      <TreeNode
          label="Root"
          isOpen={openNodes['Root']}
          onToggle={() => handleToggle('Root')}
          onClick={() => handleNodeClick({ label: 'Root', details: 'Details about Root' })}
        >
          <TreeNode
            label="Parent A"
            isOpen={openNodes['ParentA']}
            onToggle={() => handleToggle('ParentA')}
            onClick={() => handleNodeClick({ label: 'Parent A', details: 'Details about Parent A' })}
          >
            <TreeNode label="Child A1" onClick={() => handleNodeClick({ label: 'Child A1', details: 'Details about Child A1' })} />
            <TreeNode
              label="Child Parent A2"
              isOpen={openNodes['ChildParentA2']}
              onToggle={() => handleToggle('ChildParentA2')}
              onClick={() => handleNodeClick({ label: 'Child Parent A2', details: 'Details about Child Parent A2' })}
            >
              <TreeNode label="Child A21" onClick={() => handleNodeClick({ label: 'Child A21', details: 'Details about Child A21' })} />
              <TreeNode label="Child A22" onClick={() => handleNodeClick({ label: 'Child A22', details: 'Details about Child A22' })} />
            </TreeNode>
          </TreeNode>
          <TreeNode
            label="Parent B"
            isOpen={openNodes['ParentB']}
            onToggle={() => handleToggle('ParentB')}
            onClick={() => handleNodeClick({ label: 'Parent B', details: 'Details about Parent B' })}
          >
            <TreeNode label="Child B1" onClick={() => handleNodeClick({ label: 'Child B1', details: 'Details about Child B1' })} />
            <TreeNode label="Child B2" onClick={() => handleNodeClick({ label: 'Child B2', details: 'Details about Child B2' })} />
            <TreeNode label="Child Parent B3" onClick={() => handleNodeClick({ label: 'Child Parent B3', details: 'Details about Child Parent B3' })} />
          </TreeNode>
        </TreeNode>
    </div>
  );
};

export default TreeMenu;
