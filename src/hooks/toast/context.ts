import { createContext } from "react";

type ToastType = "success" | "error" | "warning" | "info";

interface ToastItem {
  id: string;
  title?: string;
  message: string;
  type: ToastType;
  duration?: number;
}

type ToastOptions = {
  title?: string;
  duration?: number;
};

interface ToastContextType {
  showToast: (toast: Omit<ToastItem, "id">) => void;
  success: (message: string, options?: ToastOptions) => void;
  error: (message: string, options?: ToastOptions) => void;
  warning: (message: string, options?: ToastOptions) => void;
  info: (message: string, options?: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export { ToastContext };
export type { ToastItem, ToastOptions, ToastType };
