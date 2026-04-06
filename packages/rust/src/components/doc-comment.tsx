import { type Children } from "@alloy-js/core";

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

function renderBlockComment(children: Children, openDelim: string, closeDelim: string) {
  const lines = String(children).split("\n");
  return (
    <>
      {openDelim}
      <hbr />
      {lines.map((line) => (
        <>
          {" * "}
          {line}
          <hbr />
        </>
      ))}
      {" "}
      {closeDelim}
      <hbr />
    </>
  );
}

function isEmptyChildren(children: Children): boolean {
  return children === undefined || children === null || String(children).length === 0;
}

// --- Line comments ---

export interface LineCommentProps {
  children?: Children;
}

export function LineComment(props: LineCommentProps) {
  if (isEmptyChildren(props.children)) {
    return <></>;
  }
  return renderCommentLines(props.children, "// ");
}

// --- Block comments ---

export interface BlockCommentProps {
  children?: Children;
}

export function BlockComment(props: BlockCommentProps) {
  if (isEmptyChildren(props.children)) {
    return <></>;
  }
  return renderBlockComment(props.children, "/*", "*/");
}

// --- Outer doc comments (///) ---

export interface DocCommentProps {
  children?: Children;
}

export function DocComment(props: DocCommentProps) {
  if (isEmptyChildren(props.children)) {
    return <></>;
  }
  return renderCommentLines(props.children, "/// ");
}

// --- Inner doc comments (//!) ---

export interface InnerDocCommentProps {
  children?: Children;
}

export function InnerDocComment(props: InnerDocCommentProps) {
  if (isEmptyChildren(props.children)) {
    return <></>;
  }
  return renderCommentLines(props.children, "//! ");
}

// --- Outer block doc comments (/** */) ---

export interface OuterBlockDocCommentProps {
  children?: Children;
}

export function OuterBlockDocComment(props: OuterBlockDocCommentProps) {
  if (isEmptyChildren(props.children)) {
    return <></>;
  }
  return renderBlockComment(props.children, "/**", "*/");
}

// --- Inner block doc comments (/*! */) ---

export interface InnerBlockDocCommentProps {
  children?: Children;
}

export function InnerBlockDocComment(props: InnerBlockDocCommentProps) {
  if (isEmptyChildren(props.children)) {
    return <></>;
  }
  return renderBlockComment(props.children, "/*!", "*/");
}
