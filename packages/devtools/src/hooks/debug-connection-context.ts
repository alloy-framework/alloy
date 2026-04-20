import type { DebugConnectionState } from "@/hooks/use-debug-connection";
import { createContext, useContext } from "react";

export const DebugConnectionContext =
  createContext<DebugConnectionState | null>(null);

export function useDebugConnectionContext() {
  const context = useContext(DebugConnectionContext);
  if (!context) {
    throw new Error(
      "useDebugConnectionContext must be used within DebugConnectionContext.Provider",
    );
  }
  return context;
}
