import React from "react";
import { CSSTransition } from "react-transition-group";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";

type AnimationName = "zoom-in-top" | "zoom-in-left" | "zoom-in-right" | "zoom-in-bottom";

type TransitionProps = CSSTransitionProps & {
  animation?: AnimationName;
};

const Index: React.FC<TransitionProps> = (props) => {
  const { children, classNames, animation, ...rest } = props;

  return (
    <CSSTransition classNames={classNames ? classNames : animation} {...rest}>
      {children}
    </CSSTransition>
  );
};

Index.displayName = "Transition";
Index.defaultProps = {
  unmountOnExit: true,
  appear: true,
};

export default Index;
