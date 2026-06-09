import { refkey } from "@alloy-js/core";
import { describe, expect, it } from "vitest";
import {
  ImportStatement,
  ImportStatements,
} from "../src/components/ImportStatement.jsx";
import * as py from "../src/index.js";
import { createPythonSymbol } from "../src/symbol-creation.js";
import { ImportedSymbol, ImportRecords } from "../src/symbols/index.js";
import {
  createPythonModuleScope,
  TestOutput,
  TestOutputDirectory,
} from "./utils.jsx";

describe("ImportStatement", () => {
  it("renders module import", () => {
    expect(
      <TestOutput>
        <ImportStatement path="sys" />
      </TestOutput>,
    ).toRenderTo("import sys");
  });

  it("renders named imports", () => {
    const sqrtSymbol = createPythonSymbol("sqrt", undefined);
    const piSymbol = createPythonSymbol("pi", undefined);
    const symbols = new Set<ImportedSymbol>([
      new ImportedSymbol(sqrtSymbol, sqrtSymbol),
      new ImportedSymbol(piSymbol, piSymbol),
    ]);
    expect(
      <TestOutput>
        <ImportStatement path="math" symbols={symbols} />
      </TestOutput>,
    ).toRenderTo("from math import pi, sqrt");
  });
});

describe("ImportStatements", () => {
  it("renders multiple import statements", () => {
    const pythonModuleScope = createPythonModuleScope("math", undefined);
    const sqrtSymbol = createPythonSymbol("sqrt", undefined);
    const piSymbol = createPythonSymbol("pi", undefined);

    const mathSymbols = new Set<ImportedSymbol>([
      new ImportedSymbol(sqrtSymbol, sqrtSymbol),
      new ImportedSymbol(piSymbol, piSymbol),
    ]);
    const sysModuleScope = createPythonModuleScope("sys", undefined);
    const requestsScope = createPythonModuleScope("requests", undefined);
    const getSymbol = createPythonSymbol("get", undefined);
    const requestsSymbols = new Set<ImportedSymbol>([
      new ImportedSymbol(getSymbol, getSymbol),
    ]);

    const records = new ImportRecords([
      [pythonModuleScope, { symbols: mathSymbols }],
      [requestsScope, { symbols: requestsSymbols }],
      [sysModuleScope, { symbols: new Set<ImportedSymbol>() }],
    ]);

    expect(
      <TestOutput>
        <ImportStatements records={records} />
      </TestOutput>,
    ).toRenderTo(
      `
    from math import pi
    from math import sqrt
    from requests import get
    import sys`,
    );
  });

  it("renders multiple import statements, but joining imports from the same module", () => {
    const pythonModuleScope = createPythonModuleScope("math", undefined);
    const sqrtSymbol = createPythonSymbol("sqrt", undefined);
    const piSymbol = createPythonSymbol("pi", undefined);
    const mathSymbols = new Set<ImportedSymbol>([
      new ImportedSymbol(sqrtSymbol, sqrtSymbol),
      new ImportedSymbol(piSymbol, piSymbol),
    ]);
    const requestsScope = createPythonModuleScope("requests", undefined);
    const getSymbol = createPythonSymbol("get", undefined);
    const postSymbol = createPythonSymbol("post", undefined);
    const requestsSymbols = new Set<ImportedSymbol>([
      new ImportedSymbol(getSymbol, getSymbol),
      new ImportedSymbol(postSymbol, postSymbol),
    ]);
    const records = new ImportRecords([
      [pythonModuleScope, { symbols: mathSymbols }],
      [requestsScope, { symbols: requestsSymbols }],
    ]);

    expect(
      <TestOutput>
        <ImportStatements records={records} joinImportsFromSameModule={true} />
      </TestOutput>,
    ).toRenderTo(
      `
    from math import pi, sqrt
    from requests import get, post`,
    );
  });
});

