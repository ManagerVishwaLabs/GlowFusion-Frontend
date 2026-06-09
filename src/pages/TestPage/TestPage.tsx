import { Button, Input } from "../../components/ui";

const Page = ({ title }: { title: string }) => (
  <>
    <div style={{ padding: 24, width: "400px" }}>
      {title}

      <Input
        error="Invalid email"
        helpText="we will never see your mail"
        label="Email"
        loading
        placeholder="Enter your email"
      />

      <Button loading onClick={() => alert("Hello")}>
        Click me
      </Button>
    </div>
  </>
);

export default Page;
