

import * as React from "react";
import styles from "./Tooltip.module.css";

interface TooltipContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLElement | null>;
}

const TooltipContext = React.createContext<TooltipContextValue | null>(null);

function useTooltip() {
  const context = React.useContext(TooltipContext);
  if (!context) {
    throw new Error("Tooltip components must be used within a Tooltip");
  }
  return context;
}

function TooltipProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

interface TooltipProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  delayDuration?: number;
  children: React.ReactNode;
}

function Tooltip({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  delayDuration = 200,
  children,
}: TooltipProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const triggerRef = React.useRef<HTMLElement>(null);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = React.useCallback((value: boolean) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (value) {
      timeoutRef.current = setTimeout(() => {
        if (!isControlled) {
          setUncontrolledOpen(true);
        }
        onOpenChange?.(true);
      }, delayDuration);
    } else {
      if (!isControlled) {
        setUncontrolledOpen(false);
      }
      onOpenChange?.(false);
    }
  }, [isControlled, onOpenChange, delayDuration]);

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <TooltipContext.Provider value={{ open, setOpen, triggerRef }}>
      {children}
    </TooltipContext.Provider>
  );
}

interface TooltipTriggerProps extends React.ComponentProps<"span"> {
  asChild?: boolean;
}

function TooltipTrigger({
  children,
  asChild,
  ...props
}: TooltipTriggerProps) {
  const { setOpen, triggerRef } = useTooltip();

  const handleMouseEnter = () => setOpen(true);
  const handleMouseLeave = () => setOpen(false);
  const handleFocus = () => setOpen(true);
  const handleBlur = () => setOpen(false);

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      ref: triggerRef,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onFocus: handleFocus,
      onBlur: handleBlur,
    });
  }

  return (
    <span
      ref={triggerRef as React.RefObject<HTMLSpanElement>}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...props}
    >
      {children}
    </span>
  );
}

interface TooltipContentProps extends React.ComponentProps<"div"> {
  sideOffset?: number;
  side?: "top" | "right" | "bottom" | "left";
}

function TooltipContent({
  className,
  sideOffset = 4,
  side = "top",
  children,
  ...props
}: TooltipContentProps) {
  const { open, triggerRef } = useTooltip();
  const [position, setPosition] = React.useState({ top: 0, left: 0 });

  React.useEffect(() => {
    if (open && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      let top = 0;
      let left = 0;

      switch (side) {
        case "top":
          top = rect.top - sideOffset;
          left = rect.left + rect.width / 2;
          break;
        case "bottom":
          top = rect.bottom + sideOffset;
          left = rect.left + rect.width / 2;
          break;
        case "left":
          top = rect.top + rect.height / 2;
          left = rect.left - sideOffset;
          break;
        case "right":
          top = rect.top + rect.height / 2;
          left = rect.right + sideOffset;
          break;
      }

      setPosition({ top, left });
    }
  }, [open, side, sideOffset, triggerRef]);

  if (!open) return null;

  const combinedClassName = [styles.content, styles[`side_${side}`], className]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      data-slot="tooltip-content"
      data-side={side}
      className={combinedClassName}
      style={{
        position: "fixed",
        top: position.top,
        left: position.left,
        transform: side === "top" 
          ? "translate(-50%, -100%)" 
          : side === "bottom"
            ? "translateX(-50%)"
            : side === "left"
              ? "translate(-100%, -50%)"
              : "translateY(-50%)",
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
