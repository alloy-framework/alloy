import type { Children } from "@alloy-js/core";
import { useSchemaContext } from "../schema.js";

export interface RootTypeProps {
  description?: string;
  children?: Children;
}

export function useRootType(
  kind: "query" | "mutation" | "subscription",
  name: string,
) {
  const state = useSchemaContext();
  if (state.schema[kind] !== undefined) {
    throw new Error(
      `${name} cannot be used when a ${kind} root type is already specified. Remove the ${kind} option or the <${name}> component.`,
    );
  }
  state.schema[kind] = name;
}
