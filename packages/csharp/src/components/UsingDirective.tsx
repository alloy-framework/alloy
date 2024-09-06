import * as core from "@alloy-js/core";

export interface UsingDirectiveProps {
  namespaces: Array<string>;
}

// one ore more C# using directives
export function UsingDirective(props: UsingDirectiveProps): string {
  props.namespaces.sort();
  return core
    .mapJoin(props.namespaces, (namespace) => {
      return `using ${namespace};`;
    })
    .join("");
}
