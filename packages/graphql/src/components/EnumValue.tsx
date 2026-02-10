import type { Children } from "@alloy-js/core";
import { DirectiveLocation } from "graphql";
import {
  DirectiveTargetContext,
  addEnumValueToType,
  createEnumValueDefinition,
  resolveDeprecationReason,
  useSchemaContext,
  useTypeContext,
  type DeprecatedProps,
  type NameInput,
} from "../schema.js";

export interface EnumValueProps extends DeprecatedProps {
  name: NameInput;
  description?: string;
  children?: Children;
}

/**
 * Adds a value to the nearest `EnumType`.
 *
 * @example Enum value
 * ```tsx
 * <EnumType name="Role">
 *   <EnumValue name="ADMIN" />
 * </EnumType>
 * ```
 *
 * @example Deprecated enum value
 * ```tsx
 * <EnumType name="Role">
 *   <EnumValue
 *     name="LEGACY"
 *     deprecationReason="Use MEMBER instead."
 *   />
 * </EnumType>
 * ```
 *
 * @remarks
 * This component must be used within an `EnumType`.
 */
export function EnumValue(props: EnumValueProps) {
  const state = useSchemaContext();
  const typeDefinition = useTypeContext();
  if (typeDefinition.kind !== "enum") {
    throw new Error("EnumValue must be used within an EnumType.");
  }

  const value = createEnumValueDefinition(
    state,
    props.name,
    props.description,
    resolveDeprecationReason(props),
  );
  addEnumValueToType(typeDefinition, value);
  return (
    <DirectiveTargetContext.Provider
      value={{
        location: DirectiveLocation.ENUM_VALUE,
        directives: value.directives,
        target: value,
      }}
    >
      {props.children}
    </DirectiveTargetContext.Provider>
  );
}
