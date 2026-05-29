import * as React from "react";
import { ChevronDown } from "../../icons";
import styles from "./NavigationMenu.module.css";

interface NavigationMenuContextValue {
  activeItem: string | null;
  setActiveItem: (item: string | null) => void;
}

const NavigationMenuContext = React.createContext<NavigationMenuContextValue>({
  activeItem: null,
  setActiveItem: () => {},
});

const NavigationMenu = React.forwardRef<
  HTMLElement,
  React.ComponentProps<"nav">
>(({ className, children, ...props }, ref) => {
  const [activeItem, setActiveItem] = React.useState<string | null>(null);

  return (
    <NavigationMenuContext.Provider value={{ activeItem, setActiveItem }}>
      <nav
        ref={ref}
        data-slot="navigation-menu"
        className={`${styles.root} ${className || ""}`}
        {...props}
      >
        {children}
        <NavigationMenuViewport />
      </nav>
    </NavigationMenuContext.Provider>
  );
});
NavigationMenu.displayName = "NavigationMenu";

const NavigationMenuList = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-slot="navigation-menu-list"
    className={`${styles.list} ${className || ""}`}
    {...props}
  />
));
NavigationMenuList.displayName = "NavigationMenuList";

interface NavigationMenuItemProps extends React.ComponentProps<"li"> {
  value?: string;
}

const NavigationMenuItem = React.forwardRef<
  HTMLLIElement,
  NavigationMenuItemProps
>(({ className, children, value, ...props }, ref) => {
  const id = React.useId();
  const itemValue = value || id;

  return (
    <li
      ref={ref}
      data-slot="navigation-menu-item"
      data-value={itemValue}
      className={className}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            "data-item-value": itemValue,
          });
        }
        return child;
      })}
    </li>
  );
});
NavigationMenuItem.displayName = "NavigationMenuItem";

interface NavigationMenuTriggerProps extends React.ComponentProps<"button"> {
  "data-item-value"?: string;
}

const NavigationMenuTrigger = React.forwardRef<
  HTMLButtonElement,
  NavigationMenuTriggerProps
>(({ className, children, "data-item-value": itemValue, ...props }, ref) => {
  const { activeItem, setActiveItem } = React.useContext(NavigationMenuContext);
  const isActive = activeItem === itemValue;

  return (
    <button
      ref={ref}
      type="button"
      data-slot="navigation-menu-trigger"
      data-state={isActive ? "open" : "closed"}
      className={`${styles.trigger} ${className || ""}`}
      onMouseEnter={() => setActiveItem(itemValue || null)}
      onMouseLeave={() => setActiveItem(null)}
      {...props}
    >
      {children}
      <ChevronDown className={styles.chevron} aria-hidden="true" />
    </button>
  );
});
NavigationMenuTrigger.displayName = "NavigationMenuTrigger";

interface NavigationMenuContentProps extends React.ComponentProps<"div"> {
  "data-item-value"?: string;
}

const NavigationMenuContent = React.forwardRef<
  HTMLDivElement,
  NavigationMenuContentProps
>(({ className, "data-item-value": itemValue, ...props }, ref) => {
  const { activeItem, setActiveItem } = React.useContext(NavigationMenuContext);
  const isActive = activeItem === itemValue;

  if (!isActive) return null;

  return (
    <div
      ref={ref}
      data-slot="navigation-menu-content"
      data-state={isActive ? "open" : "closed"}
      className={`${styles.content} ${className || ""}`}
      onMouseEnter={() => setActiveItem(itemValue || null)}
      onMouseLeave={() => setActiveItem(null)}
      {...props}
    />
  );
});
NavigationMenuContent.displayName = "NavigationMenuContent";

const NavigationMenuLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<"a">
>(({ className, ...props }, ref) => (
  <a
    ref={ref}
    data-slot="navigation-menu-link"
    className={className}
    {...props}
  />
));
NavigationMenuLink.displayName = "NavigationMenuLink";

const NavigationMenuViewport = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  const { activeItem } = React.useContext(NavigationMenuContext);

  if (!activeItem) return null;

  return (
    <div className={styles.viewportWrapper}>
      <div
        ref={ref}
        data-slot="navigation-menu-viewport"
        className={`${styles.viewport} ${className || ""}`}
        {...props}
      />
    </div>
  );
});
NavigationMenuViewport.displayName = "NavigationMenuViewport";

const NavigationMenuIndicator = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="navigation-menu-indicator"
    className={`${styles.indicator} ${className || ""}`}
    {...props}
  >
    <div className={styles.indicatorArrow} />
  </div>
));
NavigationMenuIndicator.displayName = "NavigationMenuIndicator";

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
};
