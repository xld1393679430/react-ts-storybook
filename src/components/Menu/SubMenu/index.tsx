import React, { memo, useCallback, useContext, useMemo, useRef, useState } from "react";
import classNames from "classnames";
import { CSSTransition } from "react-transition-group";
import { MenuContext } from "../index";
import { MenuItemProps } from "../MenuItem";
import Icon from "../../Icon";
import Transition from '../../Transition'

export interface BaseSubMenuProps {
  index?: string;
  title: string;
  className?: string;
}

export type SubMenuProps = BaseSubMenuProps & React.HTMLAttributes<HTMLElement>;

const Index: React.FC<SubMenuProps> = memo(({ index, title, className, children, ...rest }) => {
  const context = useContext(MenuContext);
  const openedSubMenus = context.defaultOpenSubMenus as Array<string>;
  const isOpen = index && context.mode === "vertical" ? openedSubMenus.includes(index) : false;
  const [menuOpen, setMenuOpen] = useState(isOpen);
  const classes = useMemo(() => {
    return classNames("menu-item submenu-item", className, {
      "is-active": context.index?.startsWith(index || ""),
      "is-opened": menuOpen,
      "is-vertical": context.mode === "vertical",
    });
  }, [className, context.index, context.mode, index, menuOpen]);

  let timer: any = useRef();
  const handleMouse = useCallback((e: React.MouseEvent, toggle: boolean) => {
    timer.current && clearTimeout(timer.current);
    e.preventDefault();
    timer.current = setTimeout(() => {
      setMenuOpen(toggle);
    }, 300);
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setMenuOpen(!menuOpen);

      if (context.onSelect && typeof index === "string") {
        context.onSelect(index);
      }
    },
    [context, index, menuOpen]
  );

  const clickEvents = useMemo(() => {
    return {
      onClick: handleClick,
    };
  }, [handleClick]);

  const hoverEvents = useMemo(() => {
    return context.mode === "vertical"
      ? {}
      : {
          onMouseEnter: (e: React.MouseEvent) => handleMouse(e, true),
          onMouseLeave: (e: React.MouseEvent) => handleMouse(e, false),
        };
  }, [context.mode, handleMouse]);

  const renderChildren = useCallback(() => {
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

    // appear: 使组件第一次显示也出现动画
    return (
      <Transition in={menuOpen} timeout={300} animation="zoom-in-top" >
        <ul className={subMenuClasses}>{childrenComponent}</ul>
      </Transition>
    );
  }, [children, index, menuOpen]);

  return (
    <li key={index} className={classes} {...hoverEvents} {...rest}>
      <div className="submenu-title" {...clickEvents}>
        {title}
        <Icon icon="angle-down" className="arrow-icon" />
      </div>
      {renderChildren()}
    </li>
  );
});

Index.displayName = "SubMenu";

export default Index;
