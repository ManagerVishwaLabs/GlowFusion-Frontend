

import * as React from "react";
import styles from "./InputGroup.module.css";

function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={`${styles.inputGroup} ${className || ""}`}
      {...props}
    />
  );
}

type InputGroupAddonAlign = "inline-start" | "inline-end" | "block-start" | "block-end";

function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}: React.ComponentProps<"div"> & { align?: InputGroupAddonAlign }) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={`${styles.addon} ${styles[`align${align.split("-").map(s => s.charAt(0).toUpperCase() + s.slice(1)).join("")}`]} ${className || ""}`}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) {
          return;
        }
        e.currentTarget.parentElement?.querySelector("input")?.focus();
      }}
      {...props}
    />
  );
}

type InputGroupButtonSize = "xs" | "sm" | "icon-xs" | "icon-sm";

function InputGroupButton({
  className,
  type = "button",
  size = "xs",
  ...props
}: React.ComponentProps<"button"> & {
  size?: InputGroupButtonSize;
}) {
  return (
    <button
      type={type}
      data-size={size}
      className={`${styles.button} ${styles[`button${size.split("-").map(s => s.charAt(0).toUpperCase() + s.slice(1)).join("")}`]} ${className || ""}`}
      {...props}
    />
  );
}

function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span className={`${styles.text} ${className || ""}`} {...props} />
  );
}

function InputGroupInput({
  className,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      data-slot="input-group-control"
      className={`${styles.input} ${className || ""}`}
      {...props}
    />
  );
}

function InputGroupTextarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="input-group-control"
      className={`${styles.textarea} ${className || ""}`}
      {...props}
    />
  );
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
};
