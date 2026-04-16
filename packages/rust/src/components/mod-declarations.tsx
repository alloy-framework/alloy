import { type Children, code, For, memo } from "@alloy-js/core";
import { RustCrateScope } from "../scopes/rust-crate-scope.js";
import { RustModuleScope } from "../scopes/rust-module-scope.js";
import { type RustVisibilityProps, VisibilityPrefix } from "./visibility.js";

interface ModDeclaration extends RustVisibilityProps {
  name: string;
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
      <VisibilityPrefix pub={props.pub} />
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
              pub={declaration.pub}
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
