import * as core from "@alloy-js/core";
import * as symbols from "./index.js";
import * as base from "../components/index.js";

// when resolving references across source files, the last element
// in pathDown will be the containing source file. we only need this
// here so we can find and remove this scope as it's not useful
// when building the reference
interface SourceFileScope extends core.OutputScope {
  kind: "source-file";
}

type ReferenceScope = symbols.CSharpOutputScope | SourceFileScope;

// converts a refkey to its fully qualified name
// e.g. if refkey is for bar in enum type foo, and
// foo is in the same namespace as the refkey, then
// the result would be foo.bar.
export function ref(refkey: core.Refkey): () => string {
  const targetNamespaceCtx = base.useNamespace();
  const resolveResult = core.resolve<ReferenceScope, symbols.CSharpOutputSymbol>(
    refkey as core.Refkey,
  );

  return core.memo(() => {
    if (resolveResult.value === undefined) {
      return "<Unresolved Symbol>";
    }

    // targetDeclaration is the symbol with the refkey
    // pathDown is an array of scopes to that symbol and can be empty.
    // the entries are top-down, so namespace, source-file, member
    //  - referencing a type within the same namespace will have an empty path
    //  - referencing a member (e.g. enum value) within the same namespace will
    //    have a single path entry that contains the owning type
    //  - referencing a type within the same namespace but in a different source
    //    file will have at least a source-file entry
    //  - referencing a symbol outside the current namespace will have at least
    //    two entries, namespace, source-file
    const { targetDeclaration, pathDown } = resolveResult.value;

    const sourceNamespace = pathDown.find((v) => { return v.kind === 'namespace'; });
    if (sourceNamespace && sourceNamespace.name !== targetNamespaceCtx!.name) {
      // the source symbol is in a different namespace that the target refkey.
      // add the applicable using statement to the target's source file.
      let targetSrc = base.useSourceFile();
      targetSrc!.addUsing(sourceNamespace.name);
    }

    // we only need to build the fully-qualified name for members
    // TODO: possibly a subset of members
    const syms = (pathDown as ReferenceScope[]).filter((v) => { return v.kind === "member"}).map((s) => s.owner);
    syms.push(targetDeclaration);

    return syms.map((sym) => sym.name).join(".");
  });
}
