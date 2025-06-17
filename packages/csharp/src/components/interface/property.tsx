import {
  Block,
  Children,
  List,
  MemberDeclaration,
  Refkey,
  Scope,
} from "@alloy-js/core";
import {
  AccessModifiers,
  computeModifiersPrefix,
  getAccessModifier,
  makeModifiers,
} from "../../modifiers.js";
import { useCSharpNamePolicy } from "../../name-policy.js";

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
}

// a C# interface property
export function InterfaceProperty(props: InterfacePropertyProps) {
  const name = useCSharpNamePolicy().getName(props.name, "class-property");
  // const scope = useCSharpScope();
  // if (scope.kind !== "member" || scope.name !== "interface-decl") {
  //   throw new Error(
  //     "can't define an interface method outside of an interface scope",
  //   );
  // }

  // const propertySymbol = new CSharpOutputSymbol(name, {
  //   scope,
  //   refkeys: props.refkey ?? refkey(props.name),
  // });

  // scope for property declaration
  // const propertyScope = new CSharpMemberScope("property-decl", {
  //   owner: propertySymbol,
  // });

  const modifiers = computeModifiersPrefix([
    getAccessModifier(props),
    getMethodModifier(props),
  ]);
  // note that scope wraps the method decl so that the params get the correct scope
  return (
    <MemberDeclaration {...props}>
      <Scope name={props.name} kind="property-decl">
        {modifiers}
        {props.type} {name}{" "}
        <Block newline inline>
          <List joiner=" ">
            {props.get && "get;"}
            {props.set && "set;"}
          </List>
        </Block>
      </Scope>
    </MemberDeclaration>
  );
}
