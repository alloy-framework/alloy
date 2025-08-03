import {
  Block,
  Children,
  List,
  MemberDeclaration,
  refkey,
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
import { CSharpOutputSymbol } from "../../symbols/csharp-output-symbol.js";
import {
  CSharpMemberScope,
  useCSharpMemberScope,
} from "../../symbols/scopes.js";
import { AttributeList, AttributesProp } from "../attributes/attributes.jsx";
import { DocWhen } from "../doc/comment.jsx";

/** Method modifiers. Can only be one. */
export interface InterfacePropertyModifiers {
  readonly new?: boolean;
}

const getModifiers = makeModifiers<InterfacePropertyModifiers>(["new"]);

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

  /**
   * Property initializer
   * @example `<ClassProperty name="My" get set nullable />`
   *
   * ```cs
   * int? My { get; set; };
   * ```
   */
  nullable?: boolean;

  /**
   * Define attributes to attach
   * @example
   * ```tsx
   * <InterfaceProperty name="MyProp" attributes={[
   *  <Attribute name="Test" />
   *  <Attribute name="Test2" args={["arg1", "arg2"]} />
   * ]} />
   * ```
   * This will produce:
   * ```csharp
   * [Test]
   * [Test2("arg1", "arg2")]
   * int MyProp { get; set; }
   * ```
   */
  attributes?: AttributesProp;
}

/**
 * Render a C# interface property.
 *
 * @example `<InterfaceProperty public name="My" get set  />`
 *
 * ```cs
 * public int My { get; set; };
 * ```
 */
export function InterfaceProperty(props: InterfacePropertyProps) {
  const name = useCSharpNamePolicy().getName(props.name, "class-property");

  const scope = useCSharpMemberScope(["interface-decl"]);

  const propertySymbol = new CSharpOutputSymbol(name, {
    scope,
    refkeys: props.refkey ?? refkey(props.name),
  });

  // scope for property declaration
  const propertyScope = new CSharpMemberScope("property-decl", {
    owner: propertySymbol,
  });

  const modifiers = computeModifiersPrefix([
    getAccessModifier(props),
    getModifiers(props),
  ]);
  // note that scope wraps the method decl so that the params get the correct scope
  return (
    <MemberDeclaration symbol={propertySymbol}>
      <Scope value={propertyScope}>
        <DocWhen doc={props.doc} />
        <AttributeList attributes={props.attributes} endline />
        {modifiers}
        {props.type}
        {props.nullable && "?"} {name}{" "}
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
