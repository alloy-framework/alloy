import { ObjectType } from "./ObjectType.js";
import { type RootTypeProps, useRootType } from "./root-type.js";

/**
 * Declares the `Mutation` root type.
 *
 * @example Basic mutation root
 * ```tsx
 * <Mutation>
 *   <Field name="updateUser" type={User} />
 * </Mutation>
 * ```
 */
export function Mutation(props: RootTypeProps) {
  useRootType("mutation", "Mutation");
  return (
    <ObjectType name="Mutation" description={props.description}>
      {props.children}
    </ObjectType>
  );
}
