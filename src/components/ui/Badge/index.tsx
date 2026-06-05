

import * as React from "react";
import styles from "./Badge.module.css";

export type BadgeVariant =
  | "default"
  | "secondary"
  | "destructive"
  | "outline";

export interface BadgeProps extends React.ComponentProps<"span"> {
  variant?: BadgeVariant;
}

function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  const variantClass = styles[`variant_${variant}`] || styles.variant_default;

  const combinedClassName = [styles.badge, variantClass, className]
    .filter(Boolean)
    .join(" ");

  return <span data-slot="badge" className={combinedClassName} {...props} />;
}

export { Badge };
