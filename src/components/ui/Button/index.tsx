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
  children,
  className,
  disabled,
  loading,
  onClick,
  size = "default",
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) => {
  const variantClasses = {
    destructive: styles.variant_destructive,
    ghost: styles.variant_ghost,
    link: styles.variant_link,
    outline: styles.variant_outline,
    primary: styles.variant_primary,
    secondary: styles.variant_secondary,
  };

  const sizeClasses = {
    default: styles.size_default,
    icon: styles.size_icon,
    "icon-lg": styles["size_icon-lg"],
    "icon-sm": styles["size_icon-sm"],
    lg: styles.size_lg,
    sm: styles.size_sm,
  };

  const variantClass = variantClasses[variant];
  const sizeClass = sizeClasses[size];
  return (
    <button
      aria-disabled={disabled || loading}
      className={combineClasses(
        styles.button,
        variantClass,
        sizeClass,
        className,
      )}
      data-slot="button"
      disabled={disabled || loading}
      onClick={onClick}
      type={type}
      {...props}
    >
      {loading && <span className={styles.loading} />}
      {children}
    </button>
  );
};

export default Button;
