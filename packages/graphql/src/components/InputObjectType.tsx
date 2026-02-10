import type { Children } from "@alloy-js/core";
import { DirectiveLocation } from "graphql";
import {
  DirectiveTargetContext,
  TypeContext,
  createInputObjectTypeDefinition,
  registerType,
  useSchemaContext,
  useTypeContext,
  type NameInput,
} from "../schema.js";

export interface InputObjectTypeProps {
  name: NameInput;
  description?: string;
  oneOf?: boolean;
  children?: Children;
}

function EnsureInputFields() {
  const definition = useTypeContext();
  if (definition.kind !== "input") {
    throw new Error(
      "InputObjectType validation must be used within an InputObjectType.",
    );
  }
  if (definition.fields.length === 0) {
    throw new Error(`Input "${definition.name}" must define fields.`);
  }
  return undefined;
}

/**
 * Defines a GraphQL input object type.
 *
 * @example Basic input object
 * ```tsx
 * <InputObjectType name="UserFilter">
 *   <InputField name="name" type={String} />
 * </InputObjectType>
 * ```
 *
 * @example OneOf input object
 * ```tsx
 * <InputObjectType name="SearchFilter" oneOf>
 *   <InputField name="byName" type={String} />
 *   <InputField name="byId" type={ID} />
 * </InputObjectType>
 * ```
 *
 * @remarks
 * Set `oneOf` to true to create a GraphQL `@oneOf`-style input object.
 */
export function InputObjectType(props: InputObjectTypeProps) {
  const state = useSchemaContext();
  const definition = createInputObjectTypeDefinition(
    state,
    props.name,
    props.description,
    props.oneOf ?? false,
  );
  registerType(state, definition);

  return (
    <TypeContext.Provider value={{ definition }}>
      <DirectiveTargetContext.Provider
        value={{
          location: DirectiveLocation.INPUT_OBJECT,
          directives: definition.directives,
          target: definition,
        }}
      >
        {props.children}
        <EnsureInputFields />
      </DirectiveTargetContext.Provider>
    </TypeContext.Provider>
  );
}
