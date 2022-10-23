/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button, { ButtonProps } from "./index";

const defaultProps = {
  onClick: jest.fn(),
};

const testProps: ButtonProps = {
  btnType: "primary",
  size: "lg",
  className: "custom-class",
};

describe("测试Button组件", function () {
  it("测试Button组件是否能渲染", function () {
    render(
      <Button data-testid="btn1" {...defaultProps}>
        Nice
      </Button>
    );

    const element = screen.getByTestId("btn1");
    // 检查Button是否存在Document上
    expect(element).toBeInTheDocument();

    // 检测是否存在Button上的Nice节点
    expect(element).toBeTruthy();

    // 检测是否存在Button上的Nice文本
    expect(element.innerHTML).toBe("Nice");

    // 检测Button组件是否以button标签显示
    expect(element.tagName).toEqual("BUTTON");

    // 检测Button组件是否有默认的class
    expect(element).toHaveClass("btn btn-default");

    // 检测Button按钮的点击事件
    fireEvent.click(element);
    expect(defaultProps.onClick).toHaveBeenCalled();
  });

  it("测试Button组件的自定义属性", function () {
    render(
      <Button data-testid="btn2" {...testProps}>
        Nice
      </Button>
    );

    const element = screen.getByTestId("btn2");

    // 检测Button按钮的btnType是否是primary
    expect(element).toHaveClass("btn-primary");

    // 检测Button按钮的size是否是ButtonSize.large
    expect(element).toHaveClass("btn-lg");

    // 检测Button按钮的是否有追加的classNames
    expect(element).toHaveClass("custom-class");
  });

  it("测试Button组件btnType=link时显示为a标签", function () {
    render(
      <Button data-testid="btn3" btnType={"link"} href="www.test.com">
        Link
      </Button>
    );

    const element = screen.getByTestId("btn3");
    expect(element).toBeInTheDocument();

    expect(element.tagName).toEqual("A");
    expect(element).toHaveClass("btn-link");
  });
});
