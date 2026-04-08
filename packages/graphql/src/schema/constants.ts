import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  specifiedScalarTypes,
  type GraphQLScalarType,
} from "graphql";

export const GRAPHQL_NAME_REGEX = /^[_A-Za-z][_0-9A-Za-z]*$/;

export const builtInScalars = new Map<string, GraphQLScalarType>(
  specifiedScalarTypes.map((type) => [type.name, type] as const),
);

export const builtInScalarsFallback = new Map<string, GraphQLScalarType>([
  [GraphQLString.name, GraphQLString],
  [GraphQLBoolean.name, GraphQLBoolean],
  [GraphQLInt.name, GraphQLInt],
  [GraphQLFloat.name, GraphQLFloat],
  [GraphQLID.name, GraphQLID],
]);
