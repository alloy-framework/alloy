import {
  memo,
  resolve,
  useContext,
  type OutputScope,
  type Refkey,
} from "@alloy-js/core";
import { relative } from "node:path";
import { ContentRootDir } from "../contexts/content-root-dir.js";
import type { DocSymbol } from "../symbols/doc-symbol.js";

export interface ReferenceProps {
  linkText?: string;
  refkey: Refkey;
}

export function Reference(props: ReferenceProps) {
  const resolution = resolve<OutputScope, DocSymbol>(props.refkey);
  const rootDir = useContext(ContentRootDir)!;

  const link = memo(() => {
    if (resolution.value === undefined) {
      return props.linkText ?? "[unresolved link]";
    } else {
      const targetSym = resolution.value.targetDeclaration;
      return `<a href="/${relative(rootDir, targetSym.path).toLowerCase().replace(".mdx", "/")}">${props.linkText ?? targetSym.name}</a>`;
    }
  });

  return link;
}
