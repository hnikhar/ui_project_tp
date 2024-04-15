const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

let treeData = [
    {
        label: 'Server Root',
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

// API endpoints
app.get('/api/treeData', (req, res) => {
    res.json(treeData);
});

app.post('/api/addNode', (req, res) => {
    const { parentNode, newNode } = req.body;
    // Add newNode to parentNode in treeData
    const updatedTreeData = [...treeData];
    const parentToUpdate = findNode(updatedTreeData, parentNode.label);
    if (!parentToUpdate) {
        res.status(404).json({ error: `Parent node '${parentNode.label}' not found` });
        return;
    }
    const childExists = findNode(updatedTreeData, newNode.label);
    if (childExists) {
        res.status(404).json({ error: `Child node '${newNode.label}' already exists.` });
        return;
    }
    parentToUpdate.children = parentToUpdate.children ? [...parentToUpdate.children, newNode] : [newNode];
    res.json({ message: 'Node added successfully', updatedTreeData: treeData });
});

app.delete('/api/deleteNode', (req, res) => {
    console.log("Received req to delete node.")
    const { parentNode, nodeToDeleteLabel } = req.body;

    // Find the parent node in the tree data
    const parentToUpdate = findNode(treeData, parentNode.label);
    if (!parentToUpdate) {
        return res.status(404).json({ error: `Parent node '${parentNode.label}' not found.` });
    }

    // Filter out the node to be deleted and its children
    parentToUpdate.children = parentToUpdate.children.filter(node => {
        if (node.label === nodeToDeleteLabel) {
            console.log(`Deleting node '${node.label}'.`);
            return false; // Exclude the node from the children
        }
        return true; // Keep other nodes unchanged
    });

    res.json({ success: true, updatedTreeData: treeData });
});


// Helper function to find a node in treeData
function findNode(tree, label) {
    for (const node of tree) {
        if (node.label === label) {
            return node;
        }
        if (node.children) {
            const foundNode = findNode(node.children, label);
            if (foundNode) {
                return foundNode;
            }
        }
    }
    return null; // Node not found
}

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});