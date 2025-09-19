import { For, List, code } from "@alloy-js/core";
import {
  InterfaceDeclaration,
  InterfaceMember,
  VarDeclaration,
} from "@alloy-js/typescript";
import { XmlAttribute, XmlSchema } from "../collect-schemas.js";

export function XmlComponent(props: { schema: XmlSchema }) {
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
      <XmlComponentFunction schema={props.schema} />
    </List>
  );
}

function XmlComponentFunction(props: { schema: XmlSchema }) {
  return (
    <VarDeclaration
      export
      const
      name={props.schema.tagName}
      doc={props.schema.description}
    >
      {code`makeTag<${props.schema.tagName}Props>("${props.schema.tagName}")`}
    </VarDeclaration>
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
      optional={props.attr.use !== "required"}
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
