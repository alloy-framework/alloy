import type { Children } from "@alloy-js/core";
import { DirectiveLocation } from "graphql";
import {
  DirectiveTargetContext,
  TypeContext,
  createInterfaceTypeDefinition,
  registerType,
  useSchemaContext,
  type NameInput,
  type TypeReference,
} from "../schema.js";

export interface InterfaceTypeProps {
  name: NameInput;
  description?: string;
  interfaces?: TypeReference[];
  children?: Children;
}

/**
 * Defines a GraphQL interface type.
 *
 * @example Basic interface type
 * ```tsx
 * <InterfaceType name="Node">
 *   <Field name="id" type={ID} nonNull />
 * </InterfaceType>
 * ```
 *
 * @example Interface implementing other interfaces
 * ```tsx
 * <InterfaceType name="Resource" interfaces={["Node"]}>
 *   <Field name="id" type={ID} nonNull />
 * </InterfaceType>
 * ```
 */
export function InterfaceType(props: InterfaceTypeProps) {
  const state = useSchemaContext();
  const definition = createInterfaceTypeDefinition(
    state,
    props.name,
    props.description,
    props.interfaces ?? [],
  );
  registerType(state, definition);

  return (
    <TypeContext.Provider value={{ definition }}>
      <DirectiveTargetContext.Provider
        value={{
          location: DirectiveLocation.INTERFACE,
          directives: definition.directives,
          target: definition,
        }}
      >
        {props.children}
      </DirectiveTargetContext.Provider>
    </TypeContext.Provider>
  );
}
