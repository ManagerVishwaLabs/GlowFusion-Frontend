import * as React from "react";
import styles from "./Sidebar.module.css";

import { useSidebar } from "./sidebar-hook";

const SidebarRail = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button">
>(({ className, ...props }, ref) => {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      ref={ref}
      className={`
            ${styles.rail}
            ${className ?? ""}
          `.trim()}
      tabIndex={-1}
      aria-hidden="true"
      title="Toggle Sidebar"
      onClick={toggleSidebar}
      {...props}
    />
  );
});

SidebarRail.displayName = "SidebarRail";

export default SidebarRail;
