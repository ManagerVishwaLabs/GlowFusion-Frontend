import { type ComponentProps, useState } from "react";

import { combineClasses } from "../../../utils/helpers";
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
  checked: controlledChecked,
  className,
  defaultChecked = false,
  disabled,
  onCheckedChange,
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

  return (
    <button
      aria-checked={checked}
      className={combineClasses(
        styles.checkbox,
        // checked ? styles.checked : "",
        // disabled ? styles.disabled : "",
        className,
      )}
      data-slot="checkbox"
      data-state={checked ? "checked" : "unchecked"}
      disabled={disabled}
      onClick={handleClick}
      role="checkbox"
      type="button"
      {...props}
    >
      {checked && (
        <span className={styles.indicator} data-slot="checkbox-indicator">
          <CheckIcon className={styles.icon} />
        </span>
      )}
    </button>
  );
}

export default Checkbox;
