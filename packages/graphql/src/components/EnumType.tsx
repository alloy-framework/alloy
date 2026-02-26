import type { Children } from "@alloy-js/core";
import { DirectiveLocation } from "graphql";
import {
  DirectiveTargetContext,
  TypeContext,
  createEnumTypeDefinition,
  registerType,
  useSchemaContext,
  useTypeContext,
  type NameInput,
} from "../schema.js";

export interface EnumTypeProps {
  name: NameInput;
  description?: string;
  children?: Children;
}

function EnsureEnumValues() {
  const definition = useTypeContext();
  if (definition.kind !== "enum") {
    throw new Error("EnumType validation must be used within an EnumType.");
  }
  if (definition.values.length === 0) {
    throw new Error(`Enum "${definition.name}" must define values.`);
  }
  return undefined;
}

/**
 * Defines a GraphQL enum and registers it with the schema.
 *
 * @example Basic enum type
 * ```tsx
 * <EnumType name="Role">
 *   <EnumValue name="ADMIN" />
 *   <EnumValue name="USER" />
 * </EnumType>
 * ```
 *
 * @remarks
 * An enum must define at least one `EnumValue`.
 */
export function EnumType(props: EnumTypeProps) {
  const state = useSchemaContext();
  const definition = createEnumTypeDefinition(
    state,
    props.name,
    props.description,
  );
  registerType(state, definition);

  return (
    <TypeContext.Provider value={{ definition }}>
      <DirectiveTargetContext.Provider
        value={{
          location: DirectiveLocation.ENUM,
          directives: definition.directives,
          target: definition,
        }}
      >
        {props.children}
        <EnsureEnumValues />
      </DirectiveTargetContext.Provider>
    </TypeContext.Provider>
  );
}
