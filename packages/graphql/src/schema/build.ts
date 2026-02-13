import {
  DirectiveLocation,
  GraphQLObjectType,
  GraphQLSchema,
  assertValidSchema,
} from "graphql";
import { isRelayNamePolicy } from "../name-policy.js";
import {
  buildAppliedDirectiveNodes,
  createSchemaDefinitionNode,
} from "./build/ast.js";
import type { BuildContext } from "./build/context.js";
import {
  attachDirectiveDefinitionAstNodes,
  attachTypeDirectiveAstNodes,
  buildDirectiveMap,
} from "./build/directives.js";
import { normalizeTypeRef, resolveNamedType } from "./build/types.js";
import { validateRelaySchema } from "./relay-validation.js";
import type { SchemaState } from "./types.js";

/**
 * Builds a `GraphQLSchema` from a schema state.
 *
 * @remarks
 * Use `renderSchema` for the typical component-driven workflow.
 */
export function buildSchema(
  state: SchemaState,
  validate: boolean,
): GraphQLSchema {
  const context: BuildContext = {
    namedTypes: new Map(),
  };

  const directiveMap = buildDirectiveMap(state, context);
  context.directiveMap = directiveMap;

  for (const [name] of state.types) {
    resolveNamedType(state, context, name);
  }

  const queryRef =
    state.schema.query ?? (state.types.has("Query") ? "Query" : undefined);
  if (!queryRef) {
    throw new Error("A query root type is required.");
  }

  const queryType = normalizeTypeRef(state, context, queryRef);
  if (!(queryType instanceof GraphQLObjectType)) {
    throw new Error("Query root type must be an object type.");
  }

  const mutationType =
    state.schema.mutation ?
      normalizeTypeRef(state, context, state.schema.mutation)
    : undefined;
  if (mutationType && !(mutationType instanceof GraphQLObjectType)) {
    throw new Error("Mutation root type must be an object type.");
  }

  const subscriptionType =
    state.schema.subscription ?
      normalizeTypeRef(state, context, state.schema.subscription)
    : undefined;
  if (subscriptionType && !(subscriptionType instanceof GraphQLObjectType)) {
    throw new Error("Subscription root type must be an object type.");
  }

  const rootNames = new Set<string>();
  rootNames.add(queryType.name);
  if (mutationType) {
    if (rootNames.has(mutationType.name)) {
      throw new Error("Root types must be distinct.");
    }
    rootNames.add(mutationType.name);
  }
  if (subscriptionType) {
    if (rootNames.has(subscriptionType.name)) {
      throw new Error("Root types must be distinct.");
    }
    rootNames.add(subscriptionType.name);
  }

  attachDirectiveDefinitionAstNodes(state, context);
  attachTypeDirectiveAstNodes(state, context);

  const schemaDirectives = buildAppliedDirectiveNodes(
    directiveMap,
    state.schemaDirectives,
    DirectiveLocation.SCHEMA,
    "schema",
  );
  const schemaAstNode =
    schemaDirectives && schemaDirectives.length > 0 ?
      createSchemaDefinitionNode(schemaDirectives, {
        query: queryType,
        mutation: mutationType,
        subscription: subscriptionType,
      })
    : undefined;

  const schema = new GraphQLSchema({
    query: queryType,
    mutation: mutationType as GraphQLObjectType | undefined,
    subscription: subscriptionType as GraphQLObjectType | undefined,
    types: Array.from(context.namedTypes.values()),
    directives: Array.from(directiveMap.values()),
    description: state.description,
    astNode: schemaAstNode,
  });

  if (validate) {
    assertValidSchema(schema);
    if (isRelayNamePolicy(state.namePolicy)) {
      validateRelaySchema(schema);
    }
  }

  return schema;
}
