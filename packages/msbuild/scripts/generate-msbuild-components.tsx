import { For, List, Output, renderAsync, writeOutput } from "@alloy-js/core";
import {
  InterfaceDeclaration,
  InterfaceMember,
  SourceFile,
} from "@alloy-js/typescript";
import { resolve } from "pathe";
import { resolveSchemas, XmlAttribute, XmlSchema } from "./collect-schemas.js";

console.log("Fetching and parsing XSDs...");
const schemas = await resolveSchemas();
console.log(`Generating for ${schemas.length} schemas`);

const OUTPUT_PATH = resolve(import.meta.dirname, "../../src/components");

await writeOutput(
  await renderAsync(
    <Output basePath={OUTPUT_PATH}>
      <SourceFile path="index.tsx">
        <For each={schemas}>{(schema) => <XmlComponent schema={schema} />}</For>
      </SourceFile>
    </Output>,
  ),
);
console.log(`Wrote output to ${OUTPUT_PATH}`);

function XmlComponent(props: { schema: XmlSchema }) {
  return (
    <List doubleHardline>
      <InterfaceDeclaration
        export={!props.schema.internal}
        name={props.schema.tagName + "Props"}
        doc={props.schema.description}
        extends={props.schema.base && props.schema.base + "Props"}
      >
        <For each={Object.entries(props.schema.attributes)}>
          {([attrName, attr]) => (
            <XmlComponentPropsAttribute attrName={attrName} attr={attr} />
          )}
        </For>
      </InterfaceDeclaration>
    </List>
  );
}

function XmlComponentPropsAttribute(props: {
  attrName: string;
  attr: XmlAttribute;
}) {
  return (
    <InterfaceMember
      name={props.attrName}
      type={mapXsdTypeToTs(props.attr.type)}
      doc={props.attr.description}
    />
  );
}

function mapXsdTypeToTs(type: string | undefined) {
  switch (type) {
    case "xs:string":
    case "msb:string":
      return "string";
    case "xs:int":
    case "msb:int":
      return "number";
    case "xs:boolean":
    case "msb:boolean":
      return "boolean";
    case undefined:
      return "unknown";
    default:
      return `unknown /* ${type} */`;
  }
}
