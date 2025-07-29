import { For, Prose, refkey } from "@alloy-js/core";
import * as py from "@alloy-js/python";
import { useApi } from "../context/api.js";
import { ClientMethod } from "./index.js";

export function Client() {
  const schema = useApi().schema;
  const name = `${schema.name}Client`;
  const classDoc = (<py.ClassDoc
    description={[
      <Prose>
        {schema.doc}
      </Prose>,
    ]}
    parameters={[]}
    style="google"
  />);

  return <py.ClassDeclaration name={name} refkey={refkey(name)} doc={classDoc}>
    <For each={schema.operations}>
      {(op) => <ClientMethod operation={op} />}
    </For>
  </py.ClassDeclaration>;
}