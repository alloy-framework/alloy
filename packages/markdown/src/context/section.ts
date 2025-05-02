import { ComponentContext, createContext, useContext } from "@alloy-js/core";

export interface SectionContext {
  level: number;
}

export const SectionContext: ComponentContext<SectionContext> =
  createContext<SectionContext>({ level: 1 });

export function useSectionContext(): SectionContext {
  const context = useContext(SectionContext);

  if (context === undefined) {
    throw new Error("useSectionContext must be used within a Section");
  }
  return context;
}
