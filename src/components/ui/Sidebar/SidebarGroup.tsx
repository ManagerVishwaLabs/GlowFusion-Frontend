import * as React from "react";
import styles from "./Sidebar.module.css";

const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`
            ${styles.group}
            ${className ?? ""}
          `.trim()}
      {...props}
    />
  );
});

SidebarGroup.displayName = "SidebarGroup";

export default SidebarGroup;
