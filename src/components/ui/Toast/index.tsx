import { useCallback, useMemo, useState } from "react";

import { ToastContext, type ToastItem } from "../../../hooks/toast/context";
import {
  CloseIcon,
  ErrorIcon,
  InfoIcon,
  SuccessIcon,
  WarningIcon,
} from "../../icons/";
import styles from "./Toast.module.css";

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (toast: Omit<ToastItem, "id">) => {
      const id = crypto?.randomUUID?.() ?? Math.random().toString(36);

      setToasts((prev) => [
        ...prev,
        {
          ...toast,
          duration: toast.duration ?? 30000,
          id,
        },
      ]);

      setTimeout(() => {
        removeToast(id);
      }, toast.duration ?? 30000);
    },
    [removeToast],
  );

  const value = useMemo(
    () => ({
      error: (message: string, options = {}) =>
        showToast({
          message,
          type: "error",
          ...options,
        }),

      info: (message: string, options = {}) =>
        showToast({
          message,
          type: "info",
          ...options,
        }),

      showToast,

      success: (message: string, options = {}) =>
        showToast({
          message,
          type: "success",
          ...options,
        }),

      warning: (message: string, options = {}) =>
        showToast({
          message,
          type: "warning",
          ...options,
        }),
    }),
    [showToast],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div className={styles.container}>
        {toasts.map((toast) => (
          <ToastCard
            key={toast.id}
            onClose={() => removeToast(toast.id)}
            toast={toast}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

const ICONS = {
  error: ErrorIcon,
  info: InfoIcon,
  success: SuccessIcon,
  warning: WarningIcon,
};

const ToastCard = ({
  onClose,
  toast,
}: {
  toast: ToastItem;
  onClose: () => void;
}) => {
  const Icon = ICONS[toast.type];

  const getStyle = () => {
    if (toast.type === "error") {
      return styles.error;
    }

    if (toast.type === "warning") {
      return styles.warning;
    }

    if (toast.type === "success") {
      return styles.success;
    }

    if (toast.type === "info") {
      return styles.info;
    }

    return styles.info;
  };

  return (
    <div className={`${styles.toast} ${getStyle()}`}>
      <div className={styles.icon}>
        <Icon />
      </div>

      <div className={styles.content}>
        {toast.title && <div className={styles.title}>{toast.title}</div>}

        <div className={styles.message}>{toast.message}</div>
      </div>

      <button className={styles.close} onClick={onClose}>
        <CloseIcon />
      </button>
    </div>
  );
};

export { ToastCard, ToastProvider };
