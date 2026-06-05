import * as React from "react";
import styles from "./Alert.module.css";

interface AlertProps extends React.ComponentProps<"div"> {
  variant?: "default" | "destructive";
}

function Alert({ className, variant = "default", ...props }: AlertProps) {
  return (
    <div
      data-slot="alert"
      data-variant={variant}
      role="alert"
      className={`${styles.alert} ${styles[variant]} ${className || ""}`}
      {...props}
    />
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={`${styles.title} ${className || ""}`}
      {...props}
    />
  );
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={`${styles.description} ${className || ""}`}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription };
