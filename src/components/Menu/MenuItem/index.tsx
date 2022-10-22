import React, { memo, useCallback, useContext, useMemo } from "react";
import classNames from "classnames";
import { MenuContext } from "..";

export interface BaseMenuItemProps {
  index?: string;
  disabled?: boolean;
  className?: string;
  style?: string;
}

export type MenuItemProps = BaseMenuItemProps & React.HTMLAttributes<HTMLElement>;

const Index: React.FC<MenuItemProps> = memo((props) => {
  const { children, index, disabled, className, style, ...rest } = props;
  const context = useContext(MenuContext);

  const classes = useMemo(() => {
    return classNames("menu-item", className, {
      "is-disabled": disabled,
      "is-active": context.index?.startsWith(index || ""),
    });
  }, [className, context.index, disabled, index]);

  const handleClick = useCallback(() => {
    if (context.onSelect && !disabled && typeof index === "string") {
      context.onSelect(index);
    }
  }, [context, disabled, index]);

  return (
    <li className={classes} style={style} data-menu-item-index={index} onClick={handleClick} {...rest}>
      {children}
    </li>
  );
});

Index.defaultProps = {};
Index.displayName = "MenuItem"; // chrome-devtool可以正确显示组件的名字

export default Index;
