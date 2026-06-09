import { type ComponentProps } from "react";

import { combineClasses } from "../../../utils/helpers";
import styles from "./Button.module.css";

type ButtonVariant =
  | "primary"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";

type ButtonSize = "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg";

interface ButtonProps extends ComponentProps<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  type?: "button" | "submit" | "reset";
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
}

const Button = ({
  className,
  variant = "primary",
  size = "default",
  type = "button",
  children,
  disabled,
  loading,
  onClick,
  ...props
}: ButtonProps) => {
  const variantClass = styles[`variant_${variant}`] || styles.variant_default;
  const sizeClass = styles[`size_${size}`] || styles.size_default;

  return (
    <button
      data-slot="button"
      type={type}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      onClick={onClick}
      className={combineClasses(
        styles.button,
        variantClass,
        sizeClass,
        className,
      )}
      {...props}
    >
      {loading && <span className={styles.loading} />}
      {children}
    </button>
  );
};

export default Button;
