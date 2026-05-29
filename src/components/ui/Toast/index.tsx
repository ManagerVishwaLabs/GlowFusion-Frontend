import * as React from "react";
import { X } from "../../icons";
import styles from "./Toast.module.css";

interface ToastContextValue {
  onClose?: () => void;
}

const ToastContext = React.createContext<ToastContextValue>({});

function ToastProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

interface ToastViewportProps extends React.ComponentProps<"div"> {}

function ToastViewport({ className, ...props }: ToastViewportProps) {
  return (
    <div
      data-slot="toast-viewport"
      className={`${styles.viewport} ${className || ""}`}
      {...props}
    />
  );
}

type ToastVariant = "default" | "destructive";

interface ToastProps extends React.ComponentProps<"div"> {
  variant?: ToastVariant;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  duration?: number;
}

function Toast({
  className,
  variant = "default",
  open = true,
  onOpenChange,
  duration = 5000,
  children,
  ...props
}: ToastProps) {
  React.useEffect(() => {
    if (open && duration > 0) {
      const timer = setTimeout(() => {
        onOpenChange?.(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [open, duration, onOpenChange]);

  if (!open) return null;

  return (
    <ToastContext.Provider value={{ onClose: () => onOpenChange?.(false) }}>
      <div
        data-slot="toast"
        data-variant={variant}
        role="alert"
        className={`${styles.toast} ${variant === "destructive" ? styles.destructive : ""} ${className || ""}`}
        {...props}
      >
        {children}
      </div>
    </ToastContext.Provider>
  );
}

interface ToastActionProps extends React.ComponentProps<"button"> {
  altText?: string;
}

function ToastAction({ className, altText, ...props }: ToastActionProps) {
  return (
    <button
      type="button"
      data-slot="toast-action"
      className={`${styles.action} ${className || ""}`}
      {...props}
    />
  );
}

interface ToastCloseProps extends React.ComponentProps<"button"> {}

function ToastClose({ className, ...props }: ToastCloseProps) {
  const { onClose } = React.useContext(ToastContext);

  return (
    <button
      type="button"
      data-slot="toast-close"
      className={`${styles.close} ${className || ""}`}
      onClick={onClose}
      {...props}
    >
      <X className={styles.closeIcon} />
    </button>
  );
}

interface ToastTitleProps extends React.ComponentProps<"div"> {}

function ToastTitle({ className, ...props }: ToastTitleProps) {
  return (
    <div
      data-slot="toast-title"
      className={`${styles.title} ${className || ""}`}
      {...props}
    />
  );
}

interface ToastDescriptionProps extends React.ComponentProps<"div"> {}

function ToastDescription({ className, ...props }: ToastDescriptionProps) {
  return (
    <div
      data-slot="toast-description"
      className={`${styles.description} ${className || ""}`}
      {...props}
    />
  );
}

type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
};
