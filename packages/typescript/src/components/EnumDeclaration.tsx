import {
  Declaration as CoreDeclaration,
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
export interface EnumDeclarationProps extends BaseDeclarationProps {
  /**
   * A JS object representing the enum member names and values.
   */
  jsValue?: Record<string, string | number>;
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
    () => Object.entries(props.jsValue ?? {}),
    ([name, value]) => {
      return <EnumMember name={name} jsValue={value} />;
    },
    { joiner: ",\n" },
  );

  return <CoreDeclaration symbol={sym}>
    {props.export ? "export " : ""}{props.default ? "default " : ""}enum <Name /> {"{"}
      <MemberScope owner={sym}>
        {jsValueMembers}{jsValueMembers().length > 0 && props.children && ",\n"}{props.children}
      </MemberScope>
    {"}"}
  </CoreDeclaration>;
}
