import {
  GraphQLBoolean,
  GraphQLEnumType,
  GraphQLInt,
  GraphQLInterfaceType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLSchema,
  GraphQLUnionType,
  type GraphQLArgument,
  type GraphQLField,
} from "graphql";
import { unwrapListType, unwrapNamedType } from "./type-utils.js";

export function validateRelaySchema(schema: GraphQLSchema) {
  validateRelayMutationInputName(schema);

  const connections = collectRelayConnections(schema);
  if (connections.size === 0) {
    return;
  }

  validateRelayPageInfo(schema);
  validateRelayArguments(schema, connections);
}

function collectRelayConnections(schema: GraphQLSchema): Map<
  string,
  {
    type: GraphQLObjectType;
    edgeType: GraphQLObjectType;
    cursorType: GraphQLScalarType;
  }
> {
  const connections = new Map<
    string,
    {
      type: GraphQLObjectType;
      edgeType: GraphQLObjectType;
      cursorType: GraphQLScalarType;
    }
  >();
  const typeMap = schema.getTypeMap();
  for (const [name, type] of Object.entries(typeMap)) {
    if (name.startsWith("__") || !name.endsWith("Connection")) {
      continue;
    }
    if (!(type instanceof GraphQLObjectType)) {
      throw new Error(`Connection type "${name}" must be an object type.`);
    }
    const fields = type.getFields();
    const edgesField = fields.edges;
    if (!edgesField) {
      throw new Error(
        `Connection type "${name}" must define an "edges" field.`,
      );
    }
    const edgesList = unwrapListType(edgesField.type);
    if (!edgesList) {
      throw new Error(
        `Connection type "${name}" field "edges" must return a list type that wraps an edge type.`,
      );
    }
    if (unwrapListType(edgesList.ofType)) {
      throw new Error(
        `Connection type "${name}" field "edges" must return a list type that wraps an edge type.`,
      );
    }
    const edgeNamed = unwrapNamedType(edgesList.ofType);
    if (!(edgeNamed instanceof GraphQLObjectType)) {
      throw new Error(
        `Connection type "${name}" field "edges" must return a list type that wraps an edge type.`,
      );
    }

    const pageInfoField = fields.pageInfo;
    if (!pageInfoField) {
      throw new Error(
        `Connection type "${name}" must define a "pageInfo" field.`,
      );
    }
    if (!(pageInfoField.type instanceof GraphQLNonNull)) {
      throw new Error(
        `Connection type "${name}" field "pageInfo" must return a non-null PageInfo object type.`,
      );
    }
    if (unwrapListType(pageInfoField.type)) {
      throw new Error(
        `Connection type "${name}" field "pageInfo" must return a non-null PageInfo object type.`,
      );
    }
    const pageInfoNamed = unwrapNamedType(pageInfoField.type);
    if (
      !(pageInfoNamed instanceof GraphQLObjectType) ||
      pageInfoNamed.name !== "PageInfo"
    ) {
      throw new Error(
        `Connection type "${name}" field "pageInfo" must return a non-null PageInfo object type.`,
      );
    }

    const cursorType = validateRelayEdgeType(edgeNamed);
    connections.set(name, { type, edgeType: edgeNamed, cursorType });
  }

  return connections;
}

function validateRelayEdgeType(edgeType: GraphQLObjectType): GraphQLScalarType {
  const fields = edgeType.getFields();
  const nodeField = fields.node;
  if (!nodeField) {
    throw new Error(`Edge type "${edgeType.name}" must define a "node" field.`);
  }
  if (unwrapListType(nodeField.type)) {
    throw new Error(
      `Edge type "${edgeType.name}" field "node" must not return a list type.`,
    );
  }
  const nodeNamed = unwrapNamedType(nodeField.type);
  if (
    !(
      nodeNamed instanceof GraphQLScalarType ||
      nodeNamed instanceof GraphQLEnumType ||
      nodeNamed instanceof GraphQLObjectType ||
      nodeNamed instanceof GraphQLInterfaceType ||
      nodeNamed instanceof GraphQLUnionType
    )
  ) {
    throw new Error(
      `Edge type "${edgeType.name}" field "node" must return an output type.`,
    );
  }

  const cursorField = fields.cursor;
  if (!cursorField) {
    throw new Error(
      `Edge type "${edgeType.name}" must define a "cursor" field.`,
    );
  }
  if (unwrapListType(cursorField.type)) {
    throw new Error(
      `Edge type "${edgeType.name}" field "cursor" must not return a list type.`,
    );
  }
  const cursorNamed = unwrapNamedType(cursorField.type);
  if (!(cursorNamed instanceof GraphQLScalarType)) {
    throw new Error(
      `Edge type "${edgeType.name}" field "cursor" must return a scalar type.`,
    );
  }
  return cursorNamed;
}

function validateRelayPageInfo(schema: GraphQLSchema) {
  const pageInfo = schema.getType("PageInfo");
  if (!pageInfo) {
    return;
  }
  if (!(pageInfo instanceof GraphQLObjectType)) {
    throw new Error(`PageInfo must be an object type.`);
  }
  const fields = pageInfo.getFields();
  validateNonNullBooleanField(
    pageInfo.name,
    "hasPreviousPage",
    fields.hasPreviousPage,
  );
  validateNonNullBooleanField(pageInfo.name, "hasNextPage", fields.hasNextPage);
  validateCursorScalarField(pageInfo.name, "startCursor", fields.startCursor);
  validateCursorScalarField(pageInfo.name, "endCursor", fields.endCursor);
}

