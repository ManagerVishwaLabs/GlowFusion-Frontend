import * as React from "react";
import { X as XIcon } from "../../icons";
import styles from "./Dialog.module.css";

interface DialogContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DialogContext = React.createContext<DialogContextValue | null>(null);

function useDialog() {
  const context = React.useContext(DialogContext);

  if (!context) {
    throw new Error("Dialog components must be used within a Dialog");
  }

  return context;
}

interface DialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

function Dialog({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  children,
}: DialogProps) {
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
    <DialogContext.Provider value={{ open, setOpen }}>
      {children}
    </DialogContext.Provider>
  );
}

interface DialogTriggerProps extends React.ComponentProps<"button"> {
  asChild?: boolean;
}

function DialogTrigger({ children, asChild, ...props }: DialogTriggerProps) {
  const { setOpen } = useDialog();

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      onClick: (e: React.MouseEvent) => {
        (children as React.ReactElement<any>).props.onClick?.(e);

        setOpen(true);
      },
    });
  }

  return (
    <button
      type="button"
      data-slot="dialog-trigger"
      onClick={() => setOpen(true)}
      {...props}
    >
      {children}
    </button>
  );
}

function DialogPortal({ children }: { children: React.ReactNode }) {
  const { open } = useDialog();

  if (!open) return null;

  return <>{children}</>;
}

type DialogOverlayProps = React.HTMLAttributes<HTMLDivElement>;

function DialogOverlay({ className, ...props }: DialogOverlayProps) {
  const { setOpen } = useDialog();

  const combinedClassName = [styles.overlay, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      data-slot="dialog-overlay"
      className={combinedClassName}
      onClick={() => setOpen(false)}
      {...props}
    />
  );
}

type DialogContentProps = React.HTMLAttributes<HTMLDivElement>;

function DialogContent({ className, children, ...props }: DialogContentProps) {
  const { open, setOpen } = useDialog();

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

  const combinedClassName = [styles.content, className]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <DialogOverlay />

      <div
        data-slot="dialog-content"
        role="dialog"
        aria-modal="true"
        className={combinedClassName}
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

type DialogHeaderProps = React.HTMLAttributes<HTMLDivElement>;

function DialogHeader({ className, ...props }: DialogHeaderProps) {
  const combinedClassName = [styles.header, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div data-slot="dialog-header" className={combinedClassName} {...props} />
  );
}

type DialogFooterProps = React.HTMLAttributes<HTMLDivElement>;

function DialogFooter({ className, ...props }: DialogFooterProps) {
  const combinedClassName = [styles.footer, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div data-slot="dialog-footer" className={combinedClassName} {...props} />
  );
}

type DialogTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

function DialogTitle({ className, ...props }: DialogTitleProps) {
  const combinedClassName = [styles.title, className].filter(Boolean).join(" ");

  return (
    <h2 data-slot="dialog-title" className={combinedClassName} {...props} />
  );
}

type DialogDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

function DialogDescription({ className, ...props }: DialogDescriptionProps) {
  const combinedClassName = [styles.description, className]
    .filter(Boolean)
    .join(" ");

  return (
    <p
      data-slot="dialog-description"
      className={combinedClassName}
      {...props}
    />
  );
}

function DialogClose({ children, ...props }: React.ComponentProps<"button">) {
  const { setOpen } = useDialog();

  return (
    <button type="button" onClick={() => setOpen(false)} {...props}>
      {children}
    </button>
  );
}

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
