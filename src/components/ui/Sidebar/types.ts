import * as React from "react";

export type SidebarState = "expanded" | "collapsed";

export type SidebarSide = "left" | "right";

export type SidebarVariant = "sidebar" | "floating" | "inset";

export type SidebarCollapsible = "offcanvas" | "icon" | "none";

export type SidebarContextType = {
  state: SidebarState;
  open: boolean;
  setOpen: (open: boolean | ((value: boolean) => boolean)) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

export interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  asChild?: boolean;
}

export type ChildProps = {
  className?: string;
  children?: React.ReactNode;
  [key: string]: unknown;
};
