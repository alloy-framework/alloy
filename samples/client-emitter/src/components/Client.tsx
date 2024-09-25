import { mapJoin, refkey } from "@alloy-js/core";
import * as ts from "@alloy-js/typescript";
import { useApi } from "../context/api.js";
import { ClientMethod } from "./ClientMethod.jsx";

export function Client() {
  const schema = useApi().schema;
  const operations = schema.operations;
  const methods = mapJoin(operations, (op) => <ClientMethod operation={op} />);
  const name = `${schema.name}Client`;

  return <ts.ClassDeclaration name={name} export refkey={refkey(schema)}>
    {methods}
  </ts.ClassDeclaration>;
}
