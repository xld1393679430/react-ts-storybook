import React, { createContext, memo, useState } from "react";
import classNames from "classnames";
import { MenuItemProps } from "./MenuItem";

type MenuMode = "horizontal" | "vertical";
type SelectCallback = (selectedIndex: string) => void;

export interface BaseMenuProps {
  defaultIndex?: string;
  className?: string;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[];
  style?: React.CSSProperties;
  onSelect?: SelectCallback;
}

export type MenuProps = BaseMenuProps & React.HTMLAttributes<HTMLElement>;

interface IMenuContext {
  index: string;
  onSelect?: SelectCallback;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[];
}

export const MenuContext = createContext<IMenuContext>({ index: "0" });

const Index: React.FC<MenuProps> = memo((props) => {
  const { children, className, mode, defaultOpenSubMenus, style, defaultIndex, onSelect, ...rest } = props;

  const [currentActive, setActive] = useState(defaultIndex);

  const classes = classNames("viking-menu", className, {
    "menu-vertical": mode === "vertical",
    "menu-horizontal": mode !== "vertical",
  });

  const handleClick = (index: string) => {
    setActive(index);
    if (onSelect) {
      onSelect(index);
    }
  };

  const passedContext: IMenuContext = {
    index: currentActive || "0",
    mode,
    defaultOpenSubMenus,
    onSelect: handleClick,
  };

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;
      if (displayName === "MenuItem" || displayName === "SubMenu") {
        return React.cloneElement(childElement, {
          index: index.toString(),
        });
      } else {
        console.error("[Menu] Warning: Menu has a child which is not a MenuItem");
      }
    });
  };

  return (
    <ul className={classes} style={style} data-menu-mode={mode} {...rest}>
      <MenuContext.Provider value={passedContext}>{renderChildren()}</MenuContext.Provider>
    </ul>
  );
});

Index.displayName = "Menu";
Index.defaultProps = {
  defaultIndex: "0",
  mode: "horizontal",
  defaultOpenSubMenus: [],
};

export default Index;
