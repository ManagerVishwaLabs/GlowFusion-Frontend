import {
  type ChangeEvent,
  type ComponentProps,
  type FocusEvent,
  type InputHTMLAttributes,
  useState,
} from "react";

import { combineClasses } from "../../../utils/helpers";
import { EyeIcon } from "../../icons";
import styles from "./Input.module.css";

type InputType =
  | "text"
  | "email"
  | "password"
  | "search"
  | "tel"
  | "url"
  | "hidden"
  | "number"
  | "range"
  | "checkbox"
  | "radio"
  | "date"
  | "datetime-local"
  | "month"
  | "week"
  | "time"
  | "color"
  | "file";

type InputValue<T extends InputType> = T extends "checkbox"
  ? boolean
  : T extends "number" | "range"
    ? number
    : T extends "file"
      ? FileList | null
      : string;

interface InputProps<T extends InputType = "text"> extends Omit<
  ComponentProps<"input">,
  "type" | "onChange" | "onBlur" | "autoComplete" | "value"
> {
  type?: T;
  error?: string;
  autoComplete?: boolean;
  label?: string;
  placeholder?: string;
  helpText?: string;
  disabled?: boolean;
  loading?: boolean;
  readOnly?: boolean;
  value: InputHTMLAttributes<HTMLInputElement>["value"];
  hidden?: boolean;
  onChange: (
    value: InputValue<T>,
    event: ChangeEvent<HTMLInputElement>,
  ) => void;

  onBlur?: (value: InputValue<T>, event: FocusEvent<HTMLInputElement>) => void;
}

const Input = <T extends InputType = "text">({
  autoComplete = true,
  className,
  disabled,
  error,
  helpText,
  hidden,
  label,
  loading,
  onBlur,
  onChange,
  placeholder,
  readOnly,
  type = "text" as T,
  value,
  ...props
}: InputProps<T>) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const getValue = (
    event: ChangeEvent<HTMLInputElement> | FocusEvent<HTMLInputElement>,
  ): InputValue<T> => {
    const target = event.target;

    switch (type) {
      case "checkbox":
        return target.checked as InputValue<T>;

      case "number":
      case "range":
        return (
          target.value === "" ? (NaN as number) : Number(target.value)
        ) as InputValue<T>;

      case "file":
        return target.files as InputValue<T>;

      case "radio":
        return target.value as InputValue<T>;

      default:
        return target.value as InputValue<T>;
    }
  };

  return (
    <div className={styles.inputContainer}>
      <div className={styles.inputWrapper}>
        {label && (
          <label
            className={styles.label}
            data-disabled={disabled}
            htmlFor={props.id}
          >
            {label}
          </label>
        )}
        <input
          {...props}
          aria-describedby={helpText ? `${helpText}-help` : undefined}
          aria-disabled={disabled || loading || readOnly}
          aria-invalid={!!error}
          aria-label={label}
          aria-readonly={readOnly}
          autoComplete={autoComplete ? "on" : "off"}
          className={combineClasses(
            styles.input,
            className,
            error && styles.inputError,
            hidden ? styles.inputHidden : "",
          )}
          data-slot="input"
          disabled={disabled || loading || readOnly}
          hidden={hidden}
          onBlur={(event) => onBlur?.(getValue(event), event)}
          onChange={(event) => onChange?.(getValue(event), event)}
          placeholder={placeholder}
          readOnly={readOnly}
          type={type === "password" && showPassword ? "text" : type}
          value={value}
        />

        {type === "password" && !loading && value && (
          <button
            className={styles.eyeButton}
            onClick={() => setShowPassword(!showPassword)}
            type="button"
          >
            <EyeIcon showPassword={showPassword} size={18} />
          </button>
        )}
        {loading && <span className={styles.loading} />}
      </div>
      {helpText && (
        <span className={styles.helpText} id={`${helpText}-help`}>
          {helpText}
        </span>
      )}
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};

export default Input;
