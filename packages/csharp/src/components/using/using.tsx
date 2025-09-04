import { computed, For } from "@alloy-js/core";
import { NamespaceSymbol } from "../../symbols/namespace.js";

export interface UsingsProps {
  /**
   * Namespace symbols or namespace names to use to generate using statements.
   */
  namespaces: (NamespaceSymbol | string)[];
}

/**
 * Component rendering csharp using directive
 * @example
 *
 * ```tsx
 * <Usings namespaces={["System", "Models"]} />
 * ```
 *
 * will render
 *
 * ```csharp
 * using Models;
 * using System;
 * ```
 */
export function Usings(props: UsingsProps) {
  const sortedNamespaces = computed(() => {
    return props.namespaces
      .map(getNamespaceName)
      .sort((n1, n2) => n1.localeCompare(n2));
  });

  return (
    <For each={sortedNamespaces}>
      {(namespace) => <UsingNamespaceDirective namespace={namespace} />}
    </For>
  );
}

export interface UsingNamespaceDirective {
  namespace: string;
}

export function UsingNamespaceDirective(props: UsingNamespaceDirective) {
  return `using ${getNamespaceName(props.namespace)};`;
}

function getNamespaceName(namespace: string | NamespaceSymbol): string {
  return typeof namespace === "string" ? namespace : (
      namespace.getFullyQualifiedName({ omitGlobal: true })
    );
}
