import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withInfo } from "@storybook/addon-info";
import Button from "./index";

import "../../styles/index.scss";

const defaultButton = () => <Button onClick={action("click")}>default button</Button>;

const buttonWithSize = () => (
  <>
    <Button size="lg">large button</Button>
    <Button size="sm">small button</Button>
  </>
);

const buttonWithType = () => (
  <>
    <Button btnType="primary">primary button</Button>
    <Button btnType="danger">danger button</Button>
    <Button btnType="link" href="test.com">
      link button
    </Button>
  </>
);

storiesOf("Button Component", module)
.addDecorator(withInfo)
.addParameters({
  info: {
    text: "this is a nice component",
    inline: true,
  }
})
.add("默认Button", defaultButton).add("不同尺寸Button", buttonWithSize).add("不同类型Button", buttonWithType);
