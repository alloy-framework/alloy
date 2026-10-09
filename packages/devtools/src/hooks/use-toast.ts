import { createContext, useContext } from "react";

export interface ToastMessage {
  id: string;
  title?: string;
  description?: string;
}

export interface ToastContextValue {
  toasts: ToastMessage[];
  toast: (message: Omit<ToastMessage, "id">) => void;
  dismiss: (id: string) => void;
}

export const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastStateProvider");
  }
  return context;
}
