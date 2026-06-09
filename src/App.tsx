import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import { Sidebar } from "./components/";
import { NAV_ITEMS } from "./config/routes";

const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  const location = useLocation();

  const hideSidebar = NAV_ITEMS.some(
    (item) => item.hideSidebar && item.href === location.pathname,
  );

  return (
    <div style={{ display: "flex" }}>
      {!hideSidebar && (
        <Sidebar
          isCollapsed={collapsed}
          onToggle={() => setCollapsed(!collapsed)}
        />
      )}

      <div
        style={{
          flex: 1,
          marginLeft: hideSidebar ? 0 : collapsed ? 80 : 260,
          transition: "all 0.3s ease",
        }}
      >
        <Routes>
          {NAV_ITEMS.map((item) => {
            if (item.children) {
              return (
                <>
                  <Route
                    key={item.href}
                    path={item.href}
                    element={item.component}
                  />

                  {item.children.map((child) => (
                    <Route
                      key={child.href}
                      path={child.href}
                      element={child.component}
                    />
                  ))}
                </>
              );
            }
            return (
              <Route
                key={item.href}
                path={item.href}
                element={item.component}
              />
            );
          })}
        </Routes>
      </div>
    </div>
  );
};

export default App;
