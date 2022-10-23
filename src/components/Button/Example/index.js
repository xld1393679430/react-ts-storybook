import Button from "../index";

const Index = () => {
  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <Button className="aaa" autoFocus onClick={() => alert("1111")}>
        default
      </Button>
      {/* <Button btnType={'primary'}>
          primary 2
        </Button> */}

      <Button btnType="primary" size="lg">
        primary 2
      </Button>
      <Button btnType="primary" disabled>
        primary 2
      </Button>

      <Button btnType="link" size="lg" href="https://www.baidu.com" disabled>
        link
      </Button>

      <Button btnType="link" href="https://www.baidu.com" disabled>
        link
      </Button>
    </div>
  );
};

export default Index;
