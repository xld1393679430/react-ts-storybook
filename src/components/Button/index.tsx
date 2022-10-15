import { FC } from "react";
import classNames from "classnames";

export enum ButtonSize {
  large = "lg",
  small = "sm",
}

export enum ButtonType {
  primary = "primary",
  danger = "danger",
  link = "link",
  default = "default",
}

interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  size?:  ButtonSize;
  btnType?: ButtonType;
  href?: string;
  children: React.ReactNode;
}

const Index: FC<BaseButtonProps> = ({ children, className, disabled, size, btnType, href }) => {

  const classes = classNames("btn", {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === ButtonType.link && disabled,
  });

  if (btnType === ButtonType.link && href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }
  return (
    <button className={classes} disabled={disabled}>
      {children}
    </button>
  );
};

Index.defaultProps = {
  disabled: false,
  btnType: ButtonType.default,
};

export default Index;
