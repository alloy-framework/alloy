import { Descriptor, NamespaceDescriptor } from "#createLibrary";
import {
  code,
  For,
  namekey,
  refkey,
  Show,
  SourceDirectory,
} from "@alloy-js/core";
import {
  ObjectExpression,
  SourceFile,
  VarDeclaration,
} from "@alloy-js/typescript";
import { LibraryInterfaceDeclaration } from "./library-interface.jsx";

export function NamespaceDirectory(props: {
  name: string;
  fqn: string;
  ns: NamespaceDescriptor<any>;
}) {
  const subNamespaces = Object.entries(props.ns.members || {}).filter(
    ([, member]) => (member as any).kind === "namespace",
  );

  const nonNamespaces = Object.entries(props.ns.members || {}).filter(
    ([, member]) => (member as any).kind !== "namespace",
  );

  if (nonNamespaces.length === 0 && subNamespaces.length === 0) {
    return;
  }

  let path: string;
  let fqnBase: string;
  if (props.name === "") {
    path = ".";
    fqnBase = "";
  } else {
    path = props.name;
    fqnBase = props.fqn + ".";
  }

  const typeDescriptor = Object.fromEntries(nonNamespaces) as Record<
    string,
    Descriptor
  >;

  return (
    <SourceDirectory path={path}>
      <Show when={subNamespaces.length > 0}>
        <For each={subNamespaces}>
          {([memberName, member]) => {
            if ((member as any).kind === "namespace") {
              return (
                <NamespaceDirectory
                  name={memberName}
                  fqn={fqnBase + memberName}
                  ns={member as any}
                />
              );
            }
          }}
        </For>
      </Show>

      <SourceFile path="index.ts">
        <Show when={props.fqn !== ""}>
          {code`
            import { createLibrary } from "#createLibrary";
            import { LibrarySymbolReference } from "@alloy-js/core";
          `}
        </Show>
        <For each={subNamespaces}>
          {([memberName, member]) => {
            if ((member as any).kind === "namespace") {
              return `export { default as ${memberName} } from "./${memberName}/index.js";`;
            }
          }}
        </For>
        <Show when={props.fqn !== ""}>
          <hbr />
          <hbr />
          <LibraryInterfaceDeclaration name={path} types={typeDescriptor} />
          <hbr />
          <VarDeclaration name={path} type={path + "Library"}>
            createLibrary("{props.fqn}",{" "}
            <ObjectExpression jsValue={typeDescriptor} />
            );
          </VarDeclaration>
          <hbr />
          <VarDeclaration
            name={namekey(path, { ignoreNameConflict: true })}
            refkey={refkey(props.fqn)}
            export
            default
          >
            {path}
          </VarDeclaration>
        </Show>
      </SourceFile>
    </SourceDirectory>
  );
}
