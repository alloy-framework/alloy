import { type Children } from "@alloy-js/core";
import { SourceFile } from "@alloy-js/core/stc";
import { Reference } from "./Reference.js";

export interface MdxSourceFileProps {
  path: string;
  children?: Children;
}

export function MdxSourceFile(props: MdxSourceFileProps) {
  return SourceFile({
    path: props.path,
    reference: Reference,
    filetype: "mdx",
  }).children(props.children);
}
