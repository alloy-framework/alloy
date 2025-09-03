import {
  Children,
  For,
  Indent,
  MemberDeclaration,
  MemberName,
  Refkey,
} from "@alloy-js/core";
import { createTypeParameterSymbol } from "../../symbols/factories.js";

/**
 * Information for a Go generic type parameter.
 */
export interface TypeParameterProps {
  /**
   * The name of the type parameter.
   */
  name: string;

  /**
   * The parameter constraint
   */
  constraint: Children;

  /**
   * A refkey for this type parameter.
   */
  refkey?: Refkey;
}

export function TypeParameter(props: TypeParameterProps) {
  const symbol = createTypeParameterSymbol(props.name, {
    refkeys: props.refkey,
  });
  return (
    <MemberDeclaration symbol={symbol}>
      <MemberName /> {props.constraint}
    </MemberDeclaration>
  );
}

export interface TypeParametersProps {
  /** Parameters */
  parameters?: TypeParameterProps[];
}

export function TypeParameters(props: TypeParametersProps) {
  if (!props.parameters || props.parameters.length === 0) {
    return null;
  }

  return (
    <group>
      {"["}
      {props.parameters && (
        <Indent softline>
          <For
            each={props.parameters}
            joiner={
              <>
                {","}
                <ifBreak flatContents=" ">
                  <sbr />
                </ifBreak>
              </>
            }
            ender={<ifBreak>,</ifBreak>}
          >
            {(param) => <TypeParameter {...param} />}
          </For>
        </Indent>
      )}
      <sbr />
      {"]"}
    </group>
  );
}
