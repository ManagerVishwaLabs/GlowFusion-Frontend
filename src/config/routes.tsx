import type { ReactNode } from "react";

import {
  FileText,
  LayoutDashboard,
  Shield,
  User,
  Users,
} from "../components/icons";
import CompanySetup from "../pages/CompanySetup";
import Page from "../pages/TestPage/TestPage";

export type SubNavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{
    size?: number;
    color?: string;
    className?: string;
  }>;
  component: ReactNode;
};

export type NavItem = {
  label: string;
  href?: string;
  icon: React.ComponentType<{
    size?: number;
    color?: string;
    className?: string;
  }>;

  component?: ReactNode;

  hideSidebar?: boolean;

  children?: SubNavItem[];
};

export const NAV_ITEMS: NavItem[] = [
  {
    label: "CompanySetup",
    href: "/CompanySetup",
    icon: User,
    component: <CompanySetup />,
    hideSidebar: true,
  },
  {
    label: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
    component: <Page title="Dashboard" />,
  },

  {
    label: "Posts",
    href: "/posts",
    icon: FileText,
    component: <Page title="Posts" />,
  },

  {
    label: "Users",
    icon: Users,
    href: "/users",
    component: <Page title="Users" />,

    children: [
      {
        label: "All Users",
        href: "/users/all",
        icon: User,
        component: <Page title="All Users" />,
      },

      {
        label: "Roles",
        href: "/users/roles",
        icon: Shield,
        component: <Page title="Roles" />,
      },
    ],
  },
];
