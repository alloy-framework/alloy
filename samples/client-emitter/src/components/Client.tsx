import { Children, For, refkey } from "@alloy-js/core";
import * as ts from "@alloy-js/typescript";
import { useApi } from "../context/api.js";
import { ClientMethod } from "./ClientMethod.jsx";

export function Client(): Children {
  const schema = useApi().schema;
  const name = `${schema.name}Client`;

  return (
    <ts.ClassDeclaration name={name} export refkey={refkey(schema)}>
      <For each={schema.operations} doubleHardline>
        {(op) => <ClientMethod operation={op} />}
      </For>
    </ts.ClassDeclaration>
  );
}
