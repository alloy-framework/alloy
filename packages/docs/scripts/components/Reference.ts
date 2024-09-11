import {
  memo,
  resolve,
  SourceDirectoryContext,
  useContext,
  type OutputScope,
  type Refkey,
} from "@alloy-js/core";
import { relative } from "node:path";
import type { DocSymbol } from "../symbols/doc-symbol.js";

export interface ReferenceProps {
  linkText?: string;
  refkey: Refkey;
}

export function Reference(props: ReferenceProps) {
  const resolution = resolve<OutputScope, DocSymbol>(props.refkey);
  const currentDir = useContext(SourceDirectoryContext)!.path;

  const link = memo(() => {
    if (resolution.value === undefined) {
      return props.linkText ?? "[unresolved link]";
    } else {
      const targetSym = resolution.value.targetDeclaration;
      // initial ../ because the url always contains a trailing slash.
      return `<a href="../${relative(currentDir, targetSym.path).toLowerCase().replace(".mdx", "/")}">${props.linkText ?? targetSym.name}</a>`;
    }
  });

  return link;
}
