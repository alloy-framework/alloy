import {
  addUnionMemberToType,
  createUnionMemberDefinition,
  useSchemaContext,
  useTypeContext,
  type TypeReference,
} from "../schema.js";

export interface UnionMemberProps {
  type: TypeReference;
}

/**
 * Registers a union member on the nearest `UnionType`.
 *
 * @example Explicit union member
 * ```tsx
 * <UnionType name="SearchResult">
 *   <UnionMember type={User} />
 * </UnionType>
 * ```
 *
 * @remarks
 * This component must be used within a `UnionType`.
 */
export function UnionMember(props: UnionMemberProps) {
  const state = useSchemaContext();
  const typeDefinition = useTypeContext();
  if (typeDefinition.kind !== "union") {
    throw new Error("UnionMember must be used within a UnionType.");
  }

  addUnionMemberToType(
    state,
    typeDefinition,
    createUnionMemberDefinition(props.type),
  );
  return undefined;
}
