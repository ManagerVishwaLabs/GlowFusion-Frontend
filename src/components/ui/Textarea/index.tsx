

import * as React from "react";
import styles from "./Textarea.module.css";

export interface TextareaProps extends React.ComponentProps<"textarea"> {
  error?: boolean;
}

function Textarea({ className, error, ...props }: TextareaProps) {
  const combinedClassName = [
    styles.textarea,
    error && styles.error,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <textarea data-slot="textarea" className={combinedClassName} {...props} />
  );
}

export { Textarea };
