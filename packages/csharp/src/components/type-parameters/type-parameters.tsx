import { For, Indent, taggedComponent } from "@alloy-js/core";
import { TypeParameter, TypeParameterProps } from "./type-parameter.jsx";

export const typeParametersTag = Symbol.for("csharp.type-parameters");

export interface TypeParametersProps {
  /** Parameters */
  parameters: (TypeParameterProps | string)[];
}

/**
 * Represent type parameters
 *
 * @example
 * ```ts
 * <A, B extends string>
 * ```
 */
export const TypeParameters = taggedComponent(
  typeParametersTag,
  function TypeParameters(props: TypeParametersProps) {
    const typeParameters = normalizeParameters(props.parameters);

    return (
      <>
        {"<"}
        <group>
          <Indent softline>
            <For each={typeParameters} comma line>
              {(param) => <TypeParameter {...param} />}
            </For>
          </Indent>
        </group>
        {">"}
      </>
    );
  },
);

export function normalizeParameters(
  parameters: (TypeParameterProps | string)[],
): TypeParameterProps[] {
  return parameters.map((param) => {
    if (typeof param === "string") {
      return { name: param };
    }
    return param;
  });
}

// export function declareParameter(
//   parameters: TypeParameterProps[],
// ): TypeParameterProps[] {
//   return parameters.map((param) => {
//     return {
//       ...param,
//       symbol: new CSharpOutputSymbol(entry[0], {
//         scope: thisClassScope,
//         refkeys: entry[1],
//       }),
//     };
//   });
// }
