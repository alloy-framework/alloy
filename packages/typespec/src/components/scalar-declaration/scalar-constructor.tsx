import { Children } from "@alloy-js/core";
import { DocWhen } from "../doc/doc-comment.jsx";
import { ParameterDescriptor, Parameters } from "../operation/parameters.jsx";

export interface ScalarConstructorProps {
  /** The name of the constructor. */
  name: string;
  /** The parameters of the constructor. */
  parameters?: ParameterDescriptor[];
  /** Doc comment rendered as `/** ... *\/` above the constructor. */
  doc?: Children;
  /** Decorators to apply to the constructor. */
  decorators?: Children;
}

/**
 * A scalar constructor (`init`) inside a scalar declaration body.
 *
 * @example
 * ```tsx
 * <ScalarConstructor name="fromInt" parameters={[{ name: "value", type: "uint32" }]} />
 * ```
 * This will produce:
 * ```typespec
 * init fromInt(value: uint32);
 * ```
 */
export function ScalarConstructor(props: ScalarConstructorProps) {
  return (
    <>
      <DocWhen doc={props.doc} />
      {props.decorators}
      init {props.name}
      <Parameters parameters={props.parameters} />
    </>
  );
}
