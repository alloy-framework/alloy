import * as core from "@alloy-js/core";
import {
  AccessModifier,
  getAccessModifier,
  getMethodModifier,
  MethodModifier,
} from "../modifiers.js";
import { CSharpElements, useCSharpNamePolicy } from "../name-policy.js";
import { CSharpOutputSymbol } from "../symbols/csharp-output-symbol.js";
import { createCSharpMemberScope, useCSharpScope } from "../symbols/scopes.js";
import { Name } from "./Name.js";
import { ParameterProps, Parameters } from "./Parameters.js";

// properties for creating a class
export interface ClassProps extends Omit<core.DeclarationProps, "nameKind"> {
  name: string;
  accessModifier?: AccessModifier;
  typeParameters?: Record<string, core.Refkey>;
}

// a C# class declaration
export function Class(props: ClassProps) {
  const name = useCSharpNamePolicy().getName(props.name!, "class");
  const scope = useCSharpScope();

  const thisClassSymbol = scope.binder.createSymbol<CSharpOutputSymbol>({
    name: name,
    scope,
    refkey: props.refkey ?? core.refkey(props.name),
  });

  // this creates a new scope for the class definition.
  // members will automatically "inherit" this scope so
  // that refkeys to them will produce the fully-qualified
  // name e.g. Foo.Bar.
  const thisClassScope = createCSharpMemberScope(
    scope.binder,
    scope,
    thisClassSymbol,
    "class-decl",
  );

  let typeParams: core.Children;
  if (props.typeParameters) {
    const typeParamNames = new Array<string>();
    for (const entry of Object.entries(props.typeParameters)) {
      typeParamNames.push(
        useCSharpNamePolicy().getName(entry[0], "type-parameter"),
      );
      // create a symbol for each type param so its
      // refkey resolves to the type param's name
      scope.binder.createSymbol<CSharpOutputSymbol>({
        name: entry[0],
        scope: thisClassScope,
        refkey: entry[1],
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

  return (
    <core.Declaration symbol={thisClassSymbol}>
      {getAccessModifier(props.accessModifier)}class <Name />
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

export interface ClassConstructorProps {
  accessModifier?: AccessModifier;
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
  const name = useCSharpNamePolicy().getName(scope.owner.name, "class-method");
  const ctorSymbol = scope.binder.createSymbol<CSharpOutputSymbol>({
    name: name,
    scope,
    refkey: props.refkey ?? core.refkey(name),
  });

  // scope for ctor declaration
  const ctorDeclScope = createCSharpMemberScope(
    scope.binder,
    scope,
    ctorSymbol,
    "constructor-decl",
  );

  const accessModifier = getAccessModifier(props.accessModifier);
  const params =
    props.parameters ? <Parameters parameters={props.parameters} /> : "";

  // note that scope wraps the ctor decl so that the params get the correct scope
  return (
    <core.Declaration symbol={ctorSymbol}>
      <core.Scope value={ctorDeclScope}>
        {accessModifier}
        <Name />({params})<core.Block newline>{props.children}</core.Block>
      </core.Scope>
    </core.Declaration>
  );
}

// properties for creating a class member
export interface ClassMemberProps {
  name: string;
  type: core.Children;
  accessModifier?: AccessModifier;
  refkey?: core.Refkey;
}

// a C# class member (i.e. a field within a class like "private int count")
export function ClassMember(props: ClassMemberProps) {
  let nameElement: CSharpElements = "class-member-private";
  if (props.accessModifier === "public") {
    nameElement = "class-member-public";
  }
  const name = useCSharpNamePolicy().getName(props.name, nameElement);
  const scope = useCSharpScope();
  if (scope.kind !== "member" || scope.name !== "class-decl") {
    throw new Error(
      "can't define a class member outside of a class-decl scope",
    );
  }

  const memberSymbol = scope.binder.createSymbol<CSharpOutputSymbol>({
    name: name,
    scope,
    refkey: props.refkey ?? core.refkey(props.name),
  });

  return (
    <core.Declaration symbol={memberSymbol}>
      {getAccessModifier(props.accessModifier)}
      {props.type} <Name />
    </core.Declaration>
  );
}

// properties for creating a method
export interface ClassMethodProps
  extends Omit<core.DeclarationProps, "nameKind"> {
  name: string;
  accessModifier?: AccessModifier;
  methodModifier?: MethodModifier;
  parameters?: Array<ParameterProps>;
  returns?: core.Children;
}

// a C# class method
export function ClassMethod(props: ClassMethodProps) {
  const name = useCSharpNamePolicy().getName(props.name!, "class-method");
  const scope = useCSharpScope();
  if (scope.kind !== "member" || scope.name !== "class-decl") {
    throw new Error("can't define a class method outside of a class scope");
  }

  const methodSymbol = scope.binder.createSymbol<CSharpOutputSymbol>({
    name: name,
    scope,
    refkey: props.refkey ?? core.refkey(props.name),
  });

  // scope for method declaration
  const methodScope = createCSharpMemberScope(
    scope.binder,
    scope,
    methodSymbol,
    "method-decl",
  );

  const accessModifier = getAccessModifier(props.accessModifier);
  const methodModifier = getMethodModifier(props.methodModifier);
  const params =
    props.parameters ? <Parameters parameters={props.parameters} /> : "";
  const returns = props.returns ?? "void";

  // note that scope wraps the method decl so that the params get the correct scope
  return (
    <core.Declaration symbol={methodSymbol}>
      <core.Scope value={methodScope}>
        {accessModifier}
        {methodModifier}
        {returns} <Name />({params})
        <core.Block newline>{props.children}</core.Block>
      </core.Scope>
    </core.Declaration>
  );
}
