import { Children, For, Indent } from "@alloy-js/core";

export interface WhileExpressionProps {
  condition: Children;
  label?: string;
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

function renderBlock(children: Children | undefined) {
  const statements = normalizeChildren(children);

  return (
    <>
      {"{"}
      {statements.length > 0 ?
        <>
          <Indent>
            <For each={statements} joiner={<hbr />}>
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

export function WhileExpression(props: WhileExpressionProps) {
  return (
    <>
      {props.label ?
        <>
          {props.label}
          {": "}
        </>
      : null}
      {"while "}
      {props.condition} {renderBlock(props.children)}
    </>
  );
}
