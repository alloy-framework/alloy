import { type Children, code, For, memo } from "@alloy-js/core";
import { RustCrateScope } from "../scopes/rust-crate-scope.js";
import { RustModuleScope } from "../scopes/rust-module-scope.js";

interface ModDeclaration {
  name: string;
  visibility: "pub" | "pub(crate)" | "pub(super)" | undefined;
  attributes?: Children[];
}

export interface ModDeclarationsProps {
  scope: RustCrateScope | RustModuleScope;
}

function ModDeclarationLine(props: ModDeclaration) {
  return (
    <>
      {props.attributes && props.attributes.length > 0 ?
        <>
          <For each={props.attributes} line>
            {(attr) => attr}
          </For>
          <hbr />
        </>
      : null}
      {props.visibility ? `${props.visibility} ` : ""}
      {code`mod `}
      {props.name}
      {code`;`}
    </>
  );
}

export function ModDeclarations(props: ModDeclarationsProps) {
  return memo(() => {
    const declarations = Array.from(props.scope.childModules.values()).sort(
      (left, right) => left.name.localeCompare(right.name),
    );

    if (declarations.length === 0) {
      return <></>;
    }

    return (
      <>
        {declarations.map((declaration, index) => (
          <>
            <ModDeclarationLine
              name={declaration.name}
              visibility={declaration.visibility}
              attributes={declaration.attributes}
            />
            {index < declarations.length - 1 ?
              <hbr />
            : null}
          </>
        ))}
      </>
    );
  });
}
