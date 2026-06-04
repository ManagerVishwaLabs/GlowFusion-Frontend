import * as React from "react";
import styles from "./Sidebar.module.css";

import {
  SIDEBAR_COOKIE_NAME,
  SIDEBAR_COOKIE_MAX_AGE,
  SIDEBAR_WIDTH,
  SIDEBAR_WIDTH_ICON,
  SIDEBAR_KEYBOARD_SHORTCUT,
} from "./constants";

import { SidebarContext } from "./sidebar-context";
import type { SidebarContextType } from "./types";

type SidebarProviderProps = React.ComponentProps<"div"> & {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const SidebarProvider = React.forwardRef<HTMLDivElement, SidebarProviderProps>(
  (
    {
      defaultOpen = true,
      open: openProp,
      onOpenChange,
      className,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const [isMobile, setIsMobile] = React.useState(false);

    const [openMobile, setOpenMobile] = React.useState(false);

    const [internalOpen, setInternalOpen] = React.useState(defaultOpen);

    const open = openProp ?? internalOpen;

    const setOpen = React.useCallback(
      (value: boolean | ((value: boolean) => boolean)) => {
        const nextOpen = typeof value === "function" ? value(open) : value;

        if (onOpenChange) {
          onOpenChange(nextOpen);
        } else {
          setInternalOpen(nextOpen);
        }

        document.cookie = `${SIDEBAR_COOKIE_NAME}=${nextOpen}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
      },
      [open, onOpenChange],
    );

    const toggleSidebar = React.useCallback(() => {
      if (isMobile) {
        setOpenMobile((prev) => !prev);
      } else {
        setOpen((prev) => !prev);
      }
    }, [isMobile, setOpen]);

    React.useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };

      checkMobile();

      window.addEventListener("resize", checkMobile);

      return () => window.removeEventListener("resize", checkMobile);
    }, []);

    React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (
          event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
          (event.ctrlKey || event.metaKey)
        ) {
          event.preventDefault();
          toggleSidebar();
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [toggleSidebar]);

    const state = open ? "expanded" : "collapsed";

    const contextValue = React.useMemo<SidebarContextType>(
      () => ({
        state,
        open,
        setOpen,
        openMobile,
        setOpenMobile,
        isMobile,
        toggleSidebar,
      }),
      [state, open, setOpen, openMobile, isMobile, toggleSidebar],
    );

    return (
      <SidebarContext.Provider value={contextValue}>
        <div
          ref={ref}
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH,
              "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
              ...style,
            } as React.CSSProperties
          }
          className={`${styles.provider} ${className ?? ""}`}
          data-state={state}
          data-collapsible={state === "collapsed" ? "offcanvas" : ""}
          {...props}
        >
          {children}
        </div>
      </SidebarContext.Provider>
    );
  },
);

SidebarProvider.displayName = "SidebarProvider";

export default SidebarProvider;
