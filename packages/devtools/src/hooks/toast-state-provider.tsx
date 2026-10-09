import { useCallback, useMemo, useState } from "react";

import { ToastContext, type ToastMessage } from "@/hooks/use-toast";

export interface ToastStateProviderProps {
  children: React.ReactNode;
}

export function ToastStateProvider({ children }: ToastStateProviderProps) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const toast = useCallback((message: Omit<ToastMessage, "id">) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    setToasts((prev) => [...prev, { id, ...message }]);
  }, []);

  const value = useMemo(
    () => ({ toasts, toast, dismiss }),
    [toasts, toast, dismiss],
  );

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}
