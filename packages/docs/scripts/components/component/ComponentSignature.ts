import { text, type Children } from "@alloy-js/core";
import {
  br,
  group,
  hbr,
  ifBreak,
  indent,
  List,
  sbr,
  Show,
} from "@alloy-js/core/stc";
import type {
  ApiInterface,
  ApiPropertySignature,
} from "@microsoft/api-extractor-model";
import type { ComponentApi } from "../../build-json.js";
import { flattenedMembers } from "../../utils.js";
import { Code, MdxParagraph } from "../stc/index.js";

export interface ComponentSignatureProps {
  component: ComponentApi;
  propsType?: ApiInterface;
}

export function ComponentSignature(props: ComponentSignatureProps) {
  let paramHelp: Children = "";
  let stcParamHelp: Children = "";
  const hasChildren =
    props.propsType &&
    props.propsType.members.some((prop) => prop.displayName === "children");
  // construct the code snippet for the component signature
  if (props.propsType) {
    const members = (
      flattenedMembers(props.propsType) as ApiPropertySignature[]
    ).filter((prop) => prop.name !== "children");
    paramHelp = List({ line: true }).children(...members.map(propHelp));

    stcParamHelp = List({
      comma: true,
      line: true,
      ender: ifBreak({ flatContents: "", children: "," }),
    }).children(...members.map(stcPropHelp));
  }

  const name = props.component.componentFunction.name;
  const packageSrc =
    props.component.componentFunction.getAssociatedPackage()?.displayName;

  const jsxCode = text`
    import { ${name} } from "${packageSrc}";${hbr()}${hbr()}

    ${group().text`<${name}${indent().children(
      paramHelp === "" ? "" : br(),
      paramHelp,
    )}${sbr()}${hasChildren ? ">" : " />"}`}
    ${Show({ when: hasChildren }).text`
      ${indent().children(hbr(), "{children}")}
      ${hbr()}
      </${name}> 
    `}

  `;

  const stcCode = text`
    import { ${name} } from "${packageSrc}/stc";${hbr()}${hbr()}

    ${group().text`
      ${name}({${indent().children(
        stcParamHelp === "" ? "" : br(),
        stcParamHelp,
      )}${br()}}).children(children)
    `}
  `;

  return MdxParagraph().code`
    <Tabs syncKey="component-style">
      <TabItem label="jsx">
        ${Code({ language: "tsx" }).children(jsxCode)}
      </TabItem>
      <TabItem label="stc">
        ${Code({ language: "ts" }).children(stcCode)}
      </TabItem>
    </Tabs>
  `;
}

function propHelp(prop: ApiPropertySignature) {
  if (!prop.propertyTypeExcerpt) {
    return undefined;
  }
  if (prop.propertyTypeExcerpt.text === "boolean") {
    return `${prop.name}`;
  } else if (prop.propertyTypeExcerpt.text === "string") {
    return `${prop.name}="string"`;
  } else if (prop.propertyTypeExcerpt.text === "number") {
    return `${prop.name}={number}`;
  } else {
    return `${prop.name}={${prop.propertyTypeExcerpt.text}}`;
  }
}

function stcPropHelp(prop: ApiPropertySignature) {
  return `${prop.name}: ${prop.propertyTypeExcerpt?.text}`;
}
