import { renderTree, type Children } from "@alloy-js/core";
import type { GraphQLSchema } from "graphql";
import { buildSchema } from "./build.js";
import { createSchemaState, Schema } from "./state.js";
import type { RenderSchemaOptions, SchemaProps, SchemaState } from "./types.js";

type SchemaInternalProps = SchemaProps & { _state: SchemaState };
const SchemaWithState = Schema as unknown as (
  props: SchemaInternalProps,
) => Children;

/**
 * Renders GraphQL components into a `GraphQLSchema`.
 *
 * @example
 * ```tsx
 * const schema = renderSchema(
 *   <Schema>
 *     <Query>
 *       <Field name="user" type={User} />
 *     </Query>
 *   </Schema>,
 * );
 * ```
 */
export function renderSchema(
  children: Children,
  options?: RenderSchemaOptions,
): GraphQLSchema {
  const state = createSchemaState(options);
  renderTree(
    <SchemaWithState {...options} _state={state}>
      {children}
    </SchemaWithState>,
  );
  return buildSchema(state, options?.validate ?? true);
}
