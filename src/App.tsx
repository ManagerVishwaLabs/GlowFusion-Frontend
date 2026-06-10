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
        </Routes>
      </div>
    </div>
  );
};

export default App;
