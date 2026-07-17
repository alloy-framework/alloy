import { createContext, useContext } from "react";

import { useDevtoolsAppState } from "@/hooks/use-devtools-app-state";

export type DevtoolsAppState = ReturnType<typeof useDevtoolsAppState>;

export const DevtoolsAppStateContext = createContext<DevtoolsAppState | null>(
  null,
);

export function useDevtoolsAppStateContext() {
  const context = useContext(DevtoolsAppStateContext);
  if (!context) {
    throw new Error("useDevtoolsAppStateContext must be used within provider");
  }
  return context;
}
