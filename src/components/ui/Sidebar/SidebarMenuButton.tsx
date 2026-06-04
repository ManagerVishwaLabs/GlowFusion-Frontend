import * as React from "react";
import styles from "./Sidebar.module.css";

import { useSidebar } from "./sidebar-hook";
import type { ChildProps } from "./types";

export interface SidebarMenuButtonProps extends React.ComponentProps<"button"> {
  asChild?: boolean;
  isActive?: boolean;
  tooltip?: string;
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
}

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  SidebarMenuButtonProps
>(
  (
    {
      asChild = false,
      isActive = false,
      variant = "default",
      size = "default",
      className,
      children,
      ...props
    },
    ref,
  ) => {
    useSidebar();

    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<ChildProps>;

      return React.cloneElement(child, {
        ref,
        "data-active": isActive,
        "data-size": size,
        "data-variant": variant,
        className: `
              ${styles.menuButton}
              ${isActive ? styles.menuButtonActive : ""}
              ${className ?? ""}
              ${child.props.className ?? ""}
            `.trim(),
        ...props,
      });
    }

    return (
      <button
        ref={ref}
        data-active={isActive}
        data-size={size}
        data-variant={variant}
        className={`
            ${styles.menuButton}
            ${isActive ? styles.menuButtonActive : ""}
            ${className ?? ""}
          `.trim()}
        {...props}
      >
        {children}
      </button>
    );
  },
);

SidebarMenuButton.displayName = "SidebarMenuButton";

export default SidebarMenuButton;
