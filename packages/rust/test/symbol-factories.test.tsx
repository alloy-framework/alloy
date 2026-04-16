import { Output, Scope, render, useBinder } from "@alloy-js/core";
import { describe, expect, it } from "vitest";
import { createRustNamePolicy } from "../src/name-policy.js";
import {
  RustCrateScope,
  RustFunctionScope,
  RustImplScope,
  RustModuleScope,
  RustTraitScope,
} from "../src/scopes/index.js";
import {
  createConstSymbol,
  createEnumSymbol,
  createFieldSymbol,
  createFunctionSymbol,
  createMethodSymbol,
  createParameterSymbol,
  createStructSymbol,
  createTraitSymbol,
  createTypeAliasSymbol,
  createTypeParameterSymbol,
  createVariantSymbol,
} from "../src/symbols/factories.js";
import { FunctionSymbol } from "../src/symbols/function-symbol.js";
import { NamedTypeSymbol } from "../src/symbols/named-type-symbol.js";
import { RustOutputSymbol } from "../src/symbols/rust-output-symbol.js";

function runInScope<T>(
  scope:
    | RustCrateScope
    | RustModuleScope
    | RustFunctionScope
    | RustImplScope
    | RustTraitScope,
  run: () => T,
): T {
  let result: T | undefined;

  function Probe() {
    result = run();
    return "";
  }

  render(
    <Output namePolicy={createRustNamePolicy()}>
      <Scope value={scope}>
        <Probe />
      </Scope>
    </Output>,
  );

  return result!;
}

