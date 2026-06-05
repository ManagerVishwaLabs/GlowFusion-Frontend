

import * as React from "react";
import styles from "./Separator.module.css";

export interface SeparatorProps extends React.ComponentProps<"div"> {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
}

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: SeparatorProps) {
  const combinedClassName = [
    styles.separator,
    orientation === "vertical" ? styles.vertical : styles.horizontal,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      data-slot="separator"
      role={decorative ? "none" : "separator"}
      aria-orientation={decorative ? undefined : orientation}
      className={combinedClassName}
      {...props}
    />
  );
}

export { Separator };
