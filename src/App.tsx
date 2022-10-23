import React from "react";
import { TestDemos, ButtonExample, MenuExample, IconExample } from "./components/Examples";

function App() {
  return (
    <div style={{ padding: 60 }}>
      <h1>App</h1>

      <hr />
      <TestDemos />

      <hr />
      <ButtonExample />

      <hr />
      <MenuExample />

      <hr />
      <IconExample />
    </div>
  );
}

export default App;
