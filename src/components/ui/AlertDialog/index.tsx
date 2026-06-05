import * as React from "react";
import styles from "./AlertDialog.module.css";

interface AlertDialogContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const AlertDialogContext = React.createContext<AlertDialogContextValue | null>(
  null,
);

function useAlertDialog() {
  const context = React.useContext(AlertDialogContext);
  if (!context) {
    throw new Error(
      "AlertDialog components must be used within an AlertDialog",
    );
  }
  return context;
}

interface AlertDialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

function AlertDialog({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  children,
}: AlertDialogProps) {
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
    <AlertDialogContext.Provider value={{ open, setOpen }}>
      {children}
    </AlertDialogContext.Provider>
  );
}

interface AlertDialogTriggerProps extends React.ComponentProps<"button"> {
  asChild?: boolean;
}

function AlertDialogTrigger({
  children,
  asChild,
  ...props
}: AlertDialogTriggerProps) {
  const { setOpen } = useAlertDialog();

  type ChildProps = {
    onClick?: (e: React.MouseEvent) => void;
  };

  if (asChild && React.isValidElement<ChildProps>(children)) {
    return React.cloneElement(children, {
      onClick: (e: React.MouseEvent) => {
        children.props.onClick?.(e);
        setOpen(true);
      },
    });
  }

  return (
    <button
      type="button"
      data-slot="alert-dialog-trigger"
      onClick={() => setOpen(true)}
      {...props}
    >
      {children}
    </button>
  );
}

function AlertDialogPortal({ children }: { children: React.ReactNode }) {
  const { open } = useAlertDialog();

  if (!open) return null;

  return <>{children}</>;
}

type AlertDialogOverlayProps = React.ComponentProps<"div">;

function AlertDialogOverlay({ className, ...props }: AlertDialogOverlayProps) {
  const { setOpen } = useAlertDialog();

  return (
    <div
      data-slot="alert-dialog-overlay"
      className={`${styles.overlay} ${className || ""}`}
      onClick={() => setOpen(false)}
      {...props}
    />
  );
}

type AlertDialogContentProps = React.ComponentProps<"div">;

function AlertDialogContent({
  className,
  children,
  ...props
}: AlertDialogContentProps) {
  const { open, setOpen } = useAlertDialog();

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
      <AlertDialogOverlay />
      <div
        data-slot="alert-dialog-content"
        role="alertdialog"
        aria-modal="true"
        className={`${styles.content} ${className || ""}`}
        {...props}
      >
        {children}
      </div>
    </>
  );
}

type AlertDialogHeaderProps = React.ComponentProps<"div">;

function AlertDialogHeader({ className, ...props }: AlertDialogHeaderProps) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={`${styles.header} ${className || ""}`}
      {...props}
    />
  );
}

type AlertDialogFooterProps = React.ComponentProps<"div">;

function AlertDialogFooter({ className, ...props }: AlertDialogFooterProps) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={`${styles.footer} ${className || ""}`}
      {...props}
    />
  );
}

type AlertDialogTitleProps = React.ComponentProps<"h2">;

function AlertDialogTitle({ className, ...props }: AlertDialogTitleProps) {
  return (
    <h2
      data-slot="alert-dialog-title"
      className={`${styles.title} ${className || ""}`}
      {...props}
    />
  );
}

type AlertDialogDescriptionProps = React.ComponentProps<"p">;

function AlertDialogDescription({
  className,
  ...props
}: AlertDialogDescriptionProps) {
  return (
    <p
      data-slot="alert-dialog-description"
      className={`${styles.description} ${className || ""}`}
      {...props}
    />
  );
}

type AlertDialogActionProps = React.ComponentProps<"button">;

function AlertDialogAction({
  className,
  onClick,
  ...props
}: AlertDialogActionProps) {
  const { setOpen } = useAlertDialog();

  return (
    <button
      type="button"
      className={`${styles.action} ${className || ""}`}
      onClick={(e) => {
        onClick?.(e);
        setOpen(false);
      }}
      {...props}
    />
  );
}

type AlertDialogCancelProps = React.ComponentProps<"button">;

function AlertDialogCancel({
  className,
  onClick,
  ...props
}: AlertDialogCancelProps) {
  const { setOpen } = useAlertDialog();

  return (
    <button
      type="button"
      className={`${styles.cancel} ${className || ""}`}
      onClick={(e) => {
        onClick?.(e);
        setOpen(false);
      }}
      {...props}
    />
  );
}

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
