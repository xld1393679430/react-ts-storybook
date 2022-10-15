import { createContext, useReducer } from "react";
import Son from "./son";

export const ThemeContext = createContext();

const Theme = {
  light: "light",
  dark: "dark",
};

const initialState = {
  theme: Theme.light,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "toggle":
      return {
        ...state,
        theme: state.theme === Theme.light ? Theme.dark : Theme.light,
      };
    default:
      return state;
  }
};

const ContextDemo = () => {
  const [{ theme }, dispatchTheme] = useReducer(reducer, initialState);

  return (
    <ThemeContext.Provider value={{ theme, dispatchTheme }}>
      <div>
        <p>改变 UseContext的value</p>
        <Son />
      </div>
    </ThemeContext.Provider>
  );
};

export default ContextDemo;
