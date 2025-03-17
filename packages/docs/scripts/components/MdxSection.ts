import type { Children } from "@alloy-js/core";
import { SectionContext, useSectionContext } from "../contexts/section.js";
import { MdxParagraph } from "./stc/index.js";

export interface MdxSectionProps {
  title: string;
  children?: Children;
}

export function MdxSection(props: MdxSectionProps) {
  const sectionContext = useSectionContext();
  const level = sectionContext.level + 1;
  return [
    MdxParagraph().children("#".repeat(level) + " " + props.title),
    SectionContext.ProviderStc({ value: { level } }).children(
      MdxParagraph().children(props.children),
    ),
  ];
}
