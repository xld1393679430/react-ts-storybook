/* eslint-disable testing-library/prefer-screen-queries */

import React from "react";
import { render, screen } from "@testing-library/react";
import Button from "./index";

describe("测试Button组件", function () {
  it("测试Button组件是否能渲染", function () {
    render(<Button data-testid="aa">Nice</Button>);

    const element = screen.getByTestId("aa");
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
  });
});
