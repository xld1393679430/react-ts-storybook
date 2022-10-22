import React, { useContext, useState } from "react";
import classNames from "classnames";
import { MenuContext } from "../index";
import { MenuItemProps } from "../MenuItem";

export interface BaseSubMenuProps {
  index?: string;
  title: string;
  className?: string;
}

export type SubMenuProps = BaseSubMenuProps & React.HTMLAttributes<HTMLElement>;

const Index: React.FC<SubMenuProps> = ({ index, title, className, children, ...rest }) => {
  const context = useContext(MenuContext);
  const openedSubMenus = context.defaultOpenSubMenus as Array<string>;
  const isOpen = index && context.mode === "vertical" ? openedSubMenus.includes(index) : false;
  const [menuOpen, setMenuOpen] = useState(isOpen);
  const classes = classNames("menu-item submenu-item", className, {
    "is-active": context.index?.startsWith(index || ""),
  });

  let timer: any;
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    timer && clearTimeout(timer);
    e.preventDefault();
    timer = setTimeout(() => {
      setMenuOpen(toggle);
    }, 300);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // 点击的是SubMenu的MenuItem时不需要关闭
    if (index?.indexOf("-") !== -1) {
      setMenuOpen(!menuOpen);
    }

    if (context.onSelect && typeof index === "string") {
      context.onSelect(index);
    }
  };

  const clickEvents = {
    onClick: handleClick,
  };

  const hoverEvents =
    context.mode === "vertical"
      ? {}
      : {
          onMouseEnter: (e: React.MouseEvent) => handleMouse(e, true),
          onMouseLeave: (e: React.MouseEvent) => handleMouse(e, false),
        };

  const renderChildren = () => {
    const subMenuClasses = classNames("viking-submenu", {
      "menu-opened": menuOpen,
    });
    const childrenComponent = React.Children.map(children, (child, idx) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;
      if (displayName === "MenuItem") {
        return React.cloneElement(childElement, {
          index: `${index}-${idx}`,
        });
      } else {
        console.error("[SubMenu] Warning: Menu has a child which is not a MenuItem");
      }
    });
    return <ul className={subMenuClasses}>{childrenComponent}</ul>;
  };

  return (
    <li key={index} className={classes} {...hoverEvents} {...rest}>
      <div className="submenu-title" {...clickEvents}>
        {title}
      </div>
      {renderChildren()}
    </li>
  );
};

Index.displayName = "SubMenu";

export default Index;
