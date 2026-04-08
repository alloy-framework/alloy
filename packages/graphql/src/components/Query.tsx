import { ObjectType } from "./ObjectType.js";
import { type RootTypeProps, useRootType } from "./root-type.js";

/**
 * Declares the `Query` root type.
 *
 * @example Basic query root
 * ```tsx
 * <Query>
 *   <Field name="user" type={User} />
 * </Query>
 * ```
 */
export function Query(props: RootTypeProps) {
  useRootType("query", "Query");
  return (
    <ObjectType name="Query" description={props.description}>
      {props.children}
    </ObjectType>
  );
}
