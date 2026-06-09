import { type ChangeEvent, type ComponentProps } from "react";
import styles from "./Input.module.css";

export interface InputProps extends Omit<ComponentProps<"input">, "onChange"> {
  label?: string;
  error?: string | boolean;
  onChange: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
}

function Input({
  className,
  type,
  label,
  error,
  onChange,
  ...props
}: InputProps) {
  const combinedClassName = [styles.input, error && styles.error, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}

      <input
        type={type}
        data-slot="input"
        className={combinedClassName}
        onChange={(e) => {
          onChange(e.target.value, e);
        }}
        {...props}
      />

      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
}

export default Input;
