import * as core from "@alloy-js/core";

export interface UsingDirectiveProps {
  namespaces: Array<string>;
}

// one ore more C# using directives
export function UsingDirective(props: UsingDirectiveProps) {
  const sortedNamespaces = core.computed(() => {
    return props.namespaces.sort();
  });

  return <core.For each={sortedNamespaces}>
    {namespace => `using ${namespace};`}
  </core.For>;
}
