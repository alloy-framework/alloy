import {
  Children,
  createSymbolSlot,
  List,
  MemberDeclaration,
  MemberName,
  Namekey,
  Refkey,
} from "@alloy-js/core";
import {
  AccessModifiers,
  computeModifiersPrefix,
  getAccessModifier,
  makeModifiers,
} from "../../modifiers.js";
import { createPropertySymbol } from "../../symbols/factories.js";
import { AttributeList, AttributesProp } from "../attributes/attributes.jsx";
import { DocWhen } from "../doc/comment.jsx";

/** Property modifiers. */
export interface PropertyModifiers {
  readonly new?: boolean;
  readonly static?: boolean;
  readonly virtual?: boolean;
  readonly sealed?: boolean;
  readonly override?: boolean;
  readonly abstract?: boolean;
  readonly extern?: boolean;
  readonly readonly?: boolean;
  /**
   * Set required modifier on property
   * https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/required
   */
  readonly required?: boolean;
}

const getModifiers = makeModifiers<PropertyModifiers>([
  "new",
  "static",
  "virtual",
  "sealed",
  "override",
  "abstract",
  "extern",
  "readonly",
  "required",
]);

/** Properties for {@link Property} component */
export interface PropertyProps extends AccessModifiers, PropertyModifiers {
  name: Namekey | string;
  refkey?: Refkey;

  /** Property type */
  type: Children;

  /** If property should have a getter */
  get?: boolean;

  /** If property should have a setter */
  set?: boolean;

  /** If property should only be set on the type creation */
  init?: boolean;

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
   * Property initializer
   * @example `<ClassProperty name="My" get set init={42} />`
   *
   * ```cs
   * int My { get; set; } = 42;
   * ```
   */
  initializer?: Children;

  /**
   * Define attributes to attach
   * @example
   * ```tsx
   * <Property name="MyProp" attributes={[
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
 * Render a C# class property.
 *
 * @example `<ClassProperty public name="My" get set  />`
 *
 * ```cs
 * public int My { get; set; };
 * ```
 */
export function Property(props: PropertyProps) {
  const TypeSlot = createSymbolSlot();

  const propertySymbol = createPropertySymbol(props.name, {
    refkeys: props.refkey,
    isNullable: props.nullable,
    type: TypeSlot.firstSymbol,
  });

  const modifiers = computeModifiersPrefix([
    getAccessModifier(props),
    getModifiers(props),
  ]);

  if (props.init && props.set) {
    throw new Error(
      `Cannot use 'init' and 'set' together on property '${name}'`,
    );
  }
  // note that scope wraps the method decl so that the params get the correct scope
  return (
    <MemberDeclaration symbol={propertySymbol}>
      <DocWhen doc={props.doc} />
      <AttributeList attributes={props.attributes} endline />
      {modifiers}
      <TypeSlot>{props.type}</TypeSlot>
      {props.nullable && "?"} <MemberName /> {"{ "}
      <List joiner=" ">
        {props.get && "get;"}
        {props.set && "set;"}
        {props.init && "init;"}
      </List>
      {" }"}
      {props.initializer && (
        <PropertyInitializer>{props.initializer}</PropertyInitializer>
      )}
    </MemberDeclaration>
  );
}

function PropertyInitializer(props: { children: Children }) {
  return (
    <group>
      {" ="}
      <indent>
        <line />
        {props.children};
      </indent>
    </group>
  );
}
