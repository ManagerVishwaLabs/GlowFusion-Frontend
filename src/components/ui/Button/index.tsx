

import * as React from "react";
import styles from "./Button.module.css";

export type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";

export type ButtonSize = "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg";

export interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

function Button({
  className,
  variant = "default",
  size = "default",
  type = "button",
  ...props
}: ButtonProps) {
  const variantClass = styles[`variant_${variant}`] || styles.variant_default;
  const sizeClass = styles[`size_${size}`] || styles.size_default;

  const combinedClassName = [
    styles.button,
    variantClass,
    sizeClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <button data-slot="button" type={type} className={combinedClassName} {...props} />;
}

export { Button };
