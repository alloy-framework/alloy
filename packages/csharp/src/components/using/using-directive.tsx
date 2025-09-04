import { computed, For } from "@alloy-js/core";
import { NamespaceSymbol } from "../../symbols/namespace.js";

export interface UsingDirectiveProps {
  /**
   * Namespace symbols or namespace names to use to generate using statements.
   */
  namespaces?: (NamespaceSymbol | string)[];
}

// one ore more C# using directives
export function UsingDirective(props: UsingDirectiveProps) {
  const sortedNamespaces = computed(() => {
    return props
      .namespaces!.map((ns) =>
        typeof ns === "string" ? ns : (
          ns.getFullyQualifiedName({ omitGlobal: true })
        ),
      )
      .sort((n1, n2) => n1.localeCompare(n2));
  });

  return (
    <For each={sortedNamespaces}>{(namespace) => `using ${namespace};`}</For>
  );
}
