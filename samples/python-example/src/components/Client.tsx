import { For, refkey } from "@alloy-js/core";
import * as py from "@alloy-js/python";
import { useApi } from "../context/api.js";
import { ClientMethod } from "./index.js";

export function Client() {
  const schema = useApi().schema;
  const name = `${schema.name}Client`;

  return <py.ClassDeclaration name={name} refkey={refkey(schema)}>
    <For each={schema.operations} doubleHardline>
      {(op) => <ClientMethod operation={op} />}
    </For>
  </py.ClassDeclaration>;
}