

import * as React from "react";
import styles from "./Toggle.module.css";

interface ToggleProps extends Omit<React.ComponentProps<"button">, "onChange"> {
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
}

function Toggle({
  className,
  variant = "default",
  size = "default",
  pressed: controlledPressed,
  defaultPressed = false,
  onPressedChange,
  disabled,
  children,
  ...props
}: ToggleProps) {
  const [uncontrolledPressed, setUncontrolledPressed] = React.useState(defaultPressed);
  const isControlled = controlledPressed !== undefined;
  const pressed = isControlled ? controlledPressed : uncontrolledPressed;

  const handleClick = () => {
    if (disabled) return;
    
    const newPressed = !pressed;
    if (!isControlled) {
      setUncontrolledPressed(newPressed);
    }
    onPressedChange?.(newPressed);
  };

  const sizeClass = size === "sm" ? styles.sizeSm : size === "lg" ? styles.sizeLg : styles.sizeDefault;

  return (
    <button
      type="button"
      aria-pressed={pressed}
      data-state={pressed ? "on" : "off"}
      data-slot="toggle"
      data-variant={variant}
      data-size={size}
      disabled={disabled}
      className={`${styles.toggle} ${styles[variant]} ${sizeClass} ${pressed ? styles.pressed : ""} ${className || ""}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}

export { Toggle };
export type { ToggleProps };
