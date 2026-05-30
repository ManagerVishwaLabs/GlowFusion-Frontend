

import * as React from "react";
import styles from "./Switch.module.css";

export interface SwitchProps extends Omit<React.ComponentProps<"button">, "onChange"> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

function Switch({
  className,
  checked: controlledChecked,
  defaultChecked = false,
  onCheckedChange,
  disabled,
  ...props
}: SwitchProps) {
  const [uncontrolledChecked, setUncontrolledChecked] = React.useState(defaultChecked);
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
    styles.switch,
    checked ? styles.checked : "",
    disabled ? styles.disabled : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      data-state={checked ? "checked" : "unchecked"}
      data-slot="switch"
      disabled={disabled}
      className={combinedClassName}
      onClick={handleClick}
      {...props}
    >
      <span
        data-slot="switch-thumb"
        className={`${styles.thumb} ${checked ? styles.thumbChecked : ""}`}
      />
    </button>
  );
}

export { Switch };
