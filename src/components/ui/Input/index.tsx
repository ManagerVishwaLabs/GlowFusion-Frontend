import type { ChangeEvent, ComponentProps, FocusEvent } from "react";

import { combineClasses } from "../../../utils/helpers";
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
  "type" | "onChange" | "onBlur" | "autoComplete"
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
  onChange?: (
    value: InputValue<T>,
    event: ChangeEvent<HTMLInputElement>,
  ) => void;

  onBlur?: (value: InputValue<T>, event: FocusEvent<HTMLInputElement>) => void;
}

const Input = <T extends InputType = "text">({
  className,
  type = "text" as T,
  onChange,
  label,
  placeholder,
  helpText,
  onBlur,
  autoComplete = true,
  error,
  disabled,
  loading,
  readOnly,
  ...props
}: InputProps<T>) => {
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
            htmlFor={props.id}
            className={styles.label}
            data-disabled={disabled}
          >
            {label}
          </label>
        )}
        <input
          {...props}
          placeholder={placeholder}
          aria-label={label}
          aria-describedby={helpText ? `${helpText}-help` : undefined}
          type={type}
          data-slot="input"
          className={combineClasses(
            styles.input,
            className,
            error && styles.inputError,
          )}
          disabled={disabled || loading || readOnly}
          aria-disabled={disabled || loading || readOnly}
          aria-readonly={readOnly}
          readOnly={readOnly}
          aria-invalid={!!error}
          autoComplete={autoComplete ? "on" : "off"}
          onChange={(event) => onChange?.(getValue(event), event)}
          onBlur={(event) => onBlur?.(getValue(event), event)}
        />
        {loading && <span className={styles.loading} />}
      </div>
      {helpText && (
        <span id={`${helpText}-help`} className={styles.helpText}>
          {helpText}
        </span>
      )}
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};

export default Input;
