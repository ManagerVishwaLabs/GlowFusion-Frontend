

import * as React from "react";
import styles from "./HoverCard.module.css";

interface HoverCardContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLElement | null>;
}

const HoverCardContext = React.createContext<HoverCardContextValue | null>(null);

function useHoverCard() {
  const context = React.useContext(HoverCardContext);
  if (!context) {
    throw new Error("HoverCard components must be used within a HoverCard");
  }
  return context;
}

interface HoverCardProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  openDelay?: number;
  closeDelay?: number;
  children: React.ReactNode;
}

function HoverCard({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  openDelay = 200,
  closeDelay = 300,
  children,
}: HoverCardProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const triggerRef = React.useRef<HTMLElement>(null);
  const openTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = React.useCallback((value: boolean) => {
    if (openTimerRef.current) clearTimeout(openTimerRef.current);
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);

    const delay = value ? openDelay : closeDelay;
    const timer = value ? openTimerRef : closeTimerRef;

    timer.current = setTimeout(() => {
      if (!isControlled) {
        setUncontrolledOpen(value);
      }
      onOpenChange?.(value);
    }, delay);
  }, [isControlled, onOpenChange, openDelay, closeDelay]);

  React.useEffect(() => {
    return () => {
      if (openTimerRef.current) clearTimeout(openTimerRef.current);
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  return (
    <HoverCardContext.Provider value={{ open, setOpen, triggerRef }}>
      <div data-slot="hover-card" style={{ position: "relative", display: "inline-block" }}>
        {children}
      </div>
    </HoverCardContext.Provider>
  );
}

interface HoverCardTriggerProps extends React.ComponentProps<"span"> {
  asChild?: boolean;
}

function HoverCardTrigger({
  children,
  asChild,
  ...props
}: HoverCardTriggerProps) {
  const { setOpen, triggerRef } = useHoverCard();

  const handleMouseEnter = () => setOpen(true);
  const handleMouseLeave = () => setOpen(false);

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      ref: triggerRef,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    });
  }

  return (
    <span
      ref={triggerRef as React.RefObject<HTMLSpanElement>}
      data-slot="hover-card-trigger"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </span>
  );
}

interface HoverCardContentProps extends React.ComponentProps<"div"> {
  align?: "start" | "center" | "end";
  sideOffset?: number;
  side?: "top" | "right" | "bottom" | "left";
}

function HoverCardContent({
  className,
  align = "center",
  sideOffset = 4,
  side = "bottom",
  children,
  ...props
}: HoverCardContentProps) {
  const { open, setOpen } = useHoverCard();

  if (!open) return null;

  return (
    <div
      data-slot="hover-card-content"
      data-align={align}
      data-side={side}
      className={`${styles.content} ${className || ""}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
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

export { HoverCard, HoverCardTrigger, HoverCardContent };
