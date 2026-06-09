import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { ChevronDown, ChevronLeft, Zap } from "../../components/icons";
import { NAV_ITEMS } from "../../config/routes";
import styles from "./Sidebar.module.css";

const APP_CONFIG = {
  name: "Glow Fusion",
};

type SidebarProps = {
  isCollapsed?: boolean;
  onToggle: () => void;
};

export default function Sidebar({
  isCollapsed = false,
  onToggle,
}: SidebarProps) {
  const location = useLocation();

  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) =>
      prev.includes(label) ? prev.filter((i) => i !== label) : [...prev, label],
    );
  };

  return (
    <aside
      className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ""}`}
    >
      <div className={styles.logoSection}>
        <Link to="/" className={styles.logoLink}>
          <div className={styles.logoIcon}>
            <Zap size={20} color="white" />
          </div>

          {!isCollapsed && (
            <span className={styles.logoText}>{APP_CONFIG.name}</span>
          )}
        </Link>
      </div>

      <button
        onClick={onToggle}
        className={`${styles.toggleButton} ${
          isCollapsed ? styles.rotated : ""
        }`}
      >
        <ChevronLeft size={16} />
      </button>

      <nav className={styles.navigation}>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;

          const hasChildren = !!item.children?.length;

          const isOpen = openMenus.includes(item.label);

          const isActive = item.href === location.pathname;

          return (
            <div key={item.label}>
              {hasChildren ? (
                <div
                  className={`${styles.navSplit} ${
                    isCollapsed ? styles.navCollapsed : ""
                  }`}
                >
                  <Link
                    to={item.href || item.children?.[0]?.href || "/"}
                    className={`${styles.navMain} ${
                      isActive ? styles.active : ""
                    }`}
                  >
                    <div className={styles.navContent}>
                      <Icon className={styles.navIcon} size={20} />

                      {!isCollapsed && (
                        <span className={styles.navLabel}>{item.label}</span>
                      )}
                    </div>
                  </Link>

                  {!isCollapsed && (
                    <button
                      onClick={() => toggleMenu(item.label)}
                      className={styles.expandButton}
                    >
                      <ChevronDown
                        size={16}
                        className={isOpen ? styles.chevronOpen : ""}
                      />
                    </button>
                  )}
                </div>
              ) : (
                <Link
                  to={item.href!}
                  className={`${styles.navItem} ${
                    isActive ? styles.active : ""
                  } ${isCollapsed ? styles.navCollapsed : ""}`}
                >
                  <Icon className={styles.navIcon} size={20} />

                  {!isCollapsed && (
                    <span className={styles.navLabel}>{item.label}</span>
                  )}
                </Link>
              )}

              {hasChildren && isOpen && !isCollapsed && (
                <div className={styles.subMenu}>
                  {item.children?.map((child) => {
                    const ChildIcon = child.icon;

                    const isSubActive = location.pathname === child.href;

                    return (
                      <Link
                        key={child.href}
                        to={child.href}
                        className={`${styles.subNavItem} ${
                          isSubActive ? styles.active : ""
                        }`}
                      >
                        <ChildIcon size={16} />

                        <span>{child.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <BottomSection isCollapsed={isCollapsed} />
    </aside>
  );
}

const BottomSection = ({ isCollapsed }: { isCollapsed: boolean }) => {
  return (
    <div className={styles.bottomSection}>
      <div
        className={`${styles.proCard} ${
          isCollapsed ? styles.proCollapsed : ""
        }`}
      >
        {!isCollapsed ? (
          <>
            <div className={styles.proTop}>
              <div className={styles.proIcon}>
                <Zap size={16} color="white" />
              </div>

              <div>
                <p className={styles.proTitle}>Pro Plan</p>

                <span className={styles.badge}>Active</span>
              </div>
            </div>

            <button className={styles.upgradeButton}>Upgrade Plan</button>
          </>
        ) : (
          <div className={styles.collapsedPro}>
            <div className={styles.proIcon}>
              <Zap size={20} color="white" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