describe("Imports being used", () => {
  it("works with importing the same name many times from different files with the default name conflict resolver", () => {
    const rk1 = refkey();
    const rk2 = refkey();
    const rk3 = refkey();
    expect(
      <TestOutputDirectory>
        <py.SourceFile path="test_1.py">
          <py.VariableDeclaration name="conflict" refkey={rk1} />
        </py.SourceFile>
        <py.SourceFile path="test_3.py">
          <py.VariableDeclaration name="conflict" refkey={rk3} />
        </py.SourceFile>
        <py.SourceFile path="test_2.py">
          <py.VariableDeclaration name="conflict" refkey={rk2} />
        </py.SourceFile>
        <py.SourceFile path="test.py">
          <py.StatementList>
            <py.VariableDeclaration name="one" initializer={rk1} />
            <py.VariableDeclaration name="three" initializer={rk3} />
            <py.VariableDeclaration name="two" initializer={rk2} />
          </py.StatementList>
        </py.SourceFile>
      </TestOutputDirectory>,
    ).toRenderTo({
      "test.py": `
          from test_1 import conflict
          from test_2 import conflict as conflict_3_test_2
          from test_3 import conflict as conflict_2_test_3

          one = conflict
          three = conflict_2_test_3
          two = conflict_3_test_2
        `,
      "test_1.py": "conflict = None",
      "test_2.py": "conflict = None",
      "test_3.py": "conflict = None",
    });
  });

  it("works with importing the same name many times from different files and with the correct order", () => {
    const rk1 = refkey();
    const rk2 = refkey();
    const rk3 = refkey();
    const rk4 = refkey();
    const rk5 = refkey();
    const rk6 = refkey();
    const rk7 = refkey();
    expect(
      <TestOutputDirectory>
        <py.SourceFile path="test_1.py">
          <py.VariableDeclaration name="conflict" refkey={rk1} />
          <py.VariableDeclaration name="something_else" refkey={rk4} />
        </py.SourceFile>
        <py.SourceFile path="test_2.py">
          <py.VariableDeclaration name="conflict" refkey={rk2} />
          <py.VariableDeclaration name="something" refkey={rk6} />
          <py.VariableDeclaration name="something_else" refkey={rk5} />
        </py.SourceFile>
        <py.SourceFile path="test_3.py">
          <py.VariableDeclaration name="conflict" refkey={rk3} />
          <py.VariableDeclaration name="something" refkey={rk7} />
        </py.SourceFile>
        <py.SourceFile path="test.py">
          <py.StatementList>
            <py.VariableDeclaration name="one" initializer={rk1} />
            <py.VariableDeclaration name="two" initializer={rk2} />
            <py.VariableDeclaration name="three" initializer={rk3} />
            <py.VariableDeclaration name="something_else" initializer={rk4} />
            <py.VariableDeclaration
              name="something_else_two"
              initializer={rk5}
            />
            <py.VariableDeclaration name="something" initializer={rk6} />
            <py.VariableDeclaration name="something_two" initializer={rk7} />
          </py.StatementList>
        </py.SourceFile>
      </TestOutputDirectory>,
    ).toRenderTo({
      "test.py": `
          from test_1 import conflict
          from test_1 import something_else as something_else_2_test_1
          from test_2 import conflict as conflict_2_test_2
          from test_2 import something as something_2_test_2
          from test_2 import something_else as something_else_3_test_2
          from test_3 import conflict as conflict_3_test_3
          from test_3 import something as something_3_test_3

          one = conflict
          two = conflict_2_test_2
          three = conflict_3_test_3
          something_else = something_else_2_test_1
          something_else_two = something_else_3_test_2
          something = something_2_test_2
          something_two = something_3_test_3
        `,
      "test_1.py": `conflict = None

something_else = None`,
      "test_2.py": `conflict = None

something = None

something_else = None`,
      "test_3.py": `conflict = None

something = None`,
    });
  });
});
