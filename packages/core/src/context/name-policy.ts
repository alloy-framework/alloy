import {
  ComponentContext,
  createNamedContext,
  useContext,
} from "../context.js";
import { NamePolicy } from "../name-policy.js";

export const NamePolicyContext: ComponentContext<NamePolicy<string>> =
  createNamedContext<NamePolicy<string>>("NamePolicy", {
    getName(name) {
      return name;
    },
  });

export function useNamePolicy() {
  return useContext(NamePolicyContext)!;
}
