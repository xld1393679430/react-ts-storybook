/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { render, RenderResult, cleanup, waitFor } from "@testing-library/react";

import Menu, { MenuProps } from "./index";
import MenuItem from "./MenuItem";
import SubMenu from "./SubMenu";
import { fireEvent } from "@testing-library/react";

jest.mock('../Icon', () => {
  return () => {
    return <i className="fa" />
  }
})
jest.mock('react-transition-group', () => {
  return {
    CSSTransition: (props: any) => {
      return props.children
    }
  }
})

const testProps: MenuProps = {
  defaultIndex: "0",
  onSelect: jest.fn(),
  className: "test-menu",
};

const testVerticalProps: MenuProps = {
  defaultIndex: "2",
  mode: "vertical",
};

const createStyleFile = () => {
  const cssFile: string = `
    .viking-submenu {
      display: none
    }
    .viking-submenu.menu-opened {
      display: block
    }
  `;

  const style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML = cssFile;
  return style;
};

const TestMenu = (props: MenuProps) => {
  return (
    <Menu {...props} data-testid="test-menu">
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>xyz</MenuItem>
      <SubMenu title="dropdown">
        <MenuItem>drop1</MenuItem>
      </SubMenu>
      {/* <div>这里报错：Warning: Menu has a child which is not a MenuItem </div> */}
    </Menu>
  );
};

let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement;

describe("测试Menu和MenuItem组件", function () {
  // 每次it前都会执行beforeEach
  beforeEach(() => {
    wrapper = render(<TestMenu {...testProps} />);
    wrapper.container.append(createStyleFile())
    menuElement = wrapper.getByTestId("test-menu");
    activeElement = wrapper.getByText("active");
    disabledElement = wrapper.getByText("disabled");
  });

  it("Menu和MenuItem是否能正常显示 & 显示默认属性", function () {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass("viking-menu test-menu");
    expect(menuElement.getElementsByTagName("li").length).toEqual(5);

    expect(menuElement.querySelectorAll(":scope > li").length).toEqual(4); // 选择ul下的第一级li
    expect(activeElement).toHaveClass("menu-item is-active");
    expect(disabledElement).toHaveClass("menu-item is-disabled");
  });

  it("点击是否能够改变选择状态", function () {
    const xyz = wrapper.getByText("xyz");
    fireEvent.click(xyz);

    expect(xyz).toHaveClass("is-active");
    expect(activeElement).not.toHaveClass("is-active");
    expect(testProps.onSelect).toHaveBeenCalledWith("2"); // 第二个Menuitem被点击了 参数是index=2

    // 期望被禁用的MentItem不会执行事件并且className不会被添加上is-active
    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass("is-active");
    expect(testProps.onSelect).not.toHaveBeenCalledWith("1");
  });

  it("mode=horizontal/vertical 是否能够正常渲染", function () {
    cleanup(); // 清理Dom。 每次it执行结束后会自动执行cleanup
    const view = render(<TestMenu {...testVerticalProps} />);
    const menuElement = view.getByTestId("test-menu");
    expect(menuElement).toHaveClass("menu-vertical");
  });

  it("SubMenu 鼠标悬浮显示", async function () {
    expect(wrapper.queryByText("drop1")).not.toBeVisible();
    const dropdownEle = wrapper.getByText("dropdown");
    fireEvent.mouseEnter(dropdownEle);

    // mouseEnter里有setTimeou. 需等待执行完才会将dropdown设置为open状态
    // waitFor: 会重复执行callback直到断言通过
    await waitFor(() => {
      expect(wrapper.queryByText("drop1")).toBeVisible();
    })

    fireEvent.click(wrapper.getByText("drop1"));
    expect(testProps.onSelect).toHaveBeenCalledWith("3-0")


    fireEvent.mouseLeave(dropdownEle);
    await waitFor(() => {
      expect(wrapper.queryByText("drop1")).not.toBeVisible();
    })
  });
});
