import { type ComponentProps,useState } from "react";

import CheckIcon from "../../icons/CheckIcon";
import styles from "./Checkbox.module.css";

export interface CheckboxProps extends Omit<
  ComponentProps<"button">,
  "onChange"
> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

function Checkbox({
  className,
  checked: controlledChecked,
  defaultChecked = false,
  onCheckedChange,
  disabled,
  ...props
}: CheckboxProps) {
  const [uncontrolledChecked, setUncontrolledChecked] =
    useState(defaultChecked);
  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : uncontrolledChecked;

  const handleClick = () => {
    if (disabled) return;

    const newChecked = !checked;
    if (!isControlled) {
      setUncontrolledChecked(newChecked);
    }
    onCheckedChange?.(newChecked);
  };

  const combinedClassName = [
    styles.checkbox,
    checked ? styles.checked : "",
    disabled ? styles.disabled : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      data-state={checked ? "checked" : "unchecked"}
      data-slot="checkbox"
      disabled={disabled}
      className={combinedClassName}
      onClick={handleClick}
      {...props}
    >
      {checked && (
        <span data-slot="checkbox-indicator" className={styles.indicator}>
          <CheckIcon className={styles.icon} />
        </span>
      )}
    </button>
  );
}

export default Checkbox;
