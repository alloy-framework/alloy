import {
  refkey,
  Declaration as CoreDeclaration,
  useBinder,
  Scope,
  mapJoin,
} from "@alloy-js/core";
import { useTSNamePolicy } from "../name-policy.js";
import { DeclarationProps } from "./Declaration.js";
import { Name } from "./Name.js";
import {
  createTSMemberScope,
  createTSSymbol,
  useTSScope,
} from "../symbols/index.js";
import { EnumMember } from "./EnumMember.jsx";

export interface EnumDeclarationProps
  extends Omit<DeclarationProps, "nameKind"> {
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
  });

  sym.memberScope = createTSMemberScope(binder, scope, sym);

  const jsValueMembers = mapJoin(
    Object.entries(props.jsValue ?? {}),
    ([name, value]) => {
      return <EnumMember name={name} jsValue={value} />;
    },
    { joiner: ",\n" },
  );

  return <CoreDeclaration symbol={sym}>
    {props.export ? "export " : ""}{props.default ? "default " : ""}enum <Name /> {"{"}
      <Scope value={sym.memberScope}>
        {jsValueMembers}{jsValueMembers.length > 0 && props.children && ",\n"}{props.children}
      </Scope>
    {"}"}
  </CoreDeclaration>;
}
