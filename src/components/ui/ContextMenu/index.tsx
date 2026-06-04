import * as React from "react";
import { CheckIcon, ChevronRight, Circle } from "../../icons";
import styles from "./ContextMenu.module.css";

interface ContextMenuContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  position: { x: number; y: number };
  setPosition: (position: { x: number; y: number }) => void;
}

const ContextMenuContext = React.createContext<ContextMenuContextValue | null>(
  null,
);

function useContextMenu() {
  const context = React.useContext(ContextMenuContext);
  if (!context) {
    throw new Error("ContextMenu components must be used within a ContextMenu");
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

interface ContextMenuProps {
  children: React.ReactNode;
}

function ContextMenu({ children }: ContextMenuProps) {
  const [open, setOpen] = React.useState(false);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  return (
    <ContextMenuContext.Provider
      value={{ open, setOpen, position, setPosition }}
    >
      <div data-slot="context-menu">{children}</div>
    </ContextMenuContext.Provider>
  );
}

type ContextMenuTriggerProps = React.ComponentProps<"div">;

function ContextMenuTrigger({ children, ...props }: ContextMenuTriggerProps) {
  const { setOpen, setPosition } = useContextMenu();

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setPosition({ x: e.clientX, y: e.clientY });
    setOpen(true);
  };

  return (
    <div
      data-slot="context-menu-trigger"
      onContextMenu={handleContextMenu}
      {...props}
    >
      {children}
    </div>
  );
}

function ContextMenuGroup({ children, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="context-menu-group" {...props}>
      {children}
    </div>
  );
}

function ContextMenuPortal({ children }: { children: React.ReactNode }) {
  const { open } = useContextMenu();
  if (!open) return null;
  return <>{children}</>;
}

interface SubMenuContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SubMenuContext = React.createContext<SubMenuContextValue | null>(null);

function ContextMenuSub({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  return (
    <SubMenuContext.Provider value={{ open, setOpen }}>
      <div data-slot="context-menu-sub" style={{ position: "relative" }}>
        {children}
      </div>
    </SubMenuContext.Provider>
  );
}

interface ContextMenuRadioGroupProps extends React.ComponentProps<"div"> {
  value?: string;
  onValueChange?: (value: string) => void;
}

function ContextMenuRadioGroup({
  value = "",
  onValueChange = () => {},
  children,
  ...props
}: ContextMenuRadioGroupProps) {
  return (
    <RadioGroupContext.Provider value={{ value, onValueChange }}>
      <div data-slot="context-menu-radio-group" {...props}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

interface ContextMenuSubTriggerProps extends React.ComponentProps<"div"> {
  inset?: boolean;
}

function ContextMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: ContextMenuSubTriggerProps) {
  const subContext = React.useContext(SubMenuContext);

  return (
    <div
      data-slot="context-menu-sub-trigger"
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

type ContextMenuSubContentProps = React.ComponentProps<"div">;

function ContextMenuSubContent({
  className,
  children,
  ...props
}: ContextMenuSubContentProps) {
  const subContext = React.useContext(SubMenuContext);

  if (!subContext?.open) return null;

  return (
    <div
      data-slot="context-menu-sub-content"
      className={`${styles.subContent} ${className || ""}`}
      onMouseEnter={() => subContext?.setOpen(true)}
      onMouseLeave={() => subContext?.setOpen(false)}
      {...props}
    >
      {children}
    </div>
  );
}

type ContextMenuContentProps = React.ComponentProps<"div">;

function ContextMenuContent({
  className,
  children,
  ...props
}: ContextMenuContentProps) {
  const { open, setOpen, position } = useContextMenu();
  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(e.target as Node)
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
  }, [open, setOpen]);

  if (!open) return null;

  return (
    <div
      ref={contentRef}
      data-slot="context-menu-content"
      className={`${styles.content} ${className || ""}`}
      style={{
        position: "fixed",
        top: position.y,
        left: position.x,
        zIndex: 50,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

interface ContextMenuItemProps extends React.ComponentProps<"div"> {
  inset?: boolean;
  variant?: "default" | "destructive";
}

function ContextMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: ContextMenuItemProps) {
  const { setOpen } = useContextMenu();

  return (
    <div
      data-slot="context-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={`${styles.item} ${variant === "destructive" ? styles.destructive : ""} ${inset ? styles.inset : ""} ${className || ""}`}
      onClick={() => setOpen(false)}
      {...props}
    />
  );
}

interface ContextMenuCheckboxItemProps extends React.ComponentProps<"div"> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

function ContextMenuCheckboxItem({
  className,
  children,
  checked = false,
  onCheckedChange,
  ...props
}: ContextMenuCheckboxItemProps) {
  return (
    <div
      data-slot="context-menu-checkbox-item"
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

interface ContextMenuRadioItemProps extends React.ComponentProps<"div"> {
  value: string;
}

function ContextMenuRadioItem({
  className,
  children,
  value,
  ...props
}: ContextMenuRadioItemProps) {
  const radioContext = React.useContext(RadioGroupContext);
  const isSelected = radioContext?.value === value;

  return (
    <div
      data-slot="context-menu-radio-item"
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

interface ContextMenuLabelProps extends React.ComponentProps<"div"> {
  inset?: boolean;
}

function ContextMenuLabel({
  className,
  inset,
  ...props
}: ContextMenuLabelProps) {
  return (
    <div
      data-slot="context-menu-label"
      data-inset={inset}
      className={`${styles.label} ${inset ? styles.inset : ""} ${className || ""}`}
      {...props}
    />
  );
}

function ContextMenuSeparator({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="context-menu-separator"
      className={`${styles.separator} ${className || ""}`}
      {...props}
    />
  );
}

function ContextMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="context-menu-shortcut"
      className={`${styles.shortcut} ${className || ""}`}
      {...props}
    />
  );
}

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
};
