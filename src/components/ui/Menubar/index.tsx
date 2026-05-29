import * as React from "react";
import { Check, ChevronRight, Circle } from "../../icons";
import styles from "./Menubar.module.css";

interface MenubarContextValue {
  activeMenu: string | null;
  setActiveMenu: (menu: string | null) => void;
}

const MenubarContext = React.createContext<MenubarContextValue>({
  activeMenu: null,
  setActiveMenu: () => {},
});

interface MenuContextValue {
  menuId: string;
  open: boolean;
}

const MenuContext = React.createContext<MenuContextValue>({
  menuId: "",
  open: false,
});

interface RadioGroupContextValue {
  value: string;
  onValueChange: (value: string) => void;
}

const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(
  null,
);

const Menubar = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, children, ...props }, ref) => {
    const [activeMenu, setActiveMenu] = React.useState<string | null>(null);

    return (
      <MenubarContext.Provider value={{ activeMenu, setActiveMenu }}>
        <div
          ref={ref}
          data-slot="menubar"
          role="menubar"
          className={`${styles.menubar} ${className || ""}`}
          {...props}
        >
          {children}
        </div>
      </MenubarContext.Provider>
    );
  },
);
Menubar.displayName = "Menubar";

interface MenubarMenuProps {
  children: React.ReactNode;
}

function MenubarMenu({ children }: MenubarMenuProps) {
  const menuId = React.useId();
  const { activeMenu } = React.useContext(MenubarContext);
  const open = activeMenu === menuId;

  return (
    <MenuContext.Provider value={{ menuId, open }}>
      <div data-slot="menubar-menu" style={{ position: "relative" }}>
        {children}
      </div>
    </MenuContext.Provider>
  );
}

function MenubarGroup({ children, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="menubar-group" role="group" {...props}>
      {children}
    </div>
  );
}

function MenubarPortal({ children }: { children: React.ReactNode }) {
  const { open } = React.useContext(MenuContext);
  if (!open) return null;
  return <>{children}</>;
}

interface SubMenuContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SubMenuContext = React.createContext<SubMenuContextValue | null>(null);

function MenubarSub({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  return (
    <SubMenuContext.Provider value={{ open, setOpen }}>
      <div data-slot="menubar-sub" style={{ position: "relative" }}>
        {children}
      </div>
    </SubMenuContext.Provider>
  );
}

interface MenubarRadioGroupProps extends React.ComponentProps<"div"> {
  value?: string;
  onValueChange?: (value: string) => void;
}

function MenubarRadioGroup({
  value = "",
  onValueChange = () => {},
  children,
  ...props
}: MenubarRadioGroupProps) {
  return (
    <RadioGroupContext.Provider value={{ value, onValueChange }}>
      <div data-slot="menubar-radio-group" role="group" {...props}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

const MenubarTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button">
>(({ className, ...props }, ref) => {
  const { activeMenu, setActiveMenu } = React.useContext(MenubarContext);
  const { menuId, open } = React.useContext(MenuContext);

  return (
    <button
      ref={ref}
      type="button"
      role="menuitem"
      data-slot="menubar-trigger"
      data-state={open ? "open" : "closed"}
      className={`${styles.trigger} ${className || ""}`}
      onClick={() => setActiveMenu(open ? null : menuId)}
      onMouseEnter={() => {
        if (activeMenu !== null) {
          setActiveMenu(menuId);
        }
      }}
      {...props}
    />
  );
});
MenubarTrigger.displayName = "MenubarTrigger";

const MenubarSubTrigger = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & { inset?: boolean }
>(({ className, inset, children, ...props }, ref) => {
  const subContext = React.useContext(SubMenuContext);

  return (
    <div
      ref={ref}
      data-slot="menubar-sub-trigger"
      data-inset={inset}
      className={`${styles.subTrigger} ${inset ? styles.inset : ""} ${className || ""}`}
      onMouseEnter={() => subContext?.setOpen(true)}
      onMouseLeave={() => subContext?.setOpen(false)}
      {...props}
    >
      {children}
      <ChevronRight className={styles.chevron} />
    </div>
  );
});
MenubarSubTrigger.displayName = "MenubarSubTrigger";

const MenubarSubContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, children, ...props }, ref) => {
  const subContext = React.useContext(SubMenuContext);

  if (!subContext?.open) return null;

  return (
    <div
      ref={ref}
      data-slot="menubar-sub-content"
      className={`${styles.subContent} ${className || ""}`}
      onMouseEnter={() => subContext?.setOpen(true)}
      onMouseLeave={() => subContext?.setOpen(false)}
      {...props}
    >
      {children}
    </div>
  );
});
MenubarSubContent.displayName = "MenubarSubContent";

const MenubarContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    align?: "start" | "center" | "end";
    alignOffset?: number;
    sideOffset?: number;
  }
>(
  (
    {
      className,
      align = "start",
      alignOffset = -4,
      sideOffset = 8,
      children,
      ...props
    },
    ref,
  ) => {
    const { open } = React.useContext(MenuContext);
    const { setActiveMenu } = React.useContext(MenubarContext);
    const contentRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          contentRef.current &&
          !contentRef.current.contains(e.target as Node)
        ) {
          setActiveMenu(null);
        }
      };

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setActiveMenu(null);
        }
      };

      if (open) {
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleEscape);
      };
    }, [open, setActiveMenu]);

    if (!open) return null;

    return (
      <div
        ref={contentRef}
        data-slot="menubar-content"
        role="menu"
        className={`${styles.content} ${className || ""}`}
        style={{
          position: "absolute",
          top: `calc(100% + ${sideOffset}px)`,
          left:
            align === "start" ? alignOffset : align === "end" ? "auto" : "50%",
          right: align === "end" ? alignOffset : "auto",
          transform: align === "center" ? "translateX(-50%)" : undefined,
          zIndex: 50,
        }}
        {...props}
      >
        {children}
      </div>
    );
  },
);
MenubarContent.displayName = "MenubarContent";

const MenubarItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & { inset?: boolean }
>(({ className, inset, ...props }, ref) => {
  const { setActiveMenu } = React.useContext(MenubarContext);

  return (
    <div
      ref={ref}
      role="menuitem"
      data-slot="menubar-item"
      data-inset={inset}
      className={`${styles.item} ${inset ? styles.inset : ""} ${className || ""}`}
      onClick={() => setActiveMenu(null)}
      {...props}
    />
  );
});
MenubarItem.displayName = "MenubarItem";

const MenubarCheckboxItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
  }
>(
  (
    { className, children, checked = false, onCheckedChange, ...props },
    ref,
  ) => (
    <div
      ref={ref}
      role="menuitemcheckbox"
      aria-checked={checked}
      data-slot="menubar-checkbox-item"
      className={`${styles.checkboxItem} ${className || ""}`}
      onClick={() => onCheckedChange?.(!checked)}
      {...props}
    >
      <span className={styles.itemIndicator}>
        {checked && <Check className={styles.checkIcon} />}
      </span>
      {children}
    </div>
  ),
);
MenubarCheckboxItem.displayName = "MenubarCheckboxItem";

const MenubarRadioItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & { value: string }
>(({ className, children, value, ...props }, ref) => {
  const radioContext = React.useContext(RadioGroupContext);
  const isSelected = radioContext?.value === value;

  return (
    <div
      ref={ref}
      role="menuitemradio"
      aria-checked={isSelected}
      data-slot="menubar-radio-item"
      className={`${styles.radioItem} ${className || ""}`}
      onClick={() => radioContext?.onValueChange(value)}
      {...props}
    >
      <span className={styles.itemIndicator}>
        {isSelected && <Circle className={styles.circleIcon} />}
      </span>
      {children}
    </div>
  );
});
MenubarRadioItem.displayName = "MenubarRadioItem";

const MenubarLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & { inset?: boolean }
>(({ className, inset, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="menubar-label"
    data-inset={inset}
    className={`${styles.label} ${inset ? styles.inset : ""} ${className || ""}`}
    {...props}
  />
));
MenubarLabel.displayName = "MenubarLabel";

const MenubarSeparator = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    role="separator"
    data-slot="menubar-separator"
    className={`${styles.separator} ${className || ""}`}
    {...props}
  />
));
MenubarSeparator.displayName = "MenubarSeparator";

const MenubarShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      data-slot="menubar-shortcut"
      className={`${styles.shortcut} ${className || ""}`}
      {...props}
    />
  );
};
MenubarShortcut.displayName = "MenubarShortcut";

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
};
