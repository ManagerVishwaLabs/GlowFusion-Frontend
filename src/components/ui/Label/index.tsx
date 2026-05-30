

import * as React from "react";
import styles from "./Label.module.css";

export interface LabelProps extends React.ComponentProps<"label"> {}

function Label({ className, ...props }: LabelProps) {
  const combinedClassName = [styles.label, className]
    .filter(Boolean)
    .join(" ");

  return (
    <label
      data-slot="label"
      className={combinedClassName}
      {...props}
    />
  );
}

export { Label };
