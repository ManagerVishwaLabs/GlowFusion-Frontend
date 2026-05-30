import * as React from "react";
import { Check, ChevronDown } from "../../icons";
import styles from "./Select.module.css";

interface SelectContextValue {
  value: string;
  onValueChange: (value: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

const SelectContext = React.createContext<SelectContextValue | null>(null);

function useSelect() {
  const context = React.useContext(SelectContext);

  if (!context) {
    throw new Error("Select components must be used within a Select");
  }

  return context;
}

interface SelectProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}

function Select({
  defaultValue = "",
  value: controlledValue,
  onValueChange,
  children,
}: SelectProps) {
  const [uncontrolledValue, setUncontrolledValue] =
    React.useState(defaultValue);

  const [open, setOpen] = React.useState(false);

  const triggerRef = React.useRef<HTMLButtonElement>(null);

  const isControlled = controlledValue !== undefined;

  const value = isControlled ? controlledValue : uncontrolledValue;

  const handleValueChange = React.useCallback(
    (newValue: string) => {
      if (!isControlled) {
        setUncontrolledValue(newValue);
      }

      onValueChange?.(newValue);
      setOpen(false);
    },
    [isControlled, onValueChange],
  );

  return (
    <SelectContext.Provider
      value={{
        value,
        onValueChange: handleValueChange,
        open,
        setOpen,
        triggerRef,
      }}
    >
      {children}
    </SelectContext.Provider>
  );
}

function SelectGroup({ children }: { children: React.ReactNode }) {
  return <div data-slot="select-group">{children}</div>;
}

interface SelectValueProps {
  placeholder?: string;
}

function SelectValue({ placeholder }: SelectValueProps) {
  const { value } = useSelect();

  return <span>{value || placeholder}</span>;
}

type SelectTriggerProps = React.ComponentProps<"button">;

function SelectTrigger({ className, children, ...props }: SelectTriggerProps) {
  const { open, setOpen, triggerRef } = useSelect();

  const combinedClassName = [styles.trigger, className]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      ref={triggerRef}
      type="button"
      role="combobox"
      aria-expanded={open}
      data-state={open ? "open" : "closed"}
      data-slot="select-trigger"
      className={combinedClassName}
      onClick={() => setOpen(!open)}
      {...props}
    >
      {children}

      <ChevronDown className={styles.triggerIcon} />
    </button>
  );
}

type SelectContentBaseProps = React.ComponentProps<"div">;

interface SelectContentProps extends SelectContentBaseProps {
  position?: "popper" | "item-aligned";
}

function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}: SelectContentProps) {
  const { open, setOpen, triggerRef } = useSelect();

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

  const combinedClassName = [
    styles.content,
    position === "popper" && styles.contentPopper,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={contentRef}
      data-state={open ? "open" : "closed"}
      data-slot="select-content"
      className={combinedClassName}
      {...props}
    >
      <div className={styles.viewport}>{children}</div>
    </div>
  );
}

type SelectLabelProps = React.ComponentProps<"div">;

function SelectLabel({ className, ...props }: SelectLabelProps) {
  const combinedClassName = [styles.label, className].filter(Boolean).join(" ");

  return (
    <div data-slot="select-label" className={combinedClassName} {...props} />
  );
}

interface SelectItemProps extends React.ComponentProps<"div"> {
  value: string;
}

function SelectItem({ className, children, value, ...props }: SelectItemProps) {
  const { value: selectedValue, onValueChange } = useSelect();

  const isSelected = selectedValue === value;

  const combinedClassName = [
    styles.item,
    isSelected ? styles.itemSelected : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      role="option"
      aria-selected={isSelected}
      data-state={isSelected ? "checked" : "unchecked"}
      data-slot="select-item"
      className={combinedClassName}
      onClick={() => onValueChange(value)}
      {...props}
    >
      <span className={styles.itemIndicator}>
        {isSelected && <Check className={styles.checkIcon} />}
      </span>

      <span>{children}</span>
    </div>
  );
}

type SelectSeparatorProps = React.ComponentProps<"div">;

function SelectSeparator({ className, ...props }: SelectSeparatorProps) {
  const combinedClassName = [styles.separator, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      data-slot="select-separator"
      className={combinedClassName}
      {...props}
    />
  );
}

function SelectScrollUpButton() {
  return null;
}

function SelectScrollDownButton() {
  return null;
}

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
