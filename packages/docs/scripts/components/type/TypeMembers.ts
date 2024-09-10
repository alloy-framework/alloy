import { code, mapJoin, type Children } from "@alloy-js/core";
import type {
  ApiInterface,
  HeritageType,
} from "@microsoft/api-extractor-model";
import { Excerpt, InterfaceMembers } from "../stc/index.js";

export interface TypeMembersProps {
  type: ApiInterface;
}

export function TypeMembers(props: TypeMembersProps) {
  let extendsInfo: Children = "";

  if (props.type.extendsTypes.length > 0) {
    const extendsItems = mapJoin(
      props.type.extendsTypes as HeritageType[],
      (type) => Excerpt({ excerpt: type.excerpt, context: props.type }),
      { joiner: "," },
    );

    extendsInfo = code`Extends ${extendsItems}`;
  }
  return code`
    ### Members

    ${extendsInfo}
    
    ${InterfaceMembers({ iface: props.type })}
  `;
}
