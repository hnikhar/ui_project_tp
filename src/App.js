import React from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import TreeMenu from './components/TreeMenu/TreeMenu';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="main-container">
        <h2 className="tree-heading">Dynamic Tree Menu</h2>
        <div className="main-content">
          <TreeMenu />
        </div>
        </div>
      <Footer />
    </div>
  );
}

export default App;
