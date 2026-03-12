import { Children, For, Indent } from "@alloy-js/core";

export interface BlockExpressionProps {
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

export function BlockExpression(props: BlockExpressionProps) {
  const statements = normalizeChildren(props.children);
  const precedingStatements = statements.slice(0, -1);
  const lastExpression = statements.at(-1);

  return (
    <>
      {"{"}
      {statements.length > 0 ? (
        <>
          <Indent>
            {precedingStatements.length > 0 ? (
              <>
                <For each={precedingStatements} joiner={<hbr />}>
                  {(statement) => statement}
                </For>
                <hbr />
              </>
            ) : null}
            {lastExpression}
          </Indent>
          <hbr />
        </>
      ) : null}
      {"}"}
    </>
  );
}
