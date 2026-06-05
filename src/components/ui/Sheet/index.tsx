import * as React from "react";
import { X as XIcon } from "../../icons";
import styles from "./Sheet.module.css";

interface SheetContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SheetContext = React.createContext<SheetContextValue | null>(null);

function useSheet() {
  const context = React.useContext(SheetContext);
  if (!context) {
    throw new Error("Sheet components must be used within a Sheet");
  }
  return context;
}

interface SheetProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

function Sheet({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  children,
}: SheetProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
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
    <SheetContext.Provider value={{ open, setOpen }}>
      <div data-slot="sheet">{children}</div>
    </SheetContext.Provider>
  );
}

interface SheetTriggerProps extends React.ComponentProps<"button"> {
  asChild?: boolean;
}

function SheetTrigger({ children, asChild, ...props }: SheetTriggerProps) {
  const { setOpen } = useSheet();

  type ChildProps = {
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    [key: string]: unknown;
  };

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<ChildProps>;

    return React.cloneElement(child, {
      onClick: (e: React.MouseEvent<HTMLElement>) => {
        child.props.onClick?.(e);
        setOpen(true);
      },
    });
  }

  return (
    <button
      type="button"
      data-slot="sheet-trigger"
      onClick={() => setOpen(true)}
      {...props}
    >
      {children}
    </button>
  );
}

function SheetClose({ children, ...props }: React.ComponentProps<"button">) {
  const { setOpen } = useSheet();

  return (
    <button
      type="button"
      data-slot="sheet-close"
      onClick={() => setOpen(false)}
      {...props}
    >
      {children}
    </button>
  );
}

type SheetPortalProps = {
  children: React.ReactNode;
};

const SheetPortal = React.memo(function SheetPortal({
  children,
}: SheetPortalProps): React.JSX.Element | null {
  const { open } = useSheet();

  if (!open) {
    return null;
  }

  return <>{children}</>;
});

SheetPortal.displayName = "SheetPortal";

function SheetOverlay({ className, ...props }: React.ComponentProps<"div">) {
  const { setOpen } = useSheet();

  return (
    <div
      data-slot="sheet-overlay"
      className={`${styles.overlay} ${className || ""}`}
      onClick={() => setOpen(false)}
      {...props}
    />
  );
}

interface SheetContentProps extends React.ComponentProps<"div"> {
  side?: "top" | "right" | "bottom" | "left";
}

function SheetContent({
  className,
  children,
  side = "right",
  ...props
}: SheetContentProps) {
  const { open, setOpen } = useSheet();

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open, setOpen]);

  if (!open) return null;

  return (
    <>
      <SheetOverlay />
      <div
        data-slot="sheet-content"
        data-side={side}
        role="dialog"
        aria-modal="true"
        className={`${styles.content} ${styles[side]} ${className || ""}`}
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        {children}
        <button
          type="button"
          className={styles.closeButton}
          onClick={() => setOpen(false)}
          aria-label="Close"
        >
          <XIcon className={styles.closeIcon} />
          <span className={styles.srOnly}>Close</span>
        </button>
      </div>
    </>
  );
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={`${styles.header} ${className || ""}`}
      {...props}
    />
  );
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={`${styles.footer} ${className || ""}`}
      {...props}
    />
  );
}

function SheetTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="sheet-title"
      className={`${styles.title} ${className || ""}`}
      {...props}
    />
  );
}

function SheetDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="sheet-description"
      className={`${styles.description} ${className || ""}`}
      {...props}
    />
  );
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
