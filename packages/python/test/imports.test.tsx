import { Output, refkey, render } from "@alloy-js/core";
import { describe, expect, it } from "vitest";
import { ImportStatement } from "../src/components/ImportStatement.jsx";
import * as py from "../src/components/index.js";
import {
  ImportedSymbol,
  ImportRecords,
  PythonOutputSymbol,
} from "../src/symbols/index.js";
import {
  assertFileContents,
  createPythonModuleScope,
  toSourceText,
} from "./utils.jsx";

describe("ImportStatement", () => {
  it("renders module import", () => {
    const result = toSourceText(<ImportStatement path="sys" />);
    const expected = `import sys`;
    expect(result).toRenderTo(expected);
  });

  it("renders named imports", () => {
    const sqrtSymbol = new PythonOutputSymbol("sqrt", {
      binder: undefined,
      scope: undefined,
    });
    const piSymbol = new PythonOutputSymbol("pi", {
      binder: undefined,
      scope: undefined,
    });
    const symbols = new Set<ImportedSymbol>([
      new ImportedSymbol(sqrtSymbol, sqrtSymbol),
      new ImportedSymbol(piSymbol, piSymbol),
    ]);
    const result = toSourceText(
      <ImportStatement path="math" symbols={symbols} />,
    );
    const expected = `from math import pi, sqrt`;
    expect(result).toRenderTo(expected);
  });
});

describe("ImportStatements", () => {
  it("renders multiple import statements", () => {
    const pythonModuleScope = createPythonModuleScope("math", undefined);
    const sqrtSymbol = new PythonOutputSymbol("sqrt", {
      binder: undefined,
      scope: undefined,
    });
    const piSymbol = new PythonOutputSymbol("pi", {
      binder: undefined,
      scope: undefined,
    });
    const mathSymbols = new Set<ImportedSymbol>([
      new ImportedSymbol(sqrtSymbol, sqrtSymbol),
      new ImportedSymbol(piSymbol, piSymbol),
    ]);
    const sysModuleScope = createPythonModuleScope("sys", undefined);
    const requestsScope = createPythonModuleScope("requests", undefined);
    const getSymbol = new PythonOutputSymbol("get", {
      binder: undefined,
      scope: undefined,
    });
    const requestsSymbols = new Set<ImportedSymbol>([
      new ImportedSymbol(getSymbol, getSymbol),
    ]);
    const records = new ImportRecords([
      [pythonModuleScope, { symbols: mathSymbols }],
      [requestsScope, { symbols: requestsSymbols }],
      [sysModuleScope, { symbols: new Set<ImportedSymbol>() }],
    ]);

    const result = toSourceText(<py.ImportStatements records={records} />);
    const expected = `
    from math import pi
    from math import sqrt
    from requests import get
    import sys`;
    expect(result).toRenderTo(expected);
  });
  it("renders multiple import statements, but joining imports from the same module", () => {
    const pythonModuleScope = createPythonModuleScope("math", undefined);
    const sqrtSymbol = new PythonOutputSymbol("sqrt", {
      binder: undefined,
      scope: undefined,
    });
    const piSymbol = new PythonOutputSymbol("pi", {
      binder: undefined,
      scope: undefined,
    });
    const mathSymbols = new Set<ImportedSymbol>([
      new ImportedSymbol(sqrtSymbol, sqrtSymbol),
      new ImportedSymbol(piSymbol, piSymbol),
    ]);
    const requestsScope = createPythonModuleScope("requests", undefined);
    const getSymbol = new PythonOutputSymbol("get", {
      binder: undefined,
      scope: undefined,
    });
    const postSymbol = new PythonOutputSymbol("post", {
      binder: undefined,
      scope: undefined,
    });
    const requestsSymbols = new Set<ImportedSymbol>([
      new ImportedSymbol(getSymbol, getSymbol),
      new ImportedSymbol(postSymbol, postSymbol),
    ]);
    const records = new ImportRecords([
      [pythonModuleScope, { symbols: mathSymbols }],
      [requestsScope, { symbols: requestsSymbols }],
    ]);

    const result = toSourceText(
      <py.ImportStatements
        records={records}
        joinImportsFromSameModule={true}
      />,
    );
    const expected = `
    from math import pi, sqrt
    from requests import get, post`;
    expect(result).toRenderTo(expected);
  });
});

describe("Imports being used", () => {
  it("works with importing the same name many times from different files with the default name conflict resolver", () => {
    const rk1 = refkey();
    const rk2 = refkey();
    const rk3 = refkey();
    const result = render(
      <Output>
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
          <py.VariableDeclaration name="one" initializer={rk1} />
          <hbr />
          <py.VariableDeclaration name="three" initializer={rk3} />
          <hbr />
          <py.VariableDeclaration name="two" initializer={rk2} />
        </py.SourceFile>
      </Output>,
    );
    assertFileContents(result, {
      "test.py": `
        from test_1 import conflict
        from test_2 import conflict as conflict_3_test_2
        from test_3 import conflict as conflict_2_test_3

        one = conflict
        three = conflict_2_test_3
        two = conflict_3_test_2
      `,
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
    const result = render(
      <Output>
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
          <py.VariableDeclaration name="one" initializer={rk1} />
          <hbr />
          <py.VariableDeclaration name="two" initializer={rk2} />
          <hbr />
          <py.VariableDeclaration name="three" initializer={rk3} />
          <hbr />
          <py.VariableDeclaration name="something_else" initializer={rk4} />
          <hbr />
          <py.VariableDeclaration name="something_else_two" initializer={rk5} />
          <hbr />
          <py.VariableDeclaration name="something" initializer={rk6} />
          <hbr />
          <py.VariableDeclaration name="something_two" initializer={rk7} />
        </py.SourceFile>
      </Output>,
    );
    assertFileContents(result, {
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
    });
  });
});
