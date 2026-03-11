import { Children, For, Indent } from "@alloy-js/core";

export interface MatchExpressionProps {
  expression: Children;
  children?: Children;
}

export interface MatchArmProps {
  pattern: Children;
  guard?: Children;
  children?: Children;
}

function normalizeChildren(children: Children | undefined) {
  if (!children) {
    return [];
  }

  return (Array.isArray(children) ? children : [children]).filter(
    (child) => !(typeof child === "string" && child.trim().length === 0),
  );
}

export function MatchExpression(props: MatchExpressionProps) {
  const arms = normalizeChildren(props.children);

  return (
    <>
      {"match "}
      {props.expression}
      {" {"}
      {arms.length > 0 ? (
        <>
          <Indent>
            <For each={arms} joiner={<hbr />}>{(arm) => arm}</For>
          </Indent>
          <hbr />
        </>
      ) : null}
      {"}"}
    </>
  );
}

export function MatchArm(props: MatchArmProps) {
  const statements = normalizeChildren(props.children);
  const renderInline = statements.length === 1;

  return (
    <>
      {props.pattern}
      {props.guard ? (
        <>
          {" if "}
          {props.guard}
        </>
      ) : null}
      {" => "}
      {renderInline ? (
        <>
          {statements[0]}
          {","}
        </>
      ) : (
        <>
          {"{"}
          <Indent>
            <For each={statements} joiner={<hbr />}>{(statement) => statement}</For>
          </Indent>
          <hbr />
          {"},"}
        </>
      )}
    </>
  );
}
