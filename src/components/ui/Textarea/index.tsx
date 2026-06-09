import { type ChangeEvent, type ComponentProps } from "react";

import { combineClasses } from "../../../utils/helpers";
import styles from "./Textarea.module.css";

export interface TextareaProps extends Omit<
  ComponentProps<"textarea">,
  "onChange"
> {
  error?: boolean;
  label?: string;
  helpText?: string;
  disabled?: boolean;
  placeholder?: string;
  readOnly?: boolean;
  rows?: number;
  cols?: number;
  hidden?: boolean;
  loading?: boolean;
  onChange: (value: string, event: ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea = ({
  className,
  cols,
  disabled,
  error,
  helpText,
  hidden,
  label,
  loading,
  onChange,
  placeholder,
  readOnly,
  rows,
  ...props
}: TextareaProps) => {
  return (
    <div className={styles.wrapper}>
      {label && (
        <label
          className={styles.label}
          data-disabled={disabled}
          htmlFor={props.id}
        >
          {label}
        </label>
      )}
      <textarea
        {...props}
        aria-describedby={helpText ? `${helpText}-help` : undefined}
        aria-disabled={disabled || loading || readOnly}
        aria-invalid={!!error}
        aria-label={label}
        aria-readonly={readOnly}
        className={combineClasses(
          styles.textarea,
          error ? styles.textareaError : "",
          className,
        )}
        cols={cols}
        data-slot="textarea"
        disabled={disabled || loading || readOnly}
        hidden={hidden}
        onChange={(e) => onChange(e.target.value, e)}
        placeholder={placeholder}
        readOnly={readOnly}
        rows={rows}
      />
      {helpText && (
        <span className={styles.helpText} id={`${helpText}-help`}>
          {helpText}
        </span>
      )}
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};

export default Textarea;
