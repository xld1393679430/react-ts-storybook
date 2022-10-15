import React from 'react';
import Hello from './components/demos/Hello'
import ContextDemo from './components/demos/ContextDemo'
import './App.css';

function App() {
  return (
    <div className="App">
      <Hello message='hello world' />
      <ContextDemo />
    </div>
  );
}

export default App;
