import { useEffect, useRef, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import { Sidebar } from "./components";
import axios from "./config/axios";
import env from "./config/env";
import { NAV_ITEMS } from "./config/routes";
import type { LoginResponse } from "./services/auth/auth.types";
import authStore from "./store/auth.store";

const PUBLIC_ROUTES = ["/login", "/onboarding"];

const App = () => {
  const location = useLocation();
  const isPublic = PUBLIC_ROUTES.includes(location.pathname);
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(!authStore.getInitialized());

  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) {
      return;
    }

    initializedRef.current = true;

    const init = async () => {
      try {
        if (!authStore.getAccessToken()) {
          const res = await axios.post<LoginResponse>(
            `${env.API_URL}/auth/refresh`,
            {},
            {
              withCredentials: true,
            },
          );

          if (!res.success) {
            authStore.clear();
            return;
          }

          const token = res.data?.accessToken;

          if (!token) {
            authStore.clear();
            return;
          }

          authStore.setAccessToken(token);
        }
      } catch (err) {
        console.log("Refresh failed", err);

        authStore.clear();
      } finally {
        authStore.setInitialized(true);
        setLoading(false);
      }
    };

    init();
  }, []);

  if (loading) {
    return <div className="container">Loading</div>;
  }

  const token = authStore.getAccessToken();

  if (!token && !isPublic) {
    return (
      <Navigate
        replace
        to={`/login?redirect=${encodeURIComponent(
          location.pathname + location.search,
        )}`}
      />
    );
  }

  const hideSidebar = NAV_ITEMS.some(
    (item) => item.hideSidebar && item.href === location.pathname,
  );

  const routeExists = NAV_ITEMS.some(
    (item) =>
      item.href === location.pathname ||
      item.children?.some((child) => child.href === location.pathname),
  );

  const shouldShowSidebar = !!token && routeExists && !hideSidebar;

  return (
    <div style={{ display: "flex" }}>
      {shouldShowSidebar && (
        <Sidebar
          isCollapsed={collapsed}
          onToggle={() => setCollapsed(!collapsed)}
        />
      )}

      <div
        style={{
          flex: 1,
          marginLeft: shouldShowSidebar ? (collapsed ? 80 : 260) : 0,
          transition: "all 0.3s ease",
        }}
      >
        <Routes>
          {NAV_ITEMS.map((item) => {
            if (item.children) {
              return (
                <>
                  <Route
                    element={item.component}
                    key={item.href}
                    path={item.href}
                  />

                  {item.children.map((child) => (
                    <Route
                      element={child.component}
                      key={child.href}
                      path={child.href}
                    />
                  ))}
                </>
              );
            }

            return (
              <Route
                element={item.component}
                key={item.href}
                path={item.href}
              />
            );
          })}

          <Route
            element={<div className="container">404 Page Not Found</div>}
            path="*"
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
