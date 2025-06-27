import * as core from "@alloy-js/core";
import { CSharpNamespaceSymbol } from "../symbols/namespace.js";

export interface UsingDirectiveProps {
  namespaces: Array<CSharpNamespaceSymbol>;
}

// one ore more C# using directives
export function UsingDirective(props: UsingDirectiveProps) {
  const sortedNamespaces = core.computed(() => {
    return props.namespaces.sort((n1, n2) => n1.name.localeCompare(n2.name));
  });

  return (
    <core.For each={sortedNamespaces}>
      {(namespace) => `using ${namespace.name};`}
    </core.For>
  );
}
