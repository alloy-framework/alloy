import type { Children } from "@alloy-js/core";
import { DirectiveLocation } from "graphql";
import {
  DirectiveTargetContext,
  TypeContext,
  createObjectTypeDefinition,
  registerType,
  useSchemaContext,
  type NameInput,
  type TypeReference,
} from "../schema.js";

export interface ObjectTypeProps {
  name: NameInput;
  description?: string;
  interfaces?: TypeReference[];
  children?: Children;
}

/**
 * Defines a GraphQL object type.
 *
 * @example Basic object type
 * ```tsx
 * <ObjectType name="User">
 *   <Field name="id" type={ID} nonNull />
 *   <Field name="name" type={String} />
 * </ObjectType>
 * ```
 *
 * @example Object type implementing interfaces
 * ```tsx
 * <ObjectType name="User" interfaces={["Node"]}>
 *   <Field name="id" type={ID} nonNull />
 * </ObjectType>
 * ```
 *
 * @example Transitive interface implementation
 * ```tsx
 * <>
 *   <InterfaceType name="Node">
 *     <Field name="id" type={ID} nonNull />
 *   </InterfaceType>
 *   <InterfaceType name="Resource" interfaces={["Node"]} />
 *   <ObjectType name="User" interfaces={["Resource"]}>
 *     <Field name="name" type={String} />
 *   </ObjectType>
 * </>
 * ```
 *
 * @remarks
 * When you pass `interfaces`, the interface fields are applied to the object
 * type automatically. Interfaces are applied transitively, so implementing
 * `Resource` also implements `Node`.
 */
export function ObjectType(props: ObjectTypeProps) {
  const state = useSchemaContext();
  const definition = createObjectTypeDefinition(
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
          location: DirectiveLocation.OBJECT,
          directives: definition.directives,
          target: definition,
        }}
      >
        {props.children}
      </DirectiveTargetContext.Provider>
    </TypeContext.Provider>
  );
}
