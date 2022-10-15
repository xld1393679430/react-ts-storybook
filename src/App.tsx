import React from 'react';
import Hello from './components/demos/Hello'
import ContextDemo from './components/demos/ContextDemo'

function App() {
  return (
    <div className="App">
      <h1>App</h1>
      <Hello message='hello world' />
      <ContextDemo />
    </div>
  );
}

export default App;
