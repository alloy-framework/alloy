import type { Children } from "@alloy-js/core";
import { MdxParagraph } from "./stc/index.js";

export interface MdxSectionProps {
  title: string;
  level: number;
  children?: Children;
}

export function MdxSection(props: MdxSectionProps) {
  return [
    MdxParagraph().children("#".repeat(props.level) + " " + props.title),
    MdxParagraph().children(props.children),
  ];
}
