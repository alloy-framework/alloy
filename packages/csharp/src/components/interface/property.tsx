import {
  Block,
  Children,
  List,
  MemberDeclaration,
  Refkey,
} from "@alloy-js/core";
import {
  AccessModifiers,
  computeModifiersPrefix,
  getAccessModifier,
  makeModifiers,
} from "../../modifiers.js";
import { useCSharpNamePolicy } from "../../name-policy.js";
import { CSharpSymbol } from "../../symbols/csharp.js";
import { useNamedTypeScope } from "../../symbols/named-type.js";
import { DocWhen } from "../doc/comment.jsx";

/** Method modifiers. Can only be one. */
export interface InterfacePropertyModifiers {
  readonly new?: boolean;
}

export const getMethodModifier = makeModifiers<InterfacePropertyModifiers>([
  "new",
]);

// properties for creating a method
export interface InterfacePropertyProps
  extends AccessModifiers,
    InterfacePropertyModifiers {
  name: string;
  refkey?: Refkey;

  /** Property type */
  type: Children;

  /** If property should have a getter */
  get?: boolean;

  /** If property should have a setter */
  set?: boolean;

  /** Doc comment */
  doc?: Children;
}

// a C# interface property
export function InterfaceProperty(props: InterfacePropertyProps) {
  const name = useCSharpNamePolicy().getName(props.name, "class-property");
  const scope = useNamedTypeScope();

  if (scope.typeKind !== "interface") {
    throw new Error(
      "can't define an interface method outside of an interface scope",
    );
  }

  const propertySymbol = new CSharpSymbol(name, scope.members, {
    refkeys: props.refkey,
  });

  const modifiers = computeModifiersPrefix([
    getAccessModifier(props),
    getMethodModifier(props),
  ]);
  // note that scope wraps the method decl so that the params get the correct scope
  return (
    <MemberDeclaration symbol={propertySymbol}>
      <DocWhen doc={props.doc} />
      {modifiers}
      {props.type} {name}{" "}
      <Block newline inline>
        <List joiner=" ">
          {props.get && "get;"}
          {props.set && "set;"}
        </List>
      </Block>
    </MemberDeclaration>
  );
}
