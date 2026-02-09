import type { DevtoolsAppState } from "@/hooks/devtools-app-state-context";
import { DevtoolsAppStateContext } from "@/hooks/devtools-app-state-context";
import type { ReactNode } from "react";

export interface DevtoolsAppStateProviderProps {
  value: DevtoolsAppState;
  children: ReactNode;
}

export function DevtoolsAppStateProvider({
  value,
  children,
}: DevtoolsAppStateProviderProps) {
  return (
    <DevtoolsAppStateContext.Provider value={value}>
      {children}
    </DevtoolsAppStateContext.Provider>
  );
}
