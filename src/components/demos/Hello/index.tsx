import { FC } from "react";

interface IHelloProps {
  message: string;
}

const Hello: FC<IHelloProps> = (props) => {
  return (
    <div>
      <p>{props.message}</p>
    </div>
  );
};

export default Hello;
