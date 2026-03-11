import { describe, expect, it } from "vitest";
import {
  Attribute,
  CrateContext,
  CrateDirectory,
  FunctionSymbol,
  NamedTypeSymbol,
  PRELUDE_TYPES,
  RustCrateScope,
  RustImplScope,
  RustModuleScope,
  RustOutputSymbol,
  RustTraitScope,
  SourceFile,
  StructDeclaration,
  createCrate,
  createRustNamePolicy,
  getCrateInfo,
  isParameterDescriptor,
  ref,
  rustNameConflictResolver,
  stc,
  useCrateContext,
} from "@alloy-js/rust";
import * as rustStc from "@alloy-js/rust/stc";

describe("@alloy-js/rust barrel exports", () => {
  it("resolves key public API exports from package root", () => {
    expect(StructDeclaration).toBeTypeOf("function");
    expect(Attribute).toBeTypeOf("function");
    expect(CrateDirectory).toBeTypeOf("function");
    expect(SourceFile).toBeTypeOf("function");

    expect(RustOutputSymbol).toBeTypeOf("function");
    expect(NamedTypeSymbol).toBeTypeOf("function");
    expect(FunctionSymbol).toBeTypeOf("function");
    expect(RustCrateScope).toBeTypeOf("function");
    expect(RustModuleScope).toBeTypeOf("function");
    expect(RustImplScope).toBeTypeOf("function");
    expect(RustTraitScope).toBeTypeOf("function");

    expect(createCrate).toBeTypeOf("function");
    expect(getCrateInfo).toBeTypeOf("function");
    expect(createRustNamePolicy).toBeTypeOf("function");
    expect(rustNameConflictResolver).toBeTypeOf("function");
    expect(isParameterDescriptor).toBeTypeOf("function");
    expect(ref).toBeTypeOf("function");
    expect(PRELUDE_TYPES).toBeInstanceOf(Set);

    expect(CrateContext).toBeDefined();
    expect(useCrateContext).toBeTypeOf("function");
    expect(stc).toBeDefined();
  });

  it("exposes STC wrappers from subpath export", () => {
    expect(rustStc.StructDeclaration).toBeTypeOf("function");
    expect(rustStc.FunctionDeclaration).toBeTypeOf("function");
    expect(rustStc.TypeAlias).toBeTypeOf("function");
  });
});
