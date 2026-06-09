import { Button, Input } from "../../components/ui";

const Page = ({ title }: { title: string }) => (
  <>
    <div style={{ padding: 24, width: "400px" }}>
      {title}

      <Input
        label="Email"
        placeholder="Enter your email"
        error="Invalid email"
        loading
        helpText="we will never see your mail"
      />

      <Button onClick={() => alert("Hello")} loading>
        Click me
      </Button>
    </div>
  </>
);

export default Page;
