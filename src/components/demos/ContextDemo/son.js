import { useContext } from "react";
import { ThemeContext } from ".";

const Index = () => {
  const { theme, dispatchTheme } = useContext(ThemeContext);

  const handleToggleTheme = () => {
    dispatchTheme({
      type: "toggle",
    });
  };
  return (
    <div>
      <p>Son</p>
      <p>theme：{theme}</p>
      <button onClick={handleToggleTheme}>切换主题</button>
    </div>
  );
};

export default Index;
