import React from 'react';
import TreeMenu from './components/TreeMenu/TreeMenu';
import './App.css'; // If you have styles specific to the App component

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Dynamic Tree Menu</h1>
      </header>
      <main>
        <TreeMenu />
      </main>
    </div>
  );
}

export default App;
