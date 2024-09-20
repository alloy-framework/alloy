import * as core from "@alloy-js/core";

export interface UsingDirectiveProps {
  namespaces: Array<string>;
}

// one ore more C# using directives
export function UsingDirective(props: UsingDirectiveProps) {
  // we need core.memo here so that the contents are in a reactive context.
  // the values for namespaces are reactive thus we need to observe any changes.
  return core.memo(() => {
    props.namespaces.sort();
    return core
      .mapJoin(props.namespaces, (namespace) => {
        return `using ${namespace};`;
      })
      .join("");
  });
}