function validateRelayArguments(
  schema: GraphQLSchema,
  connections: Map<
    string,
    {
      type: GraphQLObjectType;
      edgeType: GraphQLObjectType;
      cursorType: GraphQLScalarType;
    }
  >,
) {
  const typeMap = schema.getTypeMap();
  for (const [name, type] of Object.entries(typeMap)) {
    if (
      name.startsWith("__") ||
      !(
        type instanceof GraphQLObjectType ||
        type instanceof GraphQLInterfaceType
      )
    ) {
      continue;
    }
    const fields = type.getFields();
    for (const field of Object.values(fields) as GraphQLField<
      unknown,
      unknown
    >[]) {
      const namedReturnType = unwrapNamedType(field.type);
      if (
        !(namedReturnType instanceof GraphQLObjectType) ||
        !connections.has(namedReturnType.name)
      ) {
        continue;
      }
      const cursorType = connections.get(namedReturnType.name)?.cursorType;
      validateRelayConnectionArgs(type.name, field, cursorType);
    }
  }
}

function validateRelayConnectionArgs(
  parentType: string,
  field: GraphQLField<unknown, unknown>,
  cursorType: GraphQLScalarType | undefined,
) {
  const argsByName = new Map(field.args.map((arg) => [arg.name, arg] as const));
  const hasFirst = argsByName.has("first");
  const hasAfter = argsByName.has("after");
  const hasLast = argsByName.has("last");
  const hasBefore = argsByName.has("before");

  if (hasFirst !== hasAfter) {
    throw new Error(
      `Connection field "${parentType}.${field.name}" must define both "first" and "after" arguments.`,
    );
  }
  if (hasLast !== hasBefore) {
    throw new Error(
      `Connection field "${parentType}.${field.name}" must define both "last" and "before" arguments.`,
    );
  }

  const hasForward = hasFirst && hasAfter;
  const hasBackward = hasLast && hasBefore;
  if (!hasForward && !hasBackward) {
    throw new Error(
      `Connection field "${parentType}.${field.name}" must define forward pagination arguments ("first" and "after") or backward pagination arguments ("last" and "before").`,
    );
  }

  if (hasFirst) {
    validateIntArg(parentType, field.name, argsByName.get("first")!);
  }
  if (hasLast) {
    validateIntArg(parentType, field.name, argsByName.get("last")!);
  }
  if (hasAfter) {
    validateCursorArg(
      parentType,
      field.name,
      argsByName.get("after")!,
      cursorType,
    );
  }
  if (hasBefore) {
    validateCursorArg(
      parentType,
      field.name,
      argsByName.get("before")!,
      cursorType,
    );
  }
}

function validateIntArg(
  parentType: string,
  fieldName: string,
  arg: GraphQLArgument,
) {
  if (unwrapListType(arg.type)) {
    throw new Error(
      `Connection field "${parentType}.${fieldName}" argument "${arg.name}" must be an Int.`,
    );
  }
  const named = unwrapNamedType(arg.type);
  if (!(named instanceof GraphQLScalarType) || named.name !== GraphQLInt.name) {
    throw new Error(
      `Connection field "${parentType}.${fieldName}" argument "${arg.name}" must be an Int.`,
    );
  }
}

function validateCursorArg(
  parentType: string,
  fieldName: string,
  arg: GraphQLArgument,
  cursorType: GraphQLScalarType | undefined,
) {
  if (unwrapListType(arg.type)) {
    throw new Error(
      `Connection field "${parentType}.${fieldName}" argument "${arg.name}" must return the cursor type.`,
    );
  }
  const named = unwrapNamedType(arg.type);
  if (!(named instanceof GraphQLScalarType)) {
    throw new Error(
      `Connection field "${parentType}.${fieldName}" argument "${arg.name}" must return the cursor type.`,
    );
  }
  if (cursorType && named.name !== cursorType.name) {
    throw new Error(
      `Connection field "${parentType}.${fieldName}" argument "${arg.name}" must return the cursor type.`,
    );
  }
}

function validateNonNullBooleanField(
  typeName: string,
  fieldName: string,
  field: GraphQLField<unknown, unknown> | undefined,
) {
  if (!field) {
    throw new Error(
      `PageInfo must define "${typeName === "PageInfo" ? "" : `${typeName}.`}${fieldName}" fields.`,
    );
  }
  if (
    !(field.type instanceof GraphQLNonNull) ||
    unwrapNamedType(field.type).name !== GraphQLBoolean.name
  ) {
    throw new Error(
      `PageInfo field "${field.name}" must return a non-null Boolean.`,
    );
  }
}

function validateCursorScalarField(
  typeName: string,
  fieldName: string,
  field: GraphQLField<unknown, unknown> | undefined,
) {
  if (!field) {
    throw new Error(
      `PageInfo must define "${typeName === "PageInfo" ? "" : `${typeName}.`}${fieldName}" fields.`,
    );
  }
  if (unwrapListType(field.type)) {
    throw new Error(
      `PageInfo field "${field.name}" must return a scalar type.`,
    );
  }
  const named = unwrapNamedType(field.type);
  if (!(named instanceof GraphQLScalarType)) {
    throw new Error(
      `PageInfo field "${field.name}" must return a scalar type.`,
    );
  }
}

function validateRelayMutationInputName(schema: GraphQLSchema) {
  const mutation = schema.getMutationType();
  if (!mutation) {
    return;
  }
  const fields = mutation.getFields();
  for (const field of Object.values(fields) as GraphQLField<
    unknown,
    unknown
  >[]) {
    if (field.args.length === 0) {
      continue;
    }
    if (field.args.length !== 1 || field.args[0].name !== "input") {
      throw new Error(
        `Mutation field "${mutation.name}.${field.name}" must define a single "input" argument.`,
      );
    }
  }
}
