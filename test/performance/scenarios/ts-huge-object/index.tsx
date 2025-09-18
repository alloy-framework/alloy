import {
  Output,
  renderTree,
  SourceDirectory,
  sourceFilesForTree,
  useBinder,
} from "@alloy-js/core";
import {
  ObjectExpression,
  SourceFile,
  VarDeclaration,
} from "@alloy-js/typescript";

export const title = "typescript: huge object";
export const description = `
Convert a huge JSON object to TypeScript code. Stresses symbols pretty heavily.
`;

export async function runTest(): Promise<any> {
  const WIDTH = 4;
  const DEPTH = 3;
  const root = (function build(d: number): any {
    return d ?
        Object.fromEntries(
          Array.from({ length: WIDTH }, (_, i) => [
            `k${d}_${i}`,
            Array.from({ length: WIDTH }, () => build(d - 1)),
          ]),
        )
      : { v: 0 };
  })(DEPTH);

  let binder;
  const tree = await renderTree(
    <Output>
      {() => {
        binder = useBinder();
      }}
      <SourceDirectory path="src">
        <SourceFile path="index.ts">
          <VarDeclaration name="root" export>
            <ObjectExpression jsValue={root} />
          </VarDeclaration>
        </SourceFile>
      </SourceDirectory>
    </Output>,
  );

  const result = await sourceFilesForTree(tree);
  return [tree, result, binder!];
}
