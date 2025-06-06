import { Output, render } from "@alloy-js/core";
import { describe, it } from "vitest";
import { ImportStatement } from "../src/components/ImportStatement.jsx";
import { ImportRecords, PythonOutputSymbol } from "../src/symbols/index.js"
import * as py from "../src/components/index.js";
import { assertFileContents } from "./utils.jsx";
import {
  ImportedSymbol,
} from "../src/symbols/index.js";

describe("ImportStatement", () => {
  it("renders module import", () => {
    const result = render(
      <Output>
        <py.SourceFile path="test.py">
          <ImportStatement path="sys"  />
        </py.SourceFile>
      </Output>,
    );
    assertFileContents(result, { "test.py": `import sys` });
  });

  it("renders named imports", () => {
    const targetSymbol1 = new PythonOutputSymbol("foo", { binder: undefined, scope: undefined });
    const localSymbol1 = new PythonOutputSymbol("foo_local", { binder: undefined, scope: undefined });
    const symbols = new Set<ImportedSymbol>([
      new ImportedSymbol(targetSymbol1, localSymbol1),
    ]);
    const result = render(
      <Output>
        <py.SourceFile path="test.py">
          <ImportStatement
            path="math"
            symbols={symbols}
          />
        </py.SourceFile>
      </Output>,
    );
    assertFileContents(result, {
      "test.py": `from math import sqrt, pi`,
    });
  });

  // it("renders named imports with aliases", () => {
  //   const records = new ImportRecords();
  //   records.add(
  //     new ImportRecord({
  //       module: "math",
  //       names: [
  //         { name: "sqrt", alias: "square_root" },
  //         new ImportedSymbol("pi"),
  //       ],
  //     }),
  //   );
  //   const result = render(
  //     <Output>
  //       <py.SourceFile path="test.py">
  //         <ImportStatements records={records} />
  //       </py.SourceFile>
  //     </Output>,
  //   );
  //   assertFileContents(result, {
  //     "test.py": `from math import sqrt as square_root, pi`,
  //   });
  // });
  // it("renders wildcard import", () => {
  //   const records = new ImportRecords();
  //   records.add(new ImportRecord({ module: "os", wildcard: true }));
  //   const result = render(
  //     <Output>
  //       <py.SourceFile path="test.py">
  //         <ImportStatements records={records} />
  //       </py.SourceFile>
  //     </Output>,
  //   );
  //   assertFileContents(result, {
  //     "test.py": `from os import *`,
  //   });
  // });
});

// describe("ImportStatements", () => {
//   it("renders multiple import statements", () => {
//     const records = new ImportRecords();
//     records.add(new ImportRecord({ module: "os", wildcard: true }));
//     records.add(new ImportRecord({ module: "sys" }));
//     records.add(new ImportRecord({ module: "math", names: ["sqrt", "pi"] }));
//     const result = render(
//       <Output>
//         <py.SourceFile path="test.py">
//           <py.ImportStatements records={records} />
//         </py.SourceFile>
//       </Output>,
//     );
//     assertFileContents(result, {
//       "test.py": `from math import sqrt, pi\nfrom os import *\nimport sys`,
//     });
//   });
// });
