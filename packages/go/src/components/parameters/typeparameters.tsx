import { For, Indent, MemberDeclaration, MemberName } from "@alloy-js/core";
import { createTypeParameterSymbol } from "../../symbols/factories.js";
import { TypeParameterProps } from "../../symbols/named-type.js";

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
