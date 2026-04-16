import { Children, For, Indent, isComponentCreator } from "@alloy-js/core";

export interface IfExpressionProps {
  condition: Children;
  children?: Children;
}

export interface ElseIfClauseProps {
  condition: Children;
  children?: Children;
}

export interface ElseClauseProps {
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

function isClause(child: Children) {
  if (!isComponentCreator(child)) {
    return false;
  }

  return child.component === ElseIfClause || child.component === ElseClause;
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

export function IfExpression(props: IfExpressionProps) {
  const children = normalizeChildren(props.children);
  const bodyChildren = children.filter((child) => !isClause(child));
  const clauses = children.filter((child) => isClause(child));

  return (
    <>
      {"if "}
      {props.condition} {renderBlock(bodyChildren)}
      {clauses}
    </>
  );
}

export function ElseIfClause(props: ElseIfClauseProps) {
  return (
    <>
      {" else if "}
      {props.condition} {renderBlock(props.children)}
    </>
  );
}

export function ElseClause(props: ElseClauseProps) {
  return (
    <>
      {" else "}
      {renderBlock(props.children)}
    </>
  );
}
