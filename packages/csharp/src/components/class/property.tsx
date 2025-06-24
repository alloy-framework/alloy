import {
  Block,
  Children,
  code,
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
import { CSharpMemberScope, useCSharpScope } from "../../symbols/scopes.js";
import { DocWhen } from "../doc/comment.jsx";

/** Method modifiers. Can only be one. */
export interface ClassPropertyModifiers {
  readonly new?: boolean;
  readonly static?: boolean;
  readonly virtual?: boolean;
  readonly sealed?: boolean;
  readonly override?: boolean;
  readonly abstract?: boolean;
  readonly extern?: boolean;
  readonly readonly?: boolean;
}

const getModifiers = makeModifiers<ClassPropertyModifiers>([
  "new",
  "static",
  "virtual",
  "sealed",
  "override",
  "abstract",
  "extern",
  "readonly",
]);

/** Properties for {@link ClassProperty} component */
export interface ClassPropertyProps
  extends AccessModifiers,
    ClassPropertyModifiers {
  name: string;
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
export function ClassProperty(props: ClassPropertyProps) {
  const name = useCSharpNamePolicy().getName(props.name, "class-property");
  const scope = useCSharpScope();
  if (
    scope.kind !== "member" ||
    (scope.name !== "class-decl" && scope.name !== "record-decl")
  ) {
    throw new Error(
      "can't define an interface method outside of an interface scope",
    );
  }

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

  if (props.init && props.set) {
    throw new Error(
      `Cannot use 'init' and 'set' together on property '${name}'`,
    );
  }
  // note that scope wraps the method decl so that the params get the correct scope
  return (
    <MemberDeclaration symbol={propertySymbol}>
      <Scope value={propertyScope}>
        <DocWhen doc={props.doc} />
        {modifiers}
        {props.type}
        {props.nullable && "?"} {name}{" "}
        <Block newline inline>
          <List joiner=" ">
            {props.get && "get;"}
            {props.set && "set;"}
            {props.init && "init;"}
          </List>
        </Block>
        {props.init && code` = ${props.init};`}
      </Scope>
    </MemberDeclaration>
  );
}
