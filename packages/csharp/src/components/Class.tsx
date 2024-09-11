import * as core from "@alloy-js/core";
import {
  AccessModifier,
  getAccessModifier,
  getMethodModifier,
  MethodModifier,
} from "../modifiers.js";
import { useCSharpNamePolicy } from "../name-policy.js";
import { CSharpOutputSymbol } from "../symbols/csharp-output-symbol.js";
import { createCSharpMemberScope, useCSharpScope } from "../symbols/scopes.js";
import { Name } from "./Name.jsx";
import { Parameters } from "./Parameters.jsx";

// properties for creating a class
export interface ClassProps extends Omit<core.DeclarationProps, "nameKind"> {
  accessModifier?: AccessModifier;
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
    "class",
  );

  return <core.Declaration symbol={thisClassSymbol}>
      {getAccessModifier(props.accessModifier)}class <Name />{!props.children && ";"}{props.children &&
        <>
          {"\n{"}
            <core.Scope value={thisClassScope}>
              {props.children}
            </core.Scope>
          {"}"}
        </>
        }
    </core.Declaration>;
}

// properties for creating a class member
export interface ClassMemberProps {
  accessModifier?: AccessModifier;
  name: string;
  type: core.Children;
  refkey?: core.Refkey;
}

// a C# class member (i.e. a field within a class like "private int count")
export function ClassMember(props: ClassMemberProps) {
  const name = useCSharpNamePolicy().getName(props.name, "class-member");
  const scope = useCSharpScope();
  if (scope.kind !== "member" || scope.name !== "class") {
    throw new Error("can't define a class member outside of a class scope");
  }

  const memberSymbol = scope.binder.createSymbol<CSharpOutputSymbol>({
    name: name,
    scope,
    refkey: props.refkey ?? core.refkey(props.name),
  });

  return <core.Declaration symbol={memberSymbol}>
      {getAccessModifier(props.accessModifier)}{props.type} <Name />;
    </core.Declaration>;
}

// properties for creating a method
export interface ClassMethodProps
  extends Omit<core.DeclarationProps, "nameKind"> {
  accessModifier?: AccessModifier;
  methodModifier?: MethodModifier;
  parameters?: Record<string, core.Children>;
  returns?: core.Children;
}

// a C# class method
export function ClassMethod(props: ClassMethodProps) {
  const name = useCSharpNamePolicy().getName(props.name!, "class-method");
  const scope = useCSharpScope();
  if (scope.kind !== "member" || scope.name !== "class") {
    throw new Error("can't define a class method outside of a class scope");
  }

  const methodSymbol = scope.binder.createSymbol<CSharpOutputSymbol>({
    name: name,
    scope,
    refkey: props.refkey ?? core.refkey(props.name),
  });

  // this creates a new scope for the class method.
  // members will automatically "inherit" this scope so
  // that refkeys to them will produce the fully-qualified
  // name e.g. Foo.Bar.
  const methodScope = createCSharpMemberScope(
    scope.binder,
    scope,
    methodSymbol,
    "method",
  );

  const accessModifier = getAccessModifier(props.accessModifier);
  const methodModifier = getMethodModifier(props.methodModifier);
  const params = props.parameters ?
    <Parameters parameters={props.parameters} />
  : "";
  const returns = props.returns ?? "void";

  return <core.Declaration symbol={methodSymbol}>
      {accessModifier}{methodModifier}{returns} <Name />({params}){!props.children && " {}"}{props.children &&
        <>
          {"\n{"}
            <core.Scope value={methodScope}>
              {props.children}
            </core.Scope>
          {"}"}
        </>
        }
    </core.Declaration>;
}
