import {
  createContext,
  useContext,
  type ComponentContext,
} from "@alloy-js/core";

export interface SectionContext {
  level: number;
}
export const SectionContext: ComponentContext<SectionContext> = createContext({
  level: 1,
});
export function useSectionContext() {
  return useContext(SectionContext)!;
}
