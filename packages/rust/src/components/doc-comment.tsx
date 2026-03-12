import { type Children } from "@alloy-js/core";

export interface DocCommentProps {
  children?: Children;
}

function renderCommentLines(children: Children, prefix: string) {
  const lines = String(children).split("\n");
  return lines.map((line) => (
    <>
      {prefix}
      {line}
      <hbr />
    </>
  ));
}

export function DocComment(props: DocCommentProps) {
  if (props.children === undefined || props.children === null) {
    return <></>;
  }

  if (String(props.children).length === 0) {
    return <></>;
  }

  return renderCommentLines(props.children, "/// ");
}

export interface ModuleDocCommentProps {
  children?: Children;
}

export function ModuleDocComment(props: ModuleDocCommentProps) {
  if (props.children === undefined || props.children === null) {
    return <></>;
  }

  if (String(props.children).length === 0) {
    return <></>;
  }

  return renderCommentLines(props.children, "//! ");
}
