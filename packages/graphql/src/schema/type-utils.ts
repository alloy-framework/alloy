import {
  GraphQLList,
  GraphQLNamedType,
  GraphQLNonNull,
  type GraphQLType,
} from "graphql";

export function unwrapListType(
  type: GraphQLType,
): GraphQLList<GraphQLType> | null {
  const unwrapped = type instanceof GraphQLNonNull ? type.ofType : type;
  return unwrapped instanceof GraphQLList ? unwrapped : null;
}

export function unwrapNamedType(type: GraphQLType): GraphQLNamedType {
  let current: GraphQLType = type;
  while (current instanceof GraphQLNonNull || current instanceof GraphQLList) {
    current = current.ofType;
  }
  return current as GraphQLNamedType;
}
