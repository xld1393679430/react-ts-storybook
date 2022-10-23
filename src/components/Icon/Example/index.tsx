import Icon from "../index";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashCan, faCoffee, faCheckSquare, faSackDollar } from "@fortawesome/free-solid-svg-icons";
// import { fas } from "@fortawesome/free-solid-svg-icons"; // 引入所以icon
library.add(faTrashCan, faCoffee, faCheckSquare);
const Index = () => {
  return (
    <>
      <Icon icon={faTrashCan} theme="danger" data-icon="icon-trashCan" />

      {/* 通过library使用字符串方式引入icon(去掉fa的驼峰命名法) */}
      <Icon icon="coffee" theme="dark" size={"2x"} data-icon="icon-coffee" />

      <Icon icon="check-square" theme="success" size={"3x"} data-icon="icon-check-square" />

      <Icon icon={faSackDollar} theme="primary" size={"5x"} />
    </>
  );
};

export default Index;
