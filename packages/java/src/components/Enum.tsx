import { Block, Children, List } from "@alloy-js/core";
import { useJavaNamePolicy } from "../name-policy.js";
import { ArgumentList } from "./ArgumentList.jsx";
import { Declaration, DeclarationProps } from "./Declaration.js";
import { ImplementsClause } from "./ImplementsClause.jsx";
import { LexicalScope } from "./LexicalScope.jsx";
import { ModifierProps, Modifiers } from "./Modifiers.jsx";
import { Name } from "./Name.js";

export interface EnumProps extends DeclarationProps, ModifierProps {
  implements?: Children[];
}

export function Enum(props: EnumProps) {
  const name = useJavaNamePolicy().getName(props.name, "enum");

  return (
    <Declaration {...props} name={name}>
      <group>
        <Modifiers {...props} />
        enum <Name />
        <ImplementsClause interfaces={props.implements} />
      </group>{" "}
      <LexicalScope>
        <Block>{props.children}</Block>
      </LexicalScope>
    </Declaration>
  );
}

export interface EnumMemberProps extends ModifierProps {
  name: string;
  args?: Children[];
}

export function EnumMember(props: EnumMemberProps) {
  const name = useJavaNamePolicy().getName(props.name, "enum-member");

  return (
    <>
      {name}
      <ArgumentList args={props.args} omitParensWhenEmpty />
    </>
  );
}

export interface EnumMemberListProps {
  children: Children;
}

/**
 * Create a list of enum members, joining with a comma and a hardline, and
 * ending with a semicolon.
 */
export function EnumMemberList(props: EnumMemberListProps) {
  return <List children={props.children} comma hardline ender=";" />;
}
