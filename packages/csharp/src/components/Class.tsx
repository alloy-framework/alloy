import * as core from "@alloy-js/core";
import * as base from "./index.js";
import * as csharp from "../index.js";
import * as symbols from "../symbols/index.js";

// properties for creating a class
export interface ClassProps extends Omit<base.DeclarationProps, "nameKind"> {
  accessModifier?: csharp.AccessModifier;
}

// a C# class declaration
export function Class(props: ClassProps) {
  const name = csharp.useCSharpNamePolicy().getName(props.name, "class");
  const scope = symbols.useCSharpScope();

  const thisClassSymbol = scope.binder.createSymbol<symbols.CSharpOutputSymbol>({
    name: name,
    scope,
    refkey: props.refkey ?? core.refkey(props.name),
  });

  // this creates a new scope for the class definition.
  // members will automatically "inherit" this scope so
  // that refkeys to them will produce the fully-qualified
  // name e.g. Foo.Bar.
  const thisClassScope = symbols.createCSharpMemberScope(scope.binder, scope, thisClassSymbol, "class");

  return <core.Declaration symbol={thisClassSymbol}>
      {csharp.getAccessModifier(props.accessModifier)}class <base.Name />{props.children ? (
        <>
          {"\n{"}
            <core.Scope value={thisClassScope}>
              {props.children}
            </core.Scope>
          {"}"}
        </>
      ) : ";"}
    </core.Declaration>;
}

// properties for creating a class member
export interface ClassMemberProps {
  accessModifier?: csharp.AccessModifier;
  name: string;
  type: core.Children;
  refkey?: core.Refkey;
}

// a C# class member (i.e. a field within a class like "private int count")
export function ClassMember(props: ClassMemberProps) {
  const name = csharp.useCSharpNamePolicy().getName(props.name, "member");
  const scope = symbols.useCSharpScope();
  if (scope.kind !== "member" || scope.name !== "class") {
    throw new Error("can't define a class member outside of a class scope")
  }

  const memberSymbol = scope.binder.createSymbol<symbols.CSharpOutputSymbol>({
    name: name,
    scope,
    refkey: props.refkey ?? core.refkey(props.name),
  });

  return <core.Declaration symbol={memberSymbol}>
      {csharp.getAccessModifier(props.accessModifier)}{props.type} <base.Name />;
    </core.Declaration>;
}

// properties for creating a method
export interface ClassMethodProps extends Omit<base.DeclarationProps, "nameKind"> {
  accessModifier?: csharp.AccessModifier;
  methodModifier?: csharp.MethodModifier;
  parameters?: Record<string, core.Children>;
  returns?: core.Children;
}

// a C# class method
export function ClassMethod(props: ClassMethodProps) {
  const name = csharp.useCSharpNamePolicy().getName(props.name, "method");
  const scope = symbols.useCSharpScope();
  if (scope.kind !== "member" || scope.name !== "class") {
    throw new Error("can't define a class method outside of a class scope")
  }

  const methodSymbol = scope.binder.createSymbol<symbols.CSharpOutputSymbol>({
    name: name,
    scope,
    refkey: props.refkey ?? core.refkey(props.name),
  });

  // this creates a new scope for the class method.
  // members will automatically "inherit" this scope so
  // that refkeys to them will produce the fully-qualified
  // name e.g. Foo.Bar.
  const methodScope = symbols.createCSharpMemberScope(scope.binder, scope, methodSymbol, "method");

  const params = props.parameters ? <base.Parameters parameters={props.parameters} /> : "";
  const returns = props.returns ?? "void";

  return <core.Declaration symbol={methodSymbol}>
      {csharp.getAccessModifier(props.accessModifier)}{csharp.getMethodModifier(props.methodModifier)}{returns} <base.Name />({params}){props.children ? (
        <>
          {"\n{"}
            <core.Scope value={methodScope}>
              {props.children}
            </core.Scope>
          {"}"}
        </>
      ) : " {}"}
    </core.Declaration>;
}
