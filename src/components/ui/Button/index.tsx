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
  const variantClasses = {
    primary: styles.variant_primary,
    destructive: styles.variant_destructive,
    outline: styles.variant_outline,
    secondary: styles.variant_secondary,
    ghost: styles.variant_ghost,
    link: styles.variant_link,
  };

  const sizeClasses = {
    default: styles.size_default,
    sm: styles.size_sm,
    lg: styles.size_lg,
    icon: styles.size_icon,
    "icon-sm": styles["size_icon-sm"],
    "icon-lg": styles["size_icon-lg"],
  };

  const variantClass = variantClasses[variant];
  const sizeClass = sizeClasses[size];
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
