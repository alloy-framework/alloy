import type { Children } from "@alloy-js/core";
import { DirectiveLocation } from "graphql";
import {
  DirectiveTargetContext,
  TypeContext,
  addUnionMemberToType,
  createUnionMemberDefinition,
  createUnionTypeDefinition,
  registerType,
  useSchemaContext,
  useTypeContext,
  type NameInput,
  type TypeReference,
} from "../schema.js";

export interface UnionTypeProps {
  name: NameInput;
  description?: string;
  members?: TypeReference[];
  children?: Children;
}

function EnsureUnionMembers() {
  const definition = useTypeContext();
  if (definition.kind !== "union") {
    throw new Error("UnionType validation must be used within a UnionType.");
  }
  if (definition.members.length === 0) {
    throw new Error(`Union "${definition.name}" must define members.`);
  }
  return undefined;
}

/**
 * Defines a GraphQL union type.
 *
 * @example Members array
 * ```tsx
 * <UnionType name="SearchResult" members={[User, Post]} />
 * ```
 *
 * @example With explicit members
 * ```tsx
 * <UnionType name="SearchResult">
 *   <UnionMember type={User} />
 *   <UnionMember type={Post} />
 * </UnionType>
 * ```
 *
 * @remarks
 * A union must define at least one member type.
 */
export function UnionType(props: UnionTypeProps) {
  const state = useSchemaContext();
  const definition = createUnionTypeDefinition(
    state,
    props.name,
    props.description,
  );
  registerType(state, definition);

  if (props.members) {
    for (const member of props.members) {
      addUnionMemberToType(
        state,
        definition,
        createUnionMemberDefinition(member),
      );
    }
  }

  return (
    <TypeContext.Provider value={{ definition }}>
      <DirectiveTargetContext.Provider
        value={{
          location: DirectiveLocation.UNION,
          directives: definition.directives,
          target: definition,
        }}
      >
        {props.children}
        <EnsureUnionMembers />
      </DirectiveTargetContext.Provider>
    </TypeContext.Provider>
  );
}
