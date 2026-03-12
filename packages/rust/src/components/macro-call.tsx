import { Children, For, Indent, Wrap } from "@alloy-js/core";

export interface MacroCallProps {
  name: string;
  args?: Children[];
  bracket?: "paren" | "bracket" | "brace";
}

const macroCallBrackets: Record<NonNullable<MacroCallProps["bracket"]>, [string, string]> = {
  paren: ["(", ")"],
  bracket: ["[", "]"],
  brace: ["{", "}"],
};

export function MacroCall(props: MacroCallProps) {
  const [openBracket, closeBracket] = macroCallBrackets[props.bracket ?? "paren"];

  return (
    <group>
      {props.name}
      {"!"}
      {openBracket}
      <Wrap
        when={!!props.args && props.args.length > 1}
        with={Indent}
        props={{ softline: true, trailingBreak: true }}
      >
        <For each={props.args ?? []} comma line>
          {(arg) => arg}
        </For>
      </Wrap>
      {closeBracket}
    </group>
  );
}
