import React from "react";
import classNames from "classnames";
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas);

export type ThemeProps = "primary" | "secondary" | "success" | "info" | "wranning" | "danger" | "light" | "dark";

export interface IconProps extends FontAwesomeIconProps {
  theme?: ThemeProps;
}

const Index: React.FC<IconProps> = (props) => {
  const { className, theme, ...rest } = props;
  const classes = classNames("viking-icon", className, {
    [`icon-${theme}`]: theme,
  });
  return <FontAwesomeIcon className={classes} {...rest} />;
};

Index.displayName = "Icon";

export default Index;
