import { Descriptor } from "#createLibrary";
import { For } from "@alloy-js/core";
import {
  InterfaceExpression,
  InterfaceMember,
  TypeDeclaration,
} from "@alloy-js/typescript";

export function LibraryInterfaceDeclaration(props: {
  name: string;
  types: Record<string, Descriptor>;
}) {
  return (
    <TypeDeclaration name={props.name + "Library"}>
      <LibraryMembersInterface types={props.types} />
    </TypeDeclaration>
  );
}

export function LibraryMembersInterface(props: {
  types: Record<string, Descriptor>;
}) {
  return (
    <>
      LibrarySymbolReference &{" "}
      <InterfaceExpression>
        <For each={Object.entries(props.types)} semicolon hardline>
          {([name, descriptor]) => {
            return (
              <InterfaceMember name={name}>
                {"members" in descriptor ?
                  <LibraryMembersInterface types={descriptor.members} />
                : "LibrarySymbolReference"}
              </InterfaceMember>
            );
          }}
        </For>
      </InterfaceExpression>
    </>
  );
}
