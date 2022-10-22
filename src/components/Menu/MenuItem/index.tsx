import React, { useContext } from "react";
import classNames from "classnames";
import { MenuContext } from "..";

export interface BaseMenuItemProps {
  index: number;
  disabled?: boolean;
  className?: string;
  style?: string;
}

type MenuItemProps = BaseMenuItemProps & React.HTMLAttributes<HTMLElement>;

const Index: React.FC<MenuItemProps> = (props) => {
  const { children, index, disabled, className, style, ...rest } = props;
  const context = useContext(MenuContext);
  const classes = classNames("menu-item", className, {
    "is-disabled": disabled,
    "is-active": context.index === index,
  });

  const handleClick = () => {
    if (context.onSelect && !disabled) {
      context.onSelect(index);
    }
  };

  return (
    <li className={classes} style={style} onClick={handleClick} {...rest}>
      {children}
    </li>
  );
};

Index.defaultProps = {};

export default Index;
