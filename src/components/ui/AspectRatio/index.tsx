

import * as React from "react";
import styles from "./AspectRatio.module.css";

interface AspectRatioProps extends React.ComponentProps<"div"> {
  ratio?: number;
}

function AspectRatio({
  ratio = 1,
  className,
  style,
  children,
  ...props
}: AspectRatioProps) {
  return (
    <div
      data-slot="aspect-ratio"
      className={`${styles.aspectRatio} ${className || ""}`}
      style={{
        ...style,
        paddingBottom: `${100 / ratio}%`,
      }}
      {...props}
    >
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}

export { AspectRatio };
