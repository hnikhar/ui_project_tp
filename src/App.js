import React from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import TreeMenu from './components/TreeMenu/TreeMenu';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="main-content">
        <h2>Dynamic Tree Menu</h2>
        <TreeMenu />
      </div>
      <Footer />
    </div>
  );
}

export default App;
