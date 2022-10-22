import React, { createContext, useState } from "react";
import classNames from "classnames";

type MenuMode = "horizontal" | "vertical";
type SelectCallback = (selectedIndex: number) => void;

export interface BaseMenuProps {
  defaultIndex?: number;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectCallback;
}

type MenuProps = BaseMenuProps & React.HTMLAttributes<HTMLElement>;

interface IMenuContext {
  index: number;
  onSelect?: SelectCallback;
}

export const MenuContext = createContext<IMenuContext>({ index: 0 });

const Index: React.FC<MenuProps> = (props) => {
  const { children, className, mode, style, defaultIndex, onSelect, ...rest } = props;

  const [currentActive, setActive] = useState(defaultIndex);

  const classes = classNames("viking-menu", className, {
    "menu-vertical": mode === "vertical",
  });

  const handleClick = (index: number) => {
    setActive(index);
    if (onSelect) {
      onSelect(index);
    }
  };

  const passedContext: IMenuContext = {
    index: currentActive || 0,
    onSelect: handleClick,
  };

  return (
    <ul className={classes} style={style} {...rest}>
      <MenuContext.Provider value={passedContext}>{children}</MenuContext.Provider>
    </ul>
  );
};

Index.defaultProps = {
  defaultIndex: 0,
  mode: "horizontal",
};

export default Index;
