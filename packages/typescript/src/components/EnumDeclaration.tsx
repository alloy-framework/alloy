import {
  Declaration as CoreDeclaration,
  Indent,
  MemberScope,
  Name,
  OutputSymbolFlags,
  mapJoin,
  refkey,
  useBinder,
} from "@alloy-js/core";
import { useTSNamePolicy } from "../name-policy.js";
import { createTSSymbol, useTSScope } from "../symbols/index.js";
import { BaseDeclarationProps } from "./Declaration.js";
import { EnumMember } from "./EnumMember.jsx";
import { JSDoc } from "./JSDoc.jsx";

/**
 * A descriptor for an enum member.
 */
export interface EnumMemberDescriptor {
  /**
   * The JavaScript value of the enum member.
   */
  jsValue: string | number;
  /**
   * Documentation for the enum member.
   */
  doc?: string | string[];
}

export interface EnumDeclarationProps extends BaseDeclarationProps {
  /**
   * The members of the enum.
   */
  members?: Record<string, string | number | EnumMemberDescriptor>;
  /**
   * Documentation for the enum.
   */
  doc?: string | string[];
}

/**
 * A TypeScript enum declaration.
 */
export function EnumDeclaration(props: EnumDeclarationProps) {
  const name = useTSNamePolicy().getName(props.name, "enum");
  const binder = useBinder();
  const scope = useTSScope();
  const sym = createTSSymbol({
    binder,
    scope,
    name: name,
    refkey: props.refkey ?? refkey(name),
    default: props.default,
    export: props.export,
    flags: OutputSymbolFlags.StaticMemberContainer,
  });

  const jsValueMembers = mapJoin(
    Object.entries(props.members ?? {}),
    ([name, value]) => {
      const jsValue = typeof value === "object" ? value.jsValue : value;
      const doc = typeof value === "object" ? value.doc : undefined;
      return <EnumMember name={name} jsValue={jsValue} doc={doc} />;
    },
    { joiner: ",\n" },
  );

  return <CoreDeclaration symbol={sym}>
    <JSDoc content={props.doc}>{props.export ? "export " : ""}{props.default ? "default " : ""}enum <Name /> {"{"}
      <MemberScope owner={sym}>
        <Indent>
        {jsValueMembers}{jsValueMembers.length > 0 && props.children && ",\n"}{props.children}
        </Indent>
      </MemberScope>
    {"}"}</JSDoc>
  </CoreDeclaration>;
}
