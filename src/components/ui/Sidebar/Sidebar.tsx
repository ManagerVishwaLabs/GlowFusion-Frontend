import * as React from "react";
import styles from "./Sidebar.module.css";

import { useSidebar } from "./sidebar-hook";
import type { SidebarCollapsible, SidebarSide, SidebarVariant } from "./types";

type SidebarProps = React.ComponentProps<"div"> & {
  side?: SidebarSide;
  variant?: SidebarVariant;
  collapsible?: SidebarCollapsible;
};

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  (
    {
      side = "left",
      variant = "sidebar",
      collapsible = "offcanvas",
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

    if (collapsible === "none") {
      return (
        <div
          ref={ref}
          className={`
            ${styles.sidebar}
            ${styles.sidebarNonCollapsible}
            ${className ?? ""}
          `.trim()}
          {...props}
        >
          {children}
        </div>
      );
    }

    if (isMobile) {
      return (
        <>
          {openMobile && (
            <div
              className={styles.mobileOverlay}
              onClick={() => setOpenMobile(false)}
            />
          )}

          <div
            ref={ref}
            className={`
              ${styles.sidebarMobile}
              ${openMobile ? styles.sidebarMobileOpen : ""}
              ${side === "right" ? styles.sidebarRight : ""}
              ${className ?? ""}
            `.trim()}
            data-mobile="true"
            data-side={side}
            {...props}
          >
            <div className={styles.sidebarMobileInner}>{children}</div>
          </div>
        </>
      );
    }

    return (
      <div
        ref={ref}
        className={`
          ${styles.sidebarWrapper}
          ${className ?? ""}
        `.trim()}
        data-state={state}
        data-collapsible={state === "collapsed" ? collapsible : ""}
        data-variant={variant}
        data-side={side}
      >
        <div
          className={`
            ${styles.sidebar}
            ${
              variant === "floating" || variant === "inset"
                ? styles.sidebarFloating
                : ""
            }
          `.trim()}
          data-state={state}
          {...props}
        >
          <div className={styles.sidebarInner}>{children}</div>
        </div>
      </div>
    );
  },
);

Sidebar.displayName = "Sidebar";

export default Sidebar;
