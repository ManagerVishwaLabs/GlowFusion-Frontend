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

type SubNavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{
    size?: number;
    color?: string;
    className?: string;
  }>;
  component: ReactNode;
};

type NavItem = {
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

const NAV_ITEMS: NavItem[] = [
  {
    component: <CompanySetup />,
    hideSidebar: true,
    href: "/company-setup",
    icon: User,
    label: "Company Setup",
  },
  {
    component: <Page title="Dashboard" />,
    href: "/",
    icon: LayoutDashboard,
    label: "Dashboard",
  },

  {
    component: <Page title="Posts" />,
    href: "/posts",
    icon: FileText,
    label: "Posts",
  },

  {
    children: [
      {
        component: <Page title="All Users" />,
        href: "/users/all",
        icon: User,
        label: "All Users",
      },

      {
        component: <Page title="Roles" />,
        href: "/users/roles",
        icon: Shield,
        label: "Roles",
      },
    ],
    component: <Page title="Users" />,
    href: "/users",
    icon: Users,

    label: "Users",
  },
];

export { NAV_ITEMS };
