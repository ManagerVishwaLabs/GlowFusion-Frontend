import * as React from "react";
import { CheckIcon, ChevronRight, Circle } from "../../icons";
import styles from "./DropdownMenu.module.css";

interface DropdownMenuContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

const DropdownMenuContext =
  React.createContext<DropdownMenuContextValue | null>(null);

function useDropdownMenu() {
  const context = React.useContext(DropdownMenuContext);
  if (!context) {
    throw new Error(
      "DropdownMenu components must be used within a DropdownMenu",
    );
  }
  return context;
}

interface RadioGroupContextValue {
  value: string;
  onValueChange: (value: string) => void;
}

const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(
  null,
);

interface DropdownMenuProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

function DropdownMenu({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  children,
}: DropdownMenuProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = React.useCallback(
    (value: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(value);
      }
      onOpenChange?.(value);
    },
    [isControlled, onOpenChange],
  );

  return (
    <DropdownMenuContext.Provider value={{ open, setOpen, triggerRef }}>
      <div
        data-slot="dropdown-menu"
        style={{ position: "relative", display: "inline-block" }}
      >
        {children}
      </div>
    </DropdownMenuContext.Provider>
  );
}

function DropdownMenuPortal({ children }: { children: React.ReactNode }) {
  const { open } = useDropdownMenu();
  if (!open) return null;
  return <>{children}</>;
}

interface DropdownMenuTriggerProps extends React.ComponentProps<"button"> {
  asChild?: boolean;
}

function DropdownMenuTrigger({
  children,
  asChild,
  ...props
}: DropdownMenuTriggerProps) {
  const { open, setOpen, triggerRef } = useDropdownMenu();

  type ChildProps = {
    onClick?: (e: React.MouseEvent) => void;
    [key: string]: unknown;
  };

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<ChildProps>;

    return React.cloneElement(child, {
      onClick: (e: React.MouseEvent) => {
        child.props.onClick?.(e);
        setOpen(true);
      },
    });
  }

  return (
    <button
      ref={triggerRef}
      type="button"
      data-slot="dropdown-menu-trigger"
      onClick={() => setOpen(!open)}
      {...props}
    >
      {children}
    </button>
  );
}

interface DropdownMenuContentProps extends React.ComponentProps<"div"> {
  sideOffset?: number;
  align?: "start" | "center" | "end";
  side?: "top" | "right" | "bottom" | "left";
}

function DropdownMenuContent({
  className,
  sideOffset = 4,
  align = "start",
  side = "bottom",
  children,
  ...props
}: DropdownMenuContentProps) {
  const { open, setOpen, triggerRef } = useDropdownMenu();
  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
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
  }, [open, setOpen, triggerRef]);

  if (!open) return null;

  return (
    <div
      ref={contentRef}
      data-slot="dropdown-menu-content"
      className={`${styles.content} ${className || ""}`}
      style={{
        position: "absolute",
        [side === "top"
          ? "bottom"
          : side === "bottom"
            ? "top"
            : side === "left"
              ? "right"
              : "left"]: `calc(100% + ${sideOffset}px)`,
        ...(side === "top" || side === "bottom"
          ? {
              left: align === "start" ? 0 : align === "end" ? "auto" : "50%",
              right: align === "end" ? 0 : "auto",
              transform: align === "center" ? "translateX(-50%)" : undefined,
            }
          : {
              top: align === "start" ? 0 : align === "end" ? "auto" : "50%",
              bottom: align === "end" ? 0 : "auto",
              transform: align === "center" ? "translateY(-50%)" : undefined,
            }),
        zIndex: 50,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

function DropdownMenuGroup({
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div data-slot="dropdown-menu-group" {...props}>
      {children}
    </div>
  );
}

interface DropdownMenuItemProps extends React.ComponentProps<"div"> {
  inset?: boolean;
  variant?: "default" | "destructive";
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: DropdownMenuItemProps) {
  const { setOpen } = useDropdownMenu();

  return (
    <div
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={`${styles.item} ${variant === "destructive" ? styles.destructive : ""} ${inset ? styles.inset : ""} ${className || ""}`}
      onClick={() => setOpen(false)}
      {...props}
    />
  );
}

interface DropdownMenuCheckboxItemProps extends React.ComponentProps<"div"> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked = false,
  onCheckedChange,
  ...props
}: DropdownMenuCheckboxItemProps) {
  return (
    <div
      data-slot="dropdown-menu-checkbox-item"
      className={`${styles.checkboxItem} ${className || ""}`}
      onClick={() => onCheckedChange?.(!checked)}
      {...props}
    >
      <span className={styles.indicator}>
        {checked && <CheckIcon className={styles.checkIcon} />}
      </span>
      {children}
    </div>
  );
}

interface DropdownMenuRadioGroupProps extends React.ComponentProps<"div"> {
  value?: string;
  onValueChange?: (value: string) => void;
}

function DropdownMenuRadioGroup({
  value = "",
  onValueChange = () => {},
  children,
  ...props
}: DropdownMenuRadioGroupProps) {
  return (
    <RadioGroupContext.Provider value={{ value, onValueChange }}>
      <div data-slot="dropdown-menu-radio-group" {...props}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

interface DropdownMenuRadioItemProps extends React.ComponentProps<"div"> {
  value: string;
}

function DropdownMenuRadioItem({
  className,
  children,
  value,
  ...props
}: DropdownMenuRadioItemProps) {
  const radioContext = React.useContext(RadioGroupContext);
  const isSelected = radioContext?.value === value;

  return (
    <div
      data-slot="dropdown-menu-radio-item"
      className={`${styles.radioItem} ${className || ""}`}
      onClick={() => radioContext?.onValueChange(value)}
      {...props}
    >
      <span className={styles.indicator}>
        {isSelected && <Circle className={styles.circleIcon} />}
      </span>
      {children}
    </div>
  );
}

interface DropdownMenuLabelProps extends React.ComponentProps<"div"> {
  inset?: boolean;
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: DropdownMenuLabelProps) {
  return (
    <div
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={`${styles.label} ${inset ? styles.inset : ""} ${className || ""}`}
      {...props}
    />
  );
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dropdown-menu-separator"
      className={`${styles.separator} ${className || ""}`}
      {...props}
    />
  );
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={`${styles.shortcut} ${className || ""}`}
      {...props}
    />
  );
}

interface SubMenuContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SubMenuContext = React.createContext<SubMenuContextValue | null>(null);

function DropdownMenuSub({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  return (
    <SubMenuContext.Provider value={{ open, setOpen }}>
      <div data-slot="dropdown-menu-sub" style={{ position: "relative" }}>
        {children}
      </div>
    </SubMenuContext.Provider>
  );
}

interface DropdownMenuSubTriggerProps extends React.ComponentProps<"div"> {
  inset?: boolean;
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: DropdownMenuSubTriggerProps) {
  const subContext = React.useContext(SubMenuContext);

  return (
    <div
      data-slot="dropdown-menu-sub-trigger"
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
}

function DropdownMenuSubContent({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const subContext = React.useContext(SubMenuContext);

  if (!subContext?.open) return null;

  return (
    <div
      data-slot="dropdown-menu-sub-content"
      className={`${styles.subContent} ${className || ""}`}
      onMouseEnter={() => subContext?.setOpen(true)}
      onMouseLeave={() => subContext?.setOpen(false)}
      {...props}
    >
      {children}
    </div>
  );
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
};
