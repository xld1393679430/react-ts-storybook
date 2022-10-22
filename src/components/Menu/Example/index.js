import Menu from "../index";
import MenuItem from "../MenuItem/index";
import SubMenu from "../SubMenu/index";

const Index = () => {
  return (
    <>
      <Menu
        title="自定义title"
        defaultIndex={"1"}
        data-desc="Menu"
        onSelect={(index) => {
          // alert(`Menu ${index}`);
        }}
      >
        <MenuItem data-desc="MenuItem">Menu1</MenuItem>
        <MenuItem>Menu2</MenuItem>
        <MenuItem disabled>Menu3</MenuItem>
        <MenuItem>Menu4</MenuItem>
      </Menu>

      <Menu defaultIndex={"1"} data-desc="Menu" mode="vertical">
        <MenuItem data-desc="MenuItem">Menu1</MenuItem>
        <MenuItem>Menu2</MenuItem>
        <MenuItem disabled>Menu3</MenuItem>
        <MenuItem>Menu4</MenuItem>
        {/* 这里控制台会有报错。 */}
        {/* <div>222</div> */}
      </Menu>

      <Menu defaultIndex={"1"} data-desc="Menu">
        <MenuItem data-desc="MenuItem">Menu1</MenuItem>
        <MenuItem>Menu2</MenuItem>
        <SubMenu title="dropdown">
          <MenuItem>dropdown1</MenuItem>
          <MenuItem>dropdown2</MenuItem>
        </SubMenu>
      </Menu>

      <Menu defaultIndex={"1"} data-desc="Menu" mode="vertical" defaultOpenSubMenus={"2"}>
        <MenuItem data-desc="MenuItem">Menu1</MenuItem>
        <MenuItem>Menu2</MenuItem>
        <SubMenu title="dropdown">
          <MenuItem>dropdown1</MenuItem>
          <MenuItem>dropdown2</MenuItem>
        </SubMenu>
      </Menu>
    </>
  );
};

export default Index;
