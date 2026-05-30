

import * as React from "react";
import styles from "./Progress.module.css";

export interface ProgressProps extends React.ComponentProps<"div"> {
  value?: number;
  max?: number;
}

function Progress({ className, value = 0, max = 100, ...props }: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  const combinedClassName = [styles.progress, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      data-slot="progress"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
      className={combinedClassName}
      {...props}
    >
      <div
        data-slot="progress-indicator"
        className={styles.indicator}
        style={{ transform: `translateX(-${100 - percentage}%)` }}
      />
    </div>
  );
}

export { Progress };
