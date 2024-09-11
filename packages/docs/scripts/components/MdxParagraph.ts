import type { Children } from "@alloy-js/core";

export interface MdxParagraphProps {
  children?: Children;
}

export function MdxParagraph(props: MdxParagraphProps) {
  return [
    props.children,
    "\n\n"
  ]
}