import type { ReactNode } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import {
  FileText,
  LayoutDashboard,
  Shield,
  User,
  Users,
} from "../components/icons";
import CompanySetup from "../pages/CompanySetup";
import Login from "../pages/Login";
import Signup from "../pages/SignUp";
import Page from "../pages/TestPage/TestPage";
import authStore from "../store/auth.store";

type SubNavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{
    size?: number;
    color?: string;
    className?: string;
  }>;
  component: ReactNode;
  protected?: boolean;
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
  hideInSidebar?: true;
  children?: SubNavItem[];
  protected?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  {
    component: <CompanySetup />,
    hideInSidebar: true,
    hideSidebar: true,
    href: "/onboarding",
    icon: User,
    label: "Company Setup",
  },
  {
    component: <Login />,
    hideInSidebar: true,
    hideSidebar: true,
    href: "/login",
    icon: User,
    label: "Login",
  },
  {
    component: <Signup />,
    hideInSidebar: true,
    hideSidebar: true,
    href: "/onboarding/:inviteCode",
    icon: User,
    label: "Sign Up",
  },
  {
    component: <Page title="Dashboard" />,
    href: "/dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
    protected: true,
  },
  {
    component: <Page title="Posts" />,
    href: "/posts",
    icon: FileText,
    label: "Posts",
    protected: true,
  },
  {
    children: [
      {
        component: <Page title="All Users" />,
        href: "/users/all",
        icon: User,
        label: "All Users",
        protected: true,
      },
      {
        component: <Page title="Roles" />,
        href: "/users/roles",
        icon: Shield,
        label: "Roles",
        protected: true,
      },
    ],
    component: <Page title="Users" />,
    href: "/users",
    icon: Users,
    label: "Users",
    protected: true,
  },
];

const ProtectedRoute = () => {
  const location = useLocation();
  const token = authStore.getAccessToken();

  if (!token) {
    return (
      <Navigate
        replace
        to={`/login?redirect=${encodeURIComponent(
          location.pathname + location.search,
        )}`}
      />
    );
  }

  return <Outlet />;
};

export { NAV_ITEMS, ProtectedRoute };
