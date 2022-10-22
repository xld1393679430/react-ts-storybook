import Button, { ButtonType, ButtonSize } from "../index";

const Index = () => {
  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <Button className="aaa" autoFocus onClick={() => alert("1111")}>
        default
      </Button>
      {/* <Button btnType={'primary'}>
          primary 2
        </Button> */}

      <Button btnType={ButtonType.primary} size={ButtonSize.large}>
        primary 2
      </Button>
      <Button btnType={ButtonType.primary} disabled>
        primary 2
      </Button>

      <Button btnType={ButtonType.link} size={ButtonSize.large} href="https://www.baidu.com" disabled>
        link
      </Button>

      <Button btnType={ButtonType.link} href="https://www.baidu.com" disabled>
        link
      </Button>
    </div>
  );
};

export default Index;
