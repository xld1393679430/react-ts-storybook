import React, { memo, useCallback } from "react";
import { CSSTransition } from "react-transition-group";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";

type AnimationName = "zoom-in-top" | "zoom-in-left" | "zoom-in-right" | "zoom-in-bottom";

type TransitionProps = CSSTransitionProps & {
  animation?: AnimationName;
  wrapper?: boolean;
};

const Index: React.FC<TransitionProps> = memo((props) => {
  const { children, classNames, animation, wrapper, ...rest } = props;

  const renderChildrend = useCallback(() => {
    // if (wrapper) {
    //   return <div>{children as any}</div>;
    // }

    return children;
  }, [children]);

  return (
    <CSSTransition classNames={classNames ? classNames : animation} {...rest}>
      {renderChildrend()}
    </CSSTransition>
  );
});

Index.displayName = "Transition";
Index.defaultProps = {
  unmountOnExit: true,
  appear: true,
  wrapper: false,
};

export default Index;
