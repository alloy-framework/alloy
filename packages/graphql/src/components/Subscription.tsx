import { ObjectType } from "./ObjectType.js";
import { type RootTypeProps, useRootType } from "./root-type.js";

/**
 * Declares the `Subscription` root type.
 *
 * @example Basic subscription root
 * ```tsx
 * <Subscription>
 *   <Field name="userChanged" type={User} />
 * </Subscription>
 * ```
 */
export function Subscription(props: RootTypeProps) {
  useRootType("subscription", "Subscription");
  return (
    <ObjectType name="Subscription" description={props.description}>
      {props.children}
    </ObjectType>
  );
}
