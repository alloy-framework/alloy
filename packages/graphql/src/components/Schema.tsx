import { Schema as SchemaBase } from "../schema/state.js";
import type { SchemaProps } from "../schema/types.js";

/**
 * Root component that collects GraphQL type definitions.
 *
 * @example Basic schema
 * ```tsx
 * <Schema>
 *   <Query>
 *     <Field name="user" type={User} />
 *   </Query>
 * </Schema>
 * ```
 *
 * @example Custom root types
 * ```tsx
 * <Schema query="RootQuery" mutation="RootMutation">
 *   <ObjectType name="RootQuery">
 *     <Field name="user" type={User} />
 *   </ObjectType>
 *   <ObjectType name="RootMutation">
 *     <Field name="updateUser" type={User} />
 *   </ObjectType>
 * </Schema>
 * ```
 *
 * @remarks
 * Most callers should use `renderSchema`, which creates the state and renders
 * this component internally.
 */
export function Schema(props: SchemaProps) {
  return SchemaBase(props);
}
