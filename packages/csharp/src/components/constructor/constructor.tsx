import type { Refkey } from "@alloy-js/core";
import {
  Block,
  For,
  Indent,
  MemberDeclaration,
  MemberName,
} from "@alloy-js/core";
import type { Children } from "@alloy-js/core/jsx-runtime";

import { MethodScope } from "#components/method-scope.jsx";

import type { AccessModifiers } from "../../modifiers.js";
import { computeModifiersPrefix, getAccessModifier } from "../../modifiers.js";
import { useNamedTypeScope } from "../../scopes/contexts.js";
import { MethodSymbol } from "../../symbols/method.js";
import { DocWhen } from "../doc/comment.jsx";
import type { ParameterProps } from "../parameters/parameters.jsx";
import { Parameters } from "../parameters/parameters.jsx";

/**
 * Properties for {@link Constructor} component.
 */
export interface ConstructorProps extends AccessModifiers {
  /** Constructor parameters */
  parameters?: ParameterProps[];

  /** Doc comment */
  doc?: Children;

  /** Refkey */
  refkey?: Refkey;

  /**
   * Arguments to pass to the base class constructor.
   * Renders `: base(args)` between parameter list and body.
   *
   * @example
   * ```tsx
   * <Constructor public baseConstructor={["name", "42"]}>
   * ```
   * This will produce:
   * ```csharp
   * public MyClass(...) : base(name, 42)
   * {
   * }
   * ```
   */
  baseConstructor?: Children[];

  /**
   * Arguments to pass to another constructor in the same class.
   * Renders `: this(args)` between parameter list and body.
   *
   * @example
   * ```tsx
   * <Constructor public thisConstructor={["0", "0"]}>
   * ```
   * This will produce:
   * ```csharp
   * public MyClass() : this(0, 0)
   * {
   * }
   * ```
   */
  thisConstructor?: Children[];

  /** Constructor body */
  children?: Children;
}

export function Constructor(props: ConstructorProps) {
  if (props.baseConstructor && props.thisConstructor) {
    throw new Error(
      "Cannot use both 'baseConstructor' and 'thisConstructor' on the same constructor",
    );
  }

  const scope = useNamedTypeScope();

  const name = scope.ownerSymbol.name;

  const ctorSymbol = new MethodSymbol(name, scope.members, "constructor", {
    refkeys: props.refkey,
  });

  const modifiers = computeModifiersPrefix([getAccessModifier(props)]);

  const initializer = props.baseConstructor ? (
    <ConstructorInitializer keyword="base" args={props.baseConstructor} />
  ) : props.thisConstructor ? (
    <ConstructorInitializer keyword="this" args={props.thisConstructor} />
  ) : null;

  return (
    <MemberDeclaration symbol={ctorSymbol}>
      <MethodScope>
        <DocWhen doc={props.doc} />
        {modifiers}
        <MemberName />
        <Parameters parameters={props.parameters} />
        {initializer}
        <Block newline>{props.children}</Block>
      </MethodScope>
    </MemberDeclaration>
  );
}

interface ConstructorInitializerProps {
  keyword: "base" | "this";
  args: Children[];
}

function ConstructorInitializer(props: ConstructorInitializerProps) {
  return (
    <group>
      {" : "}
      {props.keyword}(
      <Indent nobreak>
        <For each={props.args} joiner={", "}>
          {(arg) => (
            <>
              <softline />
              {arg}
            </>
          )}
        </For>
      </Indent>
      <softline />)
    </group>
  );
}
