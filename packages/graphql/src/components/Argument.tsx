import type { Children } from "@alloy-js/core";
import { useDirectiveArgTargetContext } from "../schema.js";

export interface ArgumentProps {
  name: string;
  value: unknown;
}

/**
 * Adds an argument to the nearest `Directive` application.
 *
 * @example Directive argument
 * ```tsx
 * <Directive name="auth">
 *   <Argument name="role" value="admin" />
 * </Directive>
 * ```
 *
 * @remarks
 * This component must be used within a `Directive`.
 */
export function Argument(props: ArgumentProps): Children {
  const target = useDirectiveArgTargetContext();
  if (target.argNames.has(props.name)) {
    throw new Error(`Directive argument "${props.name}" is already defined.`);
  }
  target.argNames.add(props.name);
  target.args.push({ name: props.name, value: props.value });
  return undefined;
}
