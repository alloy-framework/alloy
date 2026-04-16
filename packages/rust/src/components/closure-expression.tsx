import { Children, For, Indent, isComponentCreator } from "@alloy-js/core";

export interface ClosureParameter {
  name: string;
  type?: Children;
}

export interface ClosureExpressionProps {
  parameters?: ClosureParameter[];
  move?: boolean;
  returnType?: Children;
  children?: Children;
}

function normalizeChildren(children: Children | undefined) {
  if (!children) {
    return [];
  }

  const normalized: Children[] = [];
  const queue = Array.isArray(children) ? [...children] : [children];

  while (queue.length > 0) {
    const child = queue.shift();
    if (typeof child === "undefined") {
      continue;
    }

    if (Array.isArray(child)) {
      queue.unshift(...child);
      continue;
    }

    if (typeof child === "string" && child.trim().length === 0) {
      continue;
    }

    normalized.push(child);
  }

  return normalized;
}

function shouldRenderBlock(statements: Children[], hasReturnType: boolean) {
  if (hasReturnType || statements.length !== 1) {
    return true;
  }

  return isComponentCreator(statements[0]);
}

function renderBlock(children: Children[]) {
  return (
    <>
      {"{"}
      {children.length > 0 ?
        <>
          <Indent>
            <For each={children} joiner={<hbr />}>
              {(statement) => statement}
            </For>
          </Indent>
          <hbr />
        </>
      : null}
      {"}"}
    </>
  );
}

export function ClosureExpression(props: ClosureExpressionProps) {
  const parameters = props.parameters ?? [];
  const bodyStatements = normalizeChildren(props.children);
  const hasReturnType = typeof props.returnType !== "undefined";
  const renderAsBlock = shouldRenderBlock(bodyStatements, hasReturnType);

  return (
    <>
      {props.move ? "move " : ""}
      {"|"}
      <For each={parameters} joiner={", "}>
        {(parameter) => (
          <>
            {parameter.name}
            {parameter.type ?
              <>: {parameter.type}</>
            : null}
          </>
        )}
      </For>
      {"|"}
      {hasReturnType ?
        <>
          {" "}
          {"->"} {props.returnType}
        </>
      : null}
      {renderAsBlock ?
        <> {renderBlock(bodyStatements)}</>
      : <> {bodyStatements[0]}</>}
    </>
  );
}
