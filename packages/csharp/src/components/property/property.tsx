import {
  Block,
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

  /**
   * If property should have a getter. Pass `true` for an auto-property getter (`get;`),
   * or pass children for a getter with a body.
   *
   * @example auto-property
   * ```tsx
   * <Property name="Name" type="string" get set />
   * ```
   * Produces: `string Name { get; set; }`
   *
   * @example with body
   * ```tsx
   * <Property name="Name" type="string" get={<>return _name;</>} set />
   * ```
   * Produces:
   * ```csharp
   * string Name
   * {
   *     get { return _name; }
   *     set;
   * }
   * ```
   */
  get?: boolean | Children;

  /**
   * If property should have a setter. Pass `true` for an auto-property setter (`set;`),
   * or pass children for a setter with a body.
   *
   * @example with body
   * ```tsx
   * <Property name="Value" type="int" get set={<>_value = value;</>} />
   * ```
   * Produces:
   * ```csharp
   * int Value
   * {
   *     get;
   *     set { _value = value; }
   * }
   * ```
   */
  set?: boolean | Children;

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

  const hasAccessorBody =
    (props.get && props.get !== true) || (props.set && props.set !== true);

  return (
    <MemberDeclaration symbol={propertySymbol}>
      <DocWhen doc={props.doc} />
      <AttributeList attributes={props.attributes} endline />
      {modifiers}
      <TypeSlot>{props.type}</TypeSlot>
      {props.nullable && "?"} <MemberName />
      {hasAccessorBody ?
        <AccessorBlock get={props.get} set={props.set} init={props.init} />
      : <AutoAccessors
          get={props.get}
          set={props.set}
          init={props.init}
          initializer={props.initializer}
        />
      }
    </MemberDeclaration>
  );
}

interface AutoAccessorsProps {
  get?: boolean | Children;
  set?: boolean | Children;
  init?: boolean;
  initializer?: Children;
}

function AutoAccessors(props: AutoAccessorsProps) {
  return (
    <group>
      {" "}
      {"{ "}
      <List joiner=" ">
        {props.get && "get;"}
        {props.set && "set;"}
        {props.init && "init;"}
      </List>
      {" }"}
      {props.initializer && (
        <>
          {" ="}
          <indent>
            <line />
            {props.initializer};
          </indent>
        </>
      )}
    </group>
  );
}

interface AccessorBlockProps {
  get?: boolean | Children;
  set?: boolean | Children;
  init?: boolean;
}

function AccessorBlock(props: AccessorBlockProps) {
  return (
    <Block newline>
      <List hardline>
        {props.get && <Accessor keyword="get" body={props.get} />}
        {props.set && <Accessor keyword="set" body={props.set} />}
        {props.init && "init;"}
      </List>
    </Block>
  );
}

interface AccessorProps {
  keyword: string;
  body: boolean | Children;
}

function Accessor(props: AccessorProps) {
  if (props.body === true) {
    return <>{props.keyword};</>;
  }
  return (
    <>
      {props.keyword}{" "}
      <Block inline>{props.body}</Block>
    </>
  );
}

