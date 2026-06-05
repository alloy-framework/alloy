import { Children } from "@alloy-js/core";
import { DocWhen } from "../doc/doc-comment.jsx";
import { ParameterDescriptor, Parameters } from "../operation/parameters.jsx";

export interface ScalarInitializerProps {
  /** The name of the initializer. */
  name: string;
  /** The parameters of the initializer. */
  parameters?: ParameterDescriptor[];
  /** Doc comment rendered as `/** ... *\/` above the initializer. */
  doc?: Children;
  /** Decorators to apply to the initializer. */
  decorators?: Children;
}

/**
 * A scalar initializer (`init`) inside a scalar declaration body.
 *
 * @example
 * ```tsx
 * <ScalarInitializer name="fromInt" parameters={[{ name: "value", type: "uint32" }]} />
 * ```
 * This will produce:
 * ```typespec
 * init fromInt(value: uint32);
 * ```
 */
export function ScalarInitializer(props: ScalarInitializerProps) {
  return (
    <>
      <DocWhen doc={props.doc} />
      {props.decorators}
      init {props.name}
      <Parameters parameters={props.parameters} />
    </>
  );
}
