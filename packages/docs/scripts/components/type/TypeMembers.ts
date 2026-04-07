import { code, mapJoin, type Children } from "@alloy-js/core";
import {
  ApiClass,
  ApiItemKind,
  type ApiInterface,
  type HeritageType,
} from "@microsoft/api-extractor-model";
import {
  Excerpt,
  InterfaceMembers,
  MdxParagraph,
  MdxSection,
} from "../stc/index.js";

export interface TypeMembersProps {
  type: ApiInterface | ApiClass;
}

export function TypeMembers(props: TypeMembersProps) {
  let extendsInfo: Children = "";

  const extendsTypes: HeritageType[] =
    props.type.kind === ApiItemKind.Class ?
      (props.type as ApiClass).extendsType ?
        [(props.type as ApiClass).extendsType!]
      : []
    : (props.type as ApiInterface).extendsTypes.slice();

  if (extendsTypes.length > 0) {
    const extendsItems = mapJoin(
      () => extendsTypes,
      (type) => Excerpt({ excerpt: type.excerpt, context: props.type }),
      { joiner: "," },
    );

    extendsInfo = code`Extends ${extendsItems}`;
  }
  return MdxSection({ title: "Members" }).children(
    extendsInfo && MdxParagraph().children(extendsInfo),
    InterfaceMembers({ iface: props.type as ApiInterface }),
  );
}
