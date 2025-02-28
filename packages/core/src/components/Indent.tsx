import { Children } from "@alloy-js/core/jsx-runtime";

export interface IndentProps {
  children: Children;
  break?: "space" | "soft" | "hard";
  trailingBreak?: boolean;
}
export function Indent(props: IndentProps) {
  const breakStyle = props.break ?? "hard";
  const breakElem =
    breakStyle === "hard" ? <hbr />
    : breakStyle === "soft" ? <sbr />
    : <br />;

  return (
    <>
      <indent>
        {breakElem}
        {props.children}
      </indent>
      {props.trailingBreak && breakElem}
    </>
  );
}
