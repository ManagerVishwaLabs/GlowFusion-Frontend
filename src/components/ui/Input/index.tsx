import {
  type ChangeEvent,
  type ComponentProps,
  type FocusEvent,
  type InputHTMLAttributes,
  type ReactNode,
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
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  required?: boolean;
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
  leftIcon,
  loading,
  onBlur,
  onChange,
  placeholder,
  readOnly,
  required = false,
  rightIcon,
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
            htmlFor={
              props.id || props.name || label.replace(" ", "").toLowerCase()
            }
          >
            {label}
            {required && <span className={styles.required}>*</span>}
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
            leftIcon ? styles.inputOnLeftIcon : "",
            rightIcon ? styles.inputOnRightIcon : "",
          )}
          data-slot="input"
          disabled={disabled || loading || readOnly}
          hidden={hidden}
          id={props.id || props.name || label?.replace(" ", "").toLowerCase()}
          onBlur={(event) => onBlur?.(getValue(event), event)}
          onChange={(event) => onChange?.(getValue(event), event)}
          placeholder={placeholder}
          readOnly={readOnly}
          type={type === "password" && showPassword ? "text" : type}
          value={value}
        />
        {leftIcon && <div className={styles.leftIcon}>{leftIcon}</div>}
        {rightIcon && !loading && (
          <div className={styles.rightIcon}>{rightIcon}</div>
        )}
        {type === "password" && !loading && value && (
          <span
            className={styles.eyeButton}
            onClick={() => setShowPassword(!showPassword)}
          >
            <EyeIcon showPassword={showPassword} size={18} />
          </span>
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
