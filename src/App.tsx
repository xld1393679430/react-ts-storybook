import React from "react";
import { TestDemos, ButtonExample, MenuExample } from "./components/Examples";

function App() {
  return (
    <div style={{ padding: 20 }}>
      <h1>App</h1>

      <hr />
      <TestDemos />

      <hr />
      <ButtonExample />

      <hr />
      <MenuExample />
    </div>
  );
}

export default App;