describe("Rust symbol factories", () => {
  it("creates type symbols in module type space", () => {
    const crateScope = new RustCrateScope("my_crate");
    const moduleScope = new RustModuleScope("my-module", crateScope);

    const structSymbol = runInScope(moduleScope, () =>
      createStructSymbol("my-struct"),
    );
    const enumSymbol = runInScope(moduleScope, () =>
      createEnumSymbol("status-kind"),
    );
    const traitSymbol = runInScope(moduleScope, () =>
      createTraitSymbol("display-item"),
    );
    const typeAliasSymbol = runInScope(moduleScope, () =>
      createTypeAliasSymbol("response-value"),
    );

    expect(structSymbol).toBeInstanceOf(NamedTypeSymbol);
    expect(structSymbol.name).toBe("MyStruct");
    expect(structSymbol.typeKind).toBe("struct");
    expect(structSymbol.symbolKind).toBe("struct");
    expect(moduleScope.types.has(structSymbol)).toBe(true);

    expect(enumSymbol.name).toBe("StatusKind");
    expect(enumSymbol.typeKind).toBe("enum");
    expect(enumSymbol.symbolKind).toBe("enum");

    expect(traitSymbol.name).toBe("DisplayItem");
    expect(traitSymbol.typeKind).toBe("trait");
    expect(traitSymbol.symbolKind).toBe("trait");

    expect(typeAliasSymbol.name).toBe("ResponseValue");
    expect(typeAliasSymbol.typeKind).toBe("type-alias");
    expect(typeAliasSymbol.symbolKind).toBe("type-alias");
  });

  it("creates function and const symbols in module value space", () => {
    const crateScope = new RustCrateScope("my_crate");
    const moduleScope = new RustModuleScope("my-module", crateScope);

    const functionSymbol = runInScope(moduleScope, () =>
      createFunctionSymbol("run-work"),
    );
    const constSymbol = runInScope(moduleScope, () =>
      createConstSymbol("max-items"),
    );

    expect(functionSymbol).toBeInstanceOf(FunctionSymbol);
    expect(functionSymbol.name).toBe("run_work");
    expect(functionSymbol.symbolKind).toBe("function");
    expect(moduleScope.values.has(functionSymbol)).toBe(true);

    expect(constSymbol).toBeInstanceOf(RustOutputSymbol);
    expect(constSymbol.name).toBe("MAX_ITEMS");
    expect(constSymbol.symbolKind).toBe("const");
    expect(moduleScope.values.has(constSymbol)).toBe(true);
  });

  it("creates member symbols in owner member spaces", () => {
    const crateScope = new RustCrateScope("my_crate");
    const moduleScope = new RustModuleScope("my-module", crateScope);
    const structOwner = runInScope(moduleScope, () =>
      createStructSymbol("service"),
    );
    const enumOwner = runInScope(moduleScope, () => createEnumSymbol("status"));
    const traitOwner = runInScope(moduleScope, () =>
      createTraitSymbol("runner"),
    );
    const structImplScope = new RustImplScope(structOwner, moduleScope);
    const enumImplScope = new RustImplScope(enumOwner, moduleScope);
    const traitScope = new RustTraitScope(traitOwner, moduleScope);

    const methodSymbol = runInScope(traitScope, () =>
      createMethodSymbol("run-task"),
    );
    const fieldSymbol = runInScope(structImplScope, () =>
      createFieldSymbol("user-name"),
    );
    const variantSymbol = runInScope(enumImplScope, () =>
      createVariantSymbol("waiting-state"),
    );

    expect(methodSymbol.name).toBe("run_task");
    expect(methodSymbol.symbolKind).toBe("method");
    expect(traitOwner.members.has(methodSymbol)).toBe(true);

    expect(fieldSymbol.name).toBe("user_name");
    expect(fieldSymbol.symbolKind).toBe("field");
    expect(structOwner.members.has(fieldSymbol)).toBe(true);

    expect(variantSymbol.name).toBe("WaitingState");
    expect(variantSymbol.symbolKind).toBe("variant");
    expect(enumOwner.members.has(variantSymbol)).toBe(true);
  });

  it("creates parameter symbols in function scope spaces", () => {
    const crateScope = new RustCrateScope("my_crate");
    const moduleScope = new RustModuleScope("my-module", crateScope);
    const functionScope = new RustFunctionScope("run", moduleScope);

    const parameterSymbol = runInScope(functionScope, () =>
      createParameterSymbol("input-value"),
    );
    const typeParameterSymbol = runInScope(functionScope, () =>
      createTypeParameterSymbol("item-type"),
    );

    expect(parameterSymbol.name).toBe("input_value");
    expect(parameterSymbol.symbolKind).toBe("parameter");
    expect(functionScope.parameters.has(parameterSymbol)).toBe(true);

    expect(typeParameterSymbol.name).toBe("ItemType");
    expect(typeParameterSymbol.symbolKind).toBe("type-parameter");
    expect(functionScope.typeParameters.has(typeParameterSymbol)).toBe(true);
  });

  it("creates type parameter symbols for named type owners", () => {
    const crateScope = new RustCrateScope("my_crate");
    const moduleScope = new RustModuleScope("my-module", crateScope);
    const traitOwner = runInScope(moduleScope, () =>
      createTraitSymbol("cache-item"),
    );
    const traitScope = new RustTraitScope(traitOwner, moduleScope);

    const typeParameterSymbol = runInScope(traitScope, () =>
      createTypeParameterSymbol("response-data"),
    );

    expect(typeParameterSymbol.name).toBe("ResponseData");
    expect(traitOwner.typeParameters.has(typeParameterSymbol)).toBe(true);
  });

  it("falls back to binder from context when scope has no binder", () => {
    const crateScope = new RustCrateScope("my_crate");
    const moduleScope = new RustModuleScope("my-module", crateScope);
    let factorySymbol: NamedTypeSymbol | undefined;
    let binderFromContext: ReturnType<typeof useBinder>;

    function Probe() {
      binderFromContext = useBinder();
      factorySymbol = createStructSymbol("service");
      return "";
    }

    render(
      <Output namePolicy={createRustNamePolicy()}>
        <Scope value={moduleScope}>
          <Probe />
        </Scope>
      </Output>,
    );

    expect(factorySymbol).toBeDefined();
    expect(factorySymbol!.binder).toBe(binderFromContext);
  });

  it("throws errors for invalid scopes", () => {
    const crateScope = new RustCrateScope("my_crate");
    const moduleScope = new RustModuleScope("my-module", crateScope);
    const functionScope = new RustFunctionScope("run", moduleScope);
    const structOwner = runInScope(moduleScope, () =>
      createStructSymbol("service"),
    );
    const traitOwner = runInScope(moduleScope, () =>
      createTraitSymbol("runner"),
    );
    const traitScope = new RustTraitScope(traitOwner, moduleScope);
    const structScope = new RustImplScope(structOwner, moduleScope);

    expect(() =>
      runInScope(functionScope, () => createStructSymbol("inner")),
    ).toThrow("Can't create struct symbol outside of a crate or module scope.");
    expect(() =>
      runInScope(moduleScope, () => createMethodSymbol("run")),
    ).toThrow("Can't create method symbol outside of an impl or trait scope.");
    expect(() =>
      runInScope(moduleScope, () => createParameterSymbol("value")),
    ).toThrow("Can't create parameter symbol outside of a function scope.");
    expect(() =>
      runInScope(moduleScope, () => createTypeParameterSymbol("item")),
    ).toThrow(
      "Can't create type parameter symbol outside of a function or named type scope.",
    );
    expect(() => runInScope(traitScope, () => createFieldSymbol("x"))).toThrow(
      "Can't create field symbol for non-struct type trait.",
    );
    expect(() =>
      runInScope(structScope, () => createVariantSymbol("x")),
    ).toThrow("Can't create variant symbol for non-enum type struct.");
  });
});
