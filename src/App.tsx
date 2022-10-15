import React from "react";
import { Demos, Button } from "./components/";
import { ButtonType, ButtonSize } from "./components/Button";

function App() {
  return (
    <div className="App">
      <h1>App</h1>
      {/* <Demos /> */}

      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Button>default</Button>
        <Button btnType={ButtonType.primary} size={ButtonSize.large}>
          primary 2
        </Button>
        <Button btnType={ButtonType.primary} disabled>
          primary 2
        </Button>

        <Button btnType={ButtonType.link} size={ButtonSize.large} href="https://www.baidu.com" disabled>
          link
        </Button>

        <Button btnType={ButtonType.link} href="https://www.baidu.com" disabled>
          link
        </Button>
      </div>
    </div>
  );
}

export default App;
