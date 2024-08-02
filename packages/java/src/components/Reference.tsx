import { memo, Refkey, resolve, untrack, useContext } from "@alloy-js/core";
import { SourceFileContext } from "./SourceFile.js";
import { JavaOutputScope, JavaOutputSymbol, ref } from "../symbols.js";
import { useProject } from "./ProjectDirectory.js";

export interface ReferenceProps {
  refkey: Refkey;
}

export function Reference(props: ReferenceProps) {
  const reference = ref(props.refkey);

  return <>{reference}</>
}