

import * as React from "react";
import styles from "./ScrollArea.module.css";

interface ScrollAreaProps extends React.ComponentProps<"div"> {}

function ScrollArea({
  className,
  children,
  ...props
}: ScrollAreaProps) {
  return (
    <div
      data-slot="scroll-area"
      className={`${styles.root} ${className || ""}`}
      {...props}
    >
      <div
        data-slot="scroll-area-viewport"
        className={styles.viewport}
      >
        {children}
      </div>
    </div>
  );
}

interface ScrollBarProps extends React.ComponentProps<"div"> {
  orientation?: "vertical" | "horizontal";
}

function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: ScrollBarProps) {
  return (
    <div
      data-slot="scroll-area-scrollbar"
      data-orientation={orientation}
      className={`${styles.scrollbar} ${orientation === "vertical" ? styles.vertical : styles.horizontal} ${className || ""}`}
      {...props}
    >
      <div
        data-slot="scroll-area-thumb"
        className={styles.thumb}
      />
    </div>
  );
}

export { ScrollArea, ScrollBar };
