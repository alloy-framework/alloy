import { stc, type Children } from "@alloy-js/core";
import { Scope, SourceDirectory } from "@alloy-js/core/stc";
import { PackageDocContext } from "../contexts/package-docs.js";

export interface PackageDocsProps {
  name: string;
  children?: Children;
}

export function PackageDocs(props: PackageDocsProps) {
  return stc(PackageDocContext.Provider)({
    value: { name: props.name },
  }).children(
    SourceDirectory({ path: props.name }).children(
      Scope({ name: props.name }).children(props.children),
    ),
  );
}
