import * as React from "react";
import { PanelLeft } from "../../icons";

import styles from "./Sidebar.module.css";
import { useSidebar } from "./sidebar-hook";

const SidebarTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button">
>(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      ref={ref}
      className={`
            ${styles.trigger}
            ${className ?? ""}
          `.trim()}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <PanelLeft />

      <span className={styles.srOnly}>Toggle Sidebar</span>
    </button>
  );
});

SidebarTrigger.displayName = "SidebarTrigger";

export default SidebarTrigger;
