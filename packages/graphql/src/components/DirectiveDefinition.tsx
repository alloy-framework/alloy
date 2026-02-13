import type { Children } from "@alloy-js/core";
import type { DirectiveLocation } from "graphql";
import {
  ArgTargetContext,
  normalizeDirectiveDefinition,
  registerDirective,
  useSchemaContext,
  type NameInput,
} from "../schema.js";

export interface DirectiveDefinitionProps {
  name: NameInput;
  locations: (DirectiveLocation | string)[];
  repeatable?: boolean;
  description?: string;
  children?: Children;
}

/**
 * Defines a directive and its arguments.
 *
 * @example Directive with arguments
 * ```tsx
 * <DirectiveDefinition name="auth" locations={["FIELD_DEFINITION"]}>
 *   <InputValue name="role" type={String} />
 * </DirectiveDefinition>
 * ```
 *
 * @example Repeatable directive
 * ```tsx
 * <DirectiveDefinition
 *   name="tag"
 *   repeatable
 *   locations={["FIELD_DEFINITION", "OBJECT"]}
 * >
 *   <InputValue name="name" type={String} nonNull />
 * </DirectiveDefinition>
 * ```
 */
export function DirectiveDefinition(props: DirectiveDefinitionProps) {
  const state = useSchemaContext();
  const definition = normalizeDirectiveDefinition(
    state,
    props.name,
    props.locations,
    props.repeatable ?? false,
    props.description,
  );
  registerDirective(state, definition);

  return (
    <ArgTargetContext.Provider
      value={{ args: definition.args, argNames: definition.argNames }}
    >
      {props.children}
    </ArgTargetContext.Provider>
  );
}
