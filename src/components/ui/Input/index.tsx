import { type ComponentProps } from "react";
import styles from "./Input.module.css";

export interface InputProps extends ComponentProps<"input"> {
  error?: boolean;
}

function Input({ className, type, error, ...props }: InputProps) {
  const combinedClassName = [styles.input, error && styles.error, className]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      {" "}
      <input
        type={type}
        data-slot="input"
        className={combinedClassName}
        {...props}
      />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </>
  );
}

export default Input;
