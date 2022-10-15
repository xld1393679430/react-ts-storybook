import ContextDemo from "./ContextDemo";
import Hello from "./Hello";

const Index = () => {
  return (
    <div>
      <h2>Demos</h2>
      <Hello message="hello world" />
      <ContextDemo />
    </div>
  );
};

export default Index;
