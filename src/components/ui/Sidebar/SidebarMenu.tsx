import * as React from "react";
import styles from "./Sidebar.module.css";

const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => {
  return (
    <ul
      ref={ref}
      className={`
            ${styles.menu}
            ${className ?? ""}
          `.trim()}
      {...props}
    />
  );
});

SidebarMenu.displayName = "SidebarMenu";

export default SidebarMenu;
