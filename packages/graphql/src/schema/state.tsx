import { createContext, useContext } from "@alloy-js/core";
import { DirectiveLocation } from "graphql";
import {
  createGraphQLNamePolicy,
  defaultNamePolicy,
  isGraphQLNamePolicy,
} from "../name-policy.js";
import type {
  ArgTargetContextValue,
  DirectiveArgTargetContextValue,
  DirectiveTargetContextValue,
  SchemaDirectiveTarget,
  SchemaOptions,
  SchemaProps,
  SchemaState,
  TypeDefinition,
} from "./types.js";

type SchemaInternalProps = SchemaProps & { _state?: SchemaState };

interface TypeContextValue {
  definition: TypeDefinition;
}

/**
 * Context for the active GraphQL schema state.
 */
export const SchemaContext = createContext<SchemaState>();

/**
 * Accesses the active `Schema` state.
 *
 * @remarks
 * Throws if used outside of a `Schema` component.
 */
export function useSchemaContext(): SchemaState {
  const context = useContext(SchemaContext);
  if (!context) {
    throw new Error("GraphQL components must be used within <Schema>.");
  }
  return context;
}

/**
 * Context for the current type definition.
 */
export const TypeContext = createContext<TypeContextValue>();
/**
 * Context for the current input value target (field or directive definition).
 */
export const ArgTargetContext = createContext<ArgTargetContextValue>();
/**
 * Context for the current directive target.
 */
export const DirectiveTargetContext =
  createContext<DirectiveTargetContextValue>();
/**
 * Context for the current directive argument target.
 */
export const DirectiveArgTargetContext =
  createContext<DirectiveArgTargetContextValue>();

/**
 * Accesses the current type definition being built.
 *
 * @remarks
 * Throws if used outside of a type component.
 */
export function useTypeContext(): TypeDefinition {
  const context = useContext(TypeContext);
  if (!context) {
    throw new Error("This component must be used within a type definition.");
  }
  return context.definition;
}

/**
 * Accesses the current argument target (field or directive).
 *
 * @remarks
 * Throws if used outside of a `Field` or `DirectiveDefinition`.
 */
export function useArgTargetContext(): ArgTargetContextValue {
  const context = useContext(ArgTargetContext);
  if (!context) {
    throw new Error(
      "InputValue must be used within a Field or DirectiveDefinition.",
    );
  }
  return context;
}

/**
 * Accesses the current directive target.
 *
 * @remarks
 * Throws if used outside of a directive target.
 */
export function useDirectiveTargetContext(): DirectiveTargetContextValue {
  const context = useContext(DirectiveTargetContext);
  if (!context) {
    throw new Error("Directive must be used within a directive target.");
  }
  return context;
}

/**
 * Accesses the current directive argument target.
 *
 * @remarks
 * Throws if used outside of a `Directive` component.
 */
export function useDirectiveArgTargetContext(): DirectiveArgTargetContextValue {
  const context = useContext(DirectiveArgTargetContext);
  if (!context) {
    throw new Error("Argument must be used within a Directive.");
  }
  return context;
}

/**
 * Creates a new mutable schema state for advanced composition.
 */
export function createSchemaState(options?: SchemaOptions): SchemaState {
  const namePolicy = normalizeNamePolicy(options?.namePolicy);
  const state: SchemaState = {
    types: new Map(),
    directives: new Map(),
    schemaDirectives: [],
    schema: {
      query: options?.query,
      mutation: options?.mutation,
      subscription: options?.subscription,
    },
    description: options?.description,
    namePolicy,
  };

  return state;
}

/**
 * Root component that collects GraphQL type definitions.
 *
 * @example
 * ```tsx
 * <Schema>
 *   <Query>
 *     <Field name="user" type={User} />
 *   </Query>
 * </Schema>
 * ```
 *
 * @remarks
 * Most callers should use `renderSchema`, which creates the state and renders
 * this component internally.
 */
export function Schema(props: SchemaProps) {
  const internal = props as SchemaInternalProps;
  const state = internal._state ?? createSchemaState(props);
  const directiveTarget: SchemaDirectiveTarget = { kind: "schema" };

  if (internal._state) {
    state.schema.query = props.query ?? state.schema.query;
    state.schema.mutation = props.mutation ?? state.schema.mutation;
    state.schema.subscription = props.subscription ?? state.schema.subscription;
    state.description = props.description ?? state.description;
    if (props.namePolicy !== undefined) {
      state.namePolicy = normalizeNamePolicy(props.namePolicy);
    }
  }

  return (
    <SchemaContext.Provider value={state}>
      <DirectiveTargetContext.Provider
        value={{
          location: DirectiveLocation.SCHEMA,
          directives: state.schemaDirectives,
          target: directiveTarget,
        }}
      >
        {props.children}
      </DirectiveTargetContext.Provider>
    </SchemaContext.Provider>
  );
}

function normalizeNamePolicy(
  value: SchemaOptions["namePolicy"],
): SchemaState["namePolicy"] {
  if (value === undefined) {
    return defaultNamePolicy;
  }
  if (value === null) {
    return null;
  }
  if (isGraphQLNamePolicy(value)) {
    return value;
  }
  return createGraphQLNamePolicy({ rules: value });
}
