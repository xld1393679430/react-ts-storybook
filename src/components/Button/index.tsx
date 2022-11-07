import { FC } from "react";
import classNames from "classnames";

// enum ButtonSizeEnum {
//   lg = "lg",
//   sm = "sm",
//   md = "md"
// }
// export type ButtonSize = keyof typeof ButtonSizeEnum;

export type ButtonSize = "lg" | "sm"

export type ButtonType = "primary" | "danger" | "link" | "default";

interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  btnType?: ButtonType;
  href?: string;
}

//类型为 button类型包括自定义 + 原生button类型
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>;

// 类型为a标签类型包括自定义 + 原生a类型
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>;

export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

const Index: FC<ButtonProps> = ({ children, className, disabled, size, btnType, href, ...rest }) => {
  const classes = classNames("btn", className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === "link" && disabled,
  });

  if (btnType === "link" && href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <button className={classes} disabled={disabled} {...rest}>
      {children}
    </button>
  );
};

Index.displayName = "Button";
Index.defaultProps = {
  disabled: false,
  btnType: "default",
};

export default Index;
