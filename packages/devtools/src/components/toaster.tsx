import {
  Toast,
  ToastDescription,
  ToastProvider,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";

export function Toaster() {
  const { toasts, dismiss } = useToast();
  return (
    <ToastProvider>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          onOpenChange={(open) => {
            if (!open) dismiss(toast.id);
          }}
        >
          {(toast.description ?? toast.title) && (
            <ToastDescription>
              {toast.description ?? toast.title}
            </ToastDescription>
          )}
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
}
