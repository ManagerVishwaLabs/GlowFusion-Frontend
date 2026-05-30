

import * as React from "react";
import styles from "./ButtonGroup.module.css";

type ButtonGroupProps = React.ComponentProps<"div"> & {
  orientation?: "horizontal" | "vertical";
};

function ButtonGroup({
  className,
  orientation = "horizontal",
  ...props
}: ButtonGroupProps) {
  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      className={`${styles.buttonGroup} ${styles[orientation]} ${className || ""}`}
      {...props}
    />
  );
}

interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  asChild?: boolean;
}

function ButtonGroupText({
  className,
  asChild = false,
  children,
  ...props
}: SlotProps) {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      className: `${styles.buttonGroupText} ${className || ""} ${(children as React.ReactElement<any>).props.className || ""}`.trim(),
      ...props,
    });
  }

  return (
    <div
      className={`${styles.buttonGroupText} ${className || ""}`}
      {...props}
    >
      {children}
    </div>
  );
}

function ButtonGroupSeparator({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<"div"> & {
  orientation?: "horizontal" | "vertical";
}) {
  return (
    <div
      data-slot="button-group-separator"
      data-orientation={orientation}
      role="separator"
      className={`${styles.buttonGroupSeparator} ${styles[`separator${orientation.charAt(0).toUpperCase() + orientation.slice(1)}`]} ${className || ""}`}
      {...props}
    />
  );
}

export { ButtonGroup, ButtonGroupSeparator, ButtonGroupText };
