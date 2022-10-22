import Menu from "../index";
import MenuItem from "../MenuItem/index";

const Index = () => {
  return (
    <>
      <Menu
        defaultIndex={1}
        data-desc="Menu"
        onSelect={(index) => {
          // alert(`Menu ${index}`);
        }}
      >
        <MenuItem index={0} data-desc="MenuItem">
          Menu1
        </MenuItem>
        <MenuItem index={1}>Menu2</MenuItem>
        <MenuItem index={2} disabled>
          Menu3
        </MenuItem>
        <MenuItem index={3}>Menu4</MenuItem>
      </Menu>

      <Menu defaultIndex={1} data-desc="Menu" mode="vertical">
        <MenuItem index={0} data-desc="MenuItem">
          Menu1
        </MenuItem>
        <MenuItem index={1}>Menu2</MenuItem>
        <MenuItem index={2} disabled>
          Menu3
        </MenuItem>
        <MenuItem index={3}>Menu4</MenuItem>
      </Menu>
    </>
  );
};

export default Index;
