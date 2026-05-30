

import * as React from "react";
import styles from "./Spinner.module.css";

export type SpinnerSize = "sm" | "default" | "lg";

export interface SpinnerProps extends React.ComponentProps<"div"> {
  size?: SpinnerSize;
}

function Spinner({ className, size = "default", ...props }: SpinnerProps) {
  const sizeClass = styles[`size_${size}`] || styles.size_default;

  const combinedClassName = [styles.spinner, sizeClass, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div data-slot="spinner" className={combinedClassName} {...props}>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
    </div>
  );
}

export { Spinner };
