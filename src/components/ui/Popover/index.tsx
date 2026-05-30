

import * as React from "react";
import styles from "./Popover.module.css";

interface PopoverContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

const PopoverContext = React.createContext<PopoverContextValue | null>(null);

function usePopover() {
  const context = React.useContext(PopoverContext);
  if (!context) {
    throw new Error("Popover components must be used within a Popover");
  }
  return context;
}

interface PopoverProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

function Popover({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  children,
}: PopoverProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = React.useCallback((value: boolean) => {
    if (!isControlled) {
      setUncontrolledOpen(value);
    }
    onOpenChange?.(value);
  }, [isControlled, onOpenChange]);

  return (
    <PopoverContext.Provider value={{ open, setOpen, triggerRef }}>
      <div data-slot="popover" style={{ position: "relative", display: "inline-block" }}>
        {children}
      </div>
    </PopoverContext.Provider>
  );
}

interface PopoverTriggerProps extends React.ComponentProps<"button"> {
  asChild?: boolean;
}

function PopoverTrigger({
  children,
  asChild,
  ...props
}: PopoverTriggerProps) {
  const { open, setOpen, triggerRef } = usePopover();

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      ref: triggerRef,
      onClick: (e: React.MouseEvent) => {
        (children as React.ReactElement<any>).props.onClick?.(e);
        setOpen(!open);
      },
    });
  }

  return (
    <button
      ref={triggerRef}
      type="button"
      data-slot="popover-trigger"
      onClick={() => setOpen(!open)}
      {...props}
    >
      {children}
    </button>
  );
}

interface PopoverContentProps extends React.ComponentProps<"div"> {
  align?: "start" | "center" | "end";
  sideOffset?: number;
  side?: "top" | "right" | "bottom" | "left";
}

function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  side = "bottom",
  children,
  ...props
}: PopoverContentProps) {
  const { open, setOpen, triggerRef } = usePopover();
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
      data-slot="popover-content"
      data-align={align}
      data-side={side}
      className={`${styles.content} ${className || ""}`}
      style={{
        position: "absolute",
        [side === "top" ? "bottom" : side === "bottom" ? "top" : side === "left" ? "right" : "left"]: `calc(100% + ${sideOffset}px)`,
        ...(side === "top" || side === "bottom" 
          ? { left: align === "start" ? 0 : align === "end" ? "auto" : "50%", right: align === "end" ? 0 : "auto", transform: align === "center" ? "translateX(-50%)" : undefined }
          : { top: align === "start" ? 0 : align === "end" ? "auto" : "50%", bottom: align === "end" ? 0 : "auto", transform: align === "center" ? "translateY(-50%)" : undefined }
        ),
      }}
      {...props}
    >
      {children}
    </div>
  );
}

function PopoverAnchor({ children }: { children: React.ReactNode }) {
  return <span data-slot="popover-anchor">{children}</span>;
}

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
