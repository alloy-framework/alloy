function emit() {
  return (
    <ay.Output externals={[ts.node.fs]}>
      <ts.PackageDirectory name="test-package" version="1.0.0" path=".">
        <ay.SourceFile path="readme.md" filetype="markdown">
          This is a sample output project.
        </ay.SourceFile>

        <ts.SourceFile export="." path="test1.ts">
          await <ts.Reference refkey={readFile} />
          ("./package.json");
          <ts.VarDeclaration export name="foo">
            const foo = 1;
          </ts.VarDeclaration>
        </ts.SourceFile>

        <ts.SourceFile path="test2.ts">
          const v = <ts.Reference refkey={ay.refkey("foo")} />;
        </ts.SourceFile>
      </ts.PackageDirectory>
    </ay.Output>
  );
}
