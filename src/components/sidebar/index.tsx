import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { ChevronDown, ChevronLeft, Zap } from "../../components/icons";
import { NAV_ITEMS } from "../../config/routes";
import styles from "./Sidebar.module.css";

const APP_CONFIG = {
  name: "Grow Fusion",
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
        <Link className={styles.logoLink} to="/">
          <div className={styles.logoIcon}>
            <Zap color="white" size={20} />
          </div>

          {!isCollapsed && (
            <span className={styles.logoText}>{APP_CONFIG.name}</span>
          )}
        </Link>
      </div>

      <button
        className={`${styles.toggleButton} ${
          isCollapsed ? styles.rotated : ""
        }`}
        onClick={onToggle}
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
                    className={`${styles.navMain} ${
                      isActive ? styles.active : ""
                    }`}
                    to={item.href || item.children?.[0]?.href || "/"}
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
                      className={styles.expandButton}
                      onClick={() => toggleMenu(item.label)}
                    >
                      <ChevronDown
                        className={isOpen ? styles.chevronOpen : ""}
                        size={16}
                      />
                    </button>
                  )}
                </div>
              ) : (
                <Link
                  className={`${styles.navItem} ${
                    isActive ? styles.active : ""
                  } ${isCollapsed ? styles.navCollapsed : ""}`}
                  to={item.href!}
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
                        className={`${styles.subNavItem} ${
                          isSubActive ? styles.active : ""
                        }`}
                        key={child.href}
                        to={child.href}
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
                <Zap color="white" size={16} />
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
              <Zap color="white" size={20} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
