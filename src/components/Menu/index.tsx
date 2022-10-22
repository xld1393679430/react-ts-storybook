import React, { createContext, useState } from "react";
import classNames from "classnames";
import { MenuItemProps } from "./MenuItem";

type MenuMode = "horizontal" | "vertical";
type SelectCallback = (selectedIndex: number) => void;

export interface BaseMenuProps {
  defaultIndex?: number;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectCallback;
}

export type MenuProps = BaseMenuProps & React.HTMLAttributes<HTMLElement>;

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

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;
      if (displayName === "MenuItem") {
        return React.cloneElement(childElement, {
          index,
        });
      } else {
        console.error("Warning: Menu has a child which is not a MenuItem");
      }
    });
  };

  return (
    <ul className={classes} style={style} {...rest}>
      <MenuContext.Provider value={passedContext}>{renderChildren()}</MenuContext.Provider>
    </ul>
  );
};

Index.displayName = "Menu";
Index.defaultProps = {
  defaultIndex: 0,
  mode: "horizontal",
};

export default Index;
