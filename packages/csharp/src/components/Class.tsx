import * as core from "@alloy-js/core";
import {
  AccessModifiers,
  computeModifiersPrefix,
  getAccessModifier,
} from "../modifiers.js";
import { CSharpElements, useCSharpNamePolicy } from "../name-policy.js";
import { CSharpOutputSymbol } from "../symbols/csharp-output-symbol.js";
import { CSharpMemberScope, useCSharpScope } from "../symbols/scopes.js";
import { Name } from "./Name.js";
import { ParameterProps, Parameters } from "./Parameters.js";

// properties for creating a class
export interface ClassProps
  extends Omit<core.DeclarationProps, "nameKind">,
    AccessModifiers {
  name: string;
  refkey?: core.Refkey;
  typeParameters?: Record<string, core.Refkey>;
}

// a C# class declaration
export function Class(props: ClassProps) {
  const name = useCSharpNamePolicy().getName(props.name!, "class");

  const thisClassSymbol = new CSharpOutputSymbol(name, {
    refkeys: props.refkey,
  });

  // this creates a new scope for the class definition.
  // members will automatically "inherit" this scope so
  // that refkeys to them will produce the fully-qualified
  // name e.g. Foo.Bar.
  const thisClassScope = new CSharpMemberScope("class-decl", {
    owner: thisClassSymbol,
  });

  let typeParams: core.Children;
  if (props.typeParameters) {
    const typeParamNames = new Array<string>();
    for (const entry of Object.entries(props.typeParameters)) {
      typeParamNames.push(
        useCSharpNamePolicy().getName(entry[0], "type-parameter"),
      );
      // create a symbol for each type param so its
      // refkey resolves to the type param's name
      new CSharpOutputSymbol(entry[0], {
        scope: thisClassScope,
        refkeys: entry[1],
      });
    }
    typeParams = (
      <group>
        {"<"}
        <core.For each={typeParamNames} comma line>
          {(name) => name}
        </core.For>
        {">"}
      </group>
    );
  }

  const modifiers = computeModifiersPrefix([getAccessModifier(props)]);
  return (
    <core.Declaration symbol={thisClassSymbol}>
      {modifiers}class <Name />
      {typeParams}
      {!props.children && ";"}
      {props.children && (
        <core.Block newline>
          <core.Scope value={thisClassScope}>{props.children}</core.Scope>
        </core.Block>
      )}
    </core.Declaration>
  );
}

export interface ClassConstructorProps extends AccessModifiers {
  parameters?: Array<ParameterProps>;
  refkey?: core.Refkey;
  symbol?: core.OutputSymbol;
  children?: core.Children;
}

// a C# class constructor
export function ClassConstructor(props: ClassConstructorProps) {
  const scope = useCSharpScope();
  if (scope.kind !== "member" || scope.name !== "class-decl") {
    throw new Error(
      "can't define a class constructor outside of a class-decl scope",
    );
  }

  // fetch the class name from the scope
  const name = useCSharpNamePolicy().getName(scope.owner!.name, "class-method");
  const ctorSymbol = new CSharpOutputSymbol(name, {
    scope,
    refkeys: props.refkey ?? core.refkey(name),
  });

  // scope for ctor declaration
  const ctorDeclScope = new CSharpMemberScope("constructor-decl", {
    owner: ctorSymbol,
  });

  const modifiers = computeModifiersPrefix([getAccessModifier(props)]);

  const params =
    props.parameters ? <Parameters parameters={props.parameters} /> : "";

  // note that scope wraps the ctor decl so that the params get the correct scope
  return (
    <core.Declaration symbol={ctorSymbol}>
      <core.Scope value={ctorDeclScope}>
        {modifiers}
        <Name />({params})<core.Block newline>{props.children}</core.Block>
      </core.Scope>
    </core.Declaration>
  );
}

// properties for creating a class member
export interface ClassMemberProps extends AccessModifiers {
  name: string;
  type: core.Children;
  refkey?: core.Refkey;
}

// a C# class member (i.e. a field within a class like "private int count")
export function ClassMember(props: ClassMemberProps) {
  let nameElement: CSharpElements = "class-member-private";
  if (props.public) {
    nameElement = "class-member-public";
  }
  const name = useCSharpNamePolicy().getName(props.name, nameElement);
  const scope = useCSharpScope();
  if (scope.kind !== "member" || scope.name !== "class-decl") {
    throw new Error(
      "can't define a class member outside of a class-decl scope",
    );
  }

  const memberSymbol = new CSharpOutputSymbol(name, {
    scope,
    refkeys: props.refkey ?? core.refkey(props.name),
  });

  const modifiers = computeModifiersPrefix([getAccessModifier(props)]);
  return (
    <core.Declaration symbol={memberSymbol}>
      {modifiers}
      {props.type} <Name />
    </core.Declaration>
  );
}
