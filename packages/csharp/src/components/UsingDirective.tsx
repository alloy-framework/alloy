import * as core from "@alloy-js/core";
import { NamespaceSymbol } from "../symbols/namespace.js";

export interface UsingDirectiveProps {
  /**
   * Namespace symbols to use to generate using statements.
   */
  namespaces?: (NamespaceSymbol | string)[];
}

// one ore more C# using directives
export function UsingDirective(props: UsingDirectiveProps) {
  const sortedNamespaces = core.computed(() => {
    return props
      .namespaces!.map((ns) =>
        typeof ns === "string" ? ns : (
          ns.getFullyQualifiedName({ omitGlobal: true })
        ),
      )
      .sort((n1, n2) => n1.localeCompare(n2));
  });

  return (
    <core.For each={sortedNamespaces}>
      {(namespace) => `using ${namespace};`}
    </core.For>
  );
}
