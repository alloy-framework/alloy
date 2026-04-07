import { Prose } from "@alloy-js/core";
import { d } from "@alloy-js/core/testing";
import { expect, it } from "vitest";
import * as py from "../src/index.js";
import { dataclassesModule } from "../src/index.js";
import { toSourceText } from "./utils.jsx";

/**
 * toSourceText wraps the children in a SourceFile component
 * and renders it to a string.
 */
it("renders an empty source file", () => {
  const result = toSourceText([]);
  expect(result).toRenderTo(d`


  `);
});

it("correct formatting of source file", () => {
  const result = toSourceText([
    <py.ClassDeclaration name="someClass">
      <py.StatementList>
        <py.FunctionDeclaration name="someMethod" returnType="str">
          <py.StatementList>
            <py.VariableDeclaration
              name="x"
              type="int"
              initializer={<py.Atom jsValue={42} />}
            />
            <py.VariableDeclaration
              name="y"
              type="int"
              initializer={<py.Atom jsValue={42} />}
            />
            <py.FunctionCallExpression target="foo" args={["a", "b"]} />
            <py.MemberExpression>
              <py.MemberExpression.Part id="a" />
              <py.MemberExpression.Part id="b" />
              <py.MemberExpression.Part key={"special-prop"} />
            </py.MemberExpression>
            <py.VariableDeclaration
              name="z"
              type="int"
              initializer={<py.Atom jsValue={42} />}
            />
          </py.StatementList>
        </py.FunctionDeclaration>
        <py.VariableDeclaration
          name="someVar"
          type="int"
          initializer={<py.Atom jsValue={42} />}
        />
        <py.FunctionDeclaration name="someOtherMethod" returnType="str" />
        <py.VariableDeclaration
          name="someOtherVar"
          type="int"
          initializer={<py.Atom jsValue={42} />}
        />
      </py.StatementList>
    </py.ClassDeclaration>,
    <py.FunctionDeclaration name="someFunction">
      <py.StatementList>
        <py.VariableDeclaration
          name="x"
          type="int"
          initializer={<py.Atom jsValue={42} />}
        />
        <py.VariableDeclaration
          name="y"
          type="int"
          initializer={<py.Atom jsValue={42} />}
        />
        <py.FunctionCallExpression target="foo" args={["a", "b"]} />
        <py.MemberExpression>
          <py.MemberExpression.Part id="a" />
          <py.MemberExpression.Part id="b" />
          <py.MemberExpression.Part key={"special-prop"} />
        </py.MemberExpression>
        <py.VariableDeclaration
          name="z"
          type="int"
          initializer={<py.Atom jsValue={42} />}
        />
      </py.StatementList>
    </py.FunctionDeclaration>,
    <py.ClassDeclaration name="someOtherClass">
      <py.StatementList>
        <py.FunctionDeclaration name="someMethod" returnType="str" />
      </py.StatementList>
    </py.ClassDeclaration>,
    <py.MemberExpression>
      <py.MemberExpression.Part id="a" />
      <py.MemberExpression.Part id="b" />
      <py.MemberExpression.Part key={"special-prop"} />
    </py.MemberExpression>,
  ]);
  expect(result).toRenderTo(d`
    class SomeClass:
        def some_method() -> str:
            x: int = 42
            y: int = 42
            foo(a, b)
            a.b["special-prop"]
            z: int = 42

        some_var: int = 42
        def some_other_method() -> str:
            pass

        some_other_var: int = 42


    def some_function():
        x: int = 42
        y: int = 42
        foo(a, b)
        a.b["special-prop"]
        z: int = 42


    class SomeOtherClass:
        def some_method() -> str:
            pass



    a.b["special-prop"]

  `);
});

it("renders module documentation correctly", () => {
  const moduleDoc = (
    <py.ModuleDoc
      description={[
        <Prose>
          This module provides utility functions for data processing. It
          includes functions for validation, transformation, and analysis.
        </Prose>,
      ]}
      attributes={[
        {
          name: "DEFAULT_TIMEOUT",
          type: "int",
          children: "Default timeout value in seconds.",
        },
        {
          name: "MAX_RETRIES",
          type: "int",
          children: "Maximum number of retry attempts.",
        },
      ]}
      todo={["Add caching functionality", "Improve error messages"]}
      style="google"
    />
  );

  const content = (
    <py.SourceFile path="test.py" doc={moduleDoc}>
      <py.VariableDeclaration name="DEFAULT_TIMEOUT" initializer={30} />
      <py.VariableDeclaration name="MAX_RETRIES" initializer={3} />
      <py.FunctionDeclaration name="process_data">pass</py.FunctionDeclaration>
    </py.SourceFile>
  );

  expect(toSourceText(content)).toRenderTo(d`
    """
    This module provides utility functions for data processing. It includes
    functions for validation, transformation, and analysis.

    Attributes:
        DEFAULT_TIMEOUT (int): Default timeout value in seconds.

        MAX_RETRIES (int): Maximum number of retry attempts.

    Todo:
        * Add caching functionality
        * Improve error messages
    """

    default_timeout = 30

    max_retries = 3

    def process_data():
        pass


  `);
});

it("renders source file without documentation correctly", () => {
  const content = (
    <py.SourceFile path="test.py">
      <py.FunctionDeclaration name="hello_world">
        print("Hello, World!")
      </py.FunctionDeclaration>
    </py.SourceFile>
  );

  expect(toSourceText(content)).toRenderTo(d`
    def hello_world():
        print("Hello, World!")


  `);
});

it("nothing before top-level definition", () => {
  const content = (
    <py.SourceFile path="test.py">
      <py.FunctionDeclaration name="hello">pass</py.FunctionDeclaration>
    </py.SourceFile>
  );

  expect(toSourceText(content)).toRenderTo(d`
    def hello():
        pass


  `);
});

it("nothing before non-definition", () => {
  const content = (
    <py.SourceFile path="test.py">
      <py.VariableDeclaration name="x" initializer={42} />
    </py.SourceFile>
  );

  expect(toSourceText(content)).toRenderTo("x = 42");
});

it("only doc before definition", () => {
  const moduleDoc = (
    <py.ModuleDoc description={[<Prose>Module description.</Prose>]} />
  );

  const content = (
    <py.SourceFile path="test.py" doc={moduleDoc}>
      <py.FunctionDeclaration name="hello">pass</py.FunctionDeclaration>
    </py.SourceFile>
  );

  expect(toSourceText(content)).toRenderTo(d`
    """
    Module description.
    """


    def hello():
        pass


  `);
});

it("only doc before non-definition", () => {
  const moduleDoc = (
    <py.ModuleDoc description={[<Prose>Module description.</Prose>]} />
  );

  const content = (
    <py.SourceFile path="test.py" doc={moduleDoc}>
      <py.VariableDeclaration name="x" initializer={42} />
    </py.SourceFile>
  );

  expect(toSourceText(content)).toRenderTo(d`
    """
    Module description.
    """

    x = 42`);
});

it("only header before definition", () => {
  const content = (
    <py.SourceFile path="test.py" header="#!/usr/bin/env python3">
      <py.FunctionDeclaration name="hello">pass</py.FunctionDeclaration>
    </py.SourceFile>
  );

  // 2 blank lines before definition (PEP 8)
  expect(toSourceText(content)).toRenderTo(d`
    #!/usr/bin/env python3


    def hello():
        pass


  `);
});

it("only header before non-definition", () => {
  const content = (
    <py.SourceFile path="test.py" header="#!/usr/bin/env python3">
      <py.VariableDeclaration name="x" initializer={42} />
    </py.SourceFile>
  );

  // 1 blank line for non-definition
  expect(toSourceText(content)).toRenderTo(d`
    #!/usr/bin/env python3

    x = 42`);
});

it("only futureImports before definition", () => {
  const content = (
    <py.SourceFile
      path="test.py"
      futureImports={[<py.FutureStatement feature="annotations" />]}
    >
      <py.FunctionDeclaration name="hello">pass</py.FunctionDeclaration>
    </py.SourceFile>
  );

  expect(toSourceText(content)).toRenderTo(d`
    from __future__ import annotations


    def hello():
        pass


  `);
});

it("only futureImports before non-definition", () => {
  const content = (
    <py.SourceFile
      path="test.py"
      futureImports={[<py.FutureStatement feature="annotations" />]}
    >
      <py.VariableDeclaration name="x" initializer={42} />
    </py.SourceFile>
  );

  expect(toSourceText(content)).toRenderTo(d`
    from __future__ import annotations

    x = 42`);
});

it("only imports before definition", () => {
  const content = (
    <py.SourceFile path="test.py">
      <py.DataclassDeclaration name="User">
        <py.VariableDeclaration name="name" type="str" />
      </py.DataclassDeclaration>
    </py.SourceFile>
  );

  expect(toSourceText(content, { externals: [dataclassesModule] }))
    .toRenderTo(d`
    from dataclasses import dataclass


    @dataclass
    class User:
        name: str = None


  `);
});

it("only imports before non-definition", () => {
  const content = (
    <py.SourceFile path="test.py">
      <py.VariableDeclaration
        name="x"
        initializer={<py.Reference refkey={dataclassesModule["."].dataclass} />}
      />
    </py.SourceFile>
  );

  expect(toSourceText(content, { externals: [dataclassesModule] }))
    .toRenderTo(d`
    from dataclasses import dataclass

    x = dataclass`);
});

it("doc + futureImports before definition", () => {
  const moduleDoc = (
    <py.ModuleDoc description={[<Prose>Module description.</Prose>]} />
  );

  const content = (
    <py.SourceFile
      path="test.py"
      doc={moduleDoc}
      futureImports={[<py.FutureStatement feature="annotations" />]}
    >
      <py.FunctionDeclaration name="hello">pass</py.FunctionDeclaration>
    </py.SourceFile>
  );

  expect(toSourceText(content)).toRenderTo(d`
    """
    Module description.
    """

    from __future__ import annotations


    def hello():
        pass


  `);
});

it("doc + futureImports before non-definition", () => {
  const moduleDoc = (
    <py.ModuleDoc description={[<Prose>Module description.</Prose>]} />
  );

  const content = (
    <py.SourceFile
      path="test.py"
      doc={moduleDoc}
      futureImports={[<py.FutureStatement feature="annotations" />]}
    >
      <py.VariableDeclaration name="x" initializer={42} />
    </py.SourceFile>
  );

  expect(toSourceText(content)).toRenderTo(d`
    """
    Module description.
    """

    from __future__ import annotations

    x = 42`);
});

it("doc + imports before definition", () => {
  const moduleDoc = (
    <py.ModuleDoc description={[<Prose>Module description.</Prose>]} />
  );

  const content = (
    <py.SourceFile path="test.py" doc={moduleDoc}>
      <py.DataclassDeclaration name="User">
        <py.VariableDeclaration name="name" type="str" />
      </py.DataclassDeclaration>
    </py.SourceFile>
  );

  expect(toSourceText(content, { externals: [dataclassesModule] }))
    .toRenderTo(d`
    """
    Module description.
    """

    from dataclasses import dataclass


    @dataclass
    class User:
        name: str = None


  `);
});

it("doc + imports before non-definition", () => {
  const moduleDoc = (
    <py.ModuleDoc description={[<Prose>Module description.</Prose>]} />
  );

  const content = (
    <py.SourceFile path="test.py" doc={moduleDoc}>
      <py.VariableDeclaration
        name="x"
        initializer={<py.Reference refkey={dataclassesModule["."].dataclass} />}
      />
    </py.SourceFile>
  );

  expect(toSourceText(content, { externals: [dataclassesModule] }))
    .toRenderTo(d`
    """
    Module description.
    """

    from dataclasses import dataclass

    x = dataclass`);
});

it("futureImports + imports before definition", () => {
  const content = (
    <py.SourceFile
      path="test.py"
      futureImports={[<py.FutureStatement feature="annotations" />]}
    >
      <py.DataclassDeclaration name="User">
        <py.VariableDeclaration name="name" type="str" />
      </py.DataclassDeclaration>
    </py.SourceFile>
  );

  expect(toSourceText(content, { externals: [dataclassesModule] }))
    .toRenderTo(d`
    from __future__ import annotations

    from dataclasses import dataclass


    @dataclass
    class User:
        name: str = None


  `);
});

it("futureImports + imports before non-definition", () => {
  const content = (
    <py.SourceFile
      path="test.py"
      futureImports={[<py.FutureStatement feature="annotations" />]}
    >
      <py.VariableDeclaration
        name="x"
        initializer={<py.Reference refkey={dataclassesModule["."].dataclass} />}
      />
    </py.SourceFile>
  );

  expect(toSourceText(content, { externals: [dataclassesModule] }))
    .toRenderTo(d`
    from __future__ import annotations

    from dataclasses import dataclass

    x = dataclass`);
});

it("doc + futureImports + imports before definition", () => {
  const moduleDoc = (
    <py.ModuleDoc description={[<Prose>Module description.</Prose>]} />
  );

  const content = (
    <py.SourceFile
      path="test.py"
      doc={moduleDoc}
      futureImports={[<py.FutureStatement feature="annotations" />]}
    >
      <py.DataclassDeclaration name="User">
        <py.VariableDeclaration name="name" type="str" />
      </py.DataclassDeclaration>
    </py.SourceFile>
  );

  expect(toSourceText(content, { externals: [dataclassesModule] }))
    .toRenderTo(d`
    """
    Module description.
    """

    from __future__ import annotations

    from dataclasses import dataclass


    @dataclass
    class User:
        name: str = None


  `);
});

it("doc + futureImports + imports before non-definition", () => {
  const moduleDoc = (
    <py.ModuleDoc description={[<Prose>Module description.</Prose>]} />
  );

  const content = (
    <py.SourceFile
      path="test.py"
      doc={moduleDoc}
      futureImports={[<py.FutureStatement feature="annotations" />]}
    >
      <py.VariableDeclaration
        name="x"
        initializer={<py.Reference refkey={dataclassesModule["."].dataclass} />}
      />
    </py.SourceFile>
  );

  expect(toSourceText(content, { externals: [dataclassesModule] }))
    .toRenderTo(d`
    """
    Module description.
    """

    from __future__ import annotations

    from dataclasses import dataclass

    x = dataclass`);
});

it("only doc in file (no children)", () => {
  const moduleDoc = (
    <py.ModuleDoc description={[<Prose>Module description.</Prose>]} />
  );

  const content = <py.SourceFile path="test.py" doc={moduleDoc} />;

  expect(toSourceText(content)).toRenderTo(d`
    """
    Module description.
    """


  `);
});

it("only header in file (no children)", () => {
  const content = (
    <py.SourceFile path="test.py" header="#!/usr/bin/env python3" />
  );

  expect(toSourceText(content)).toRenderTo(d`
    #!/usr/bin/env python3


  `);
});

it("only futureImports in file (no children)", () => {
  const content = (
    <py.SourceFile
      path="test.py"
      futureImports={[<py.FutureStatement feature="annotations" />]}
    />
  );

  expect(toSourceText(content)).toRenderTo(d`
    from __future__ import annotations

  `);
});

it("doc + futureImports in file (no children)", () => {
  const moduleDoc = (
    <py.ModuleDoc description={[<Prose>Module description.</Prose>]} />
  );

  const content = (
    <py.SourceFile
      path="test.py"
      doc={moduleDoc}
      futureImports={[<py.FutureStatement feature="annotations" />]}
    />
  );

  expect(toSourceText(content)).toRenderTo(d`
    """
    Module description.
    """

    from __future__ import annotations

  `);
});

// headerComment tests
it("only headerComment before definition", () => {
  const content = (
    <py.SourceFile path="test.py" headerComment="Copyright 2024 My Company">
      <py.FunctionDeclaration name="hello">pass</py.FunctionDeclaration>
    </py.SourceFile>
  );

  // 2 blank lines before definition (PEP 8)
  expect(toSourceText(content)).toRenderTo(d`
    # Copyright 2024 My Company


    def hello():
        pass


  `);
});

it("only headerComment before non-definition", () => {
  const content = (
    <py.SourceFile path="test.py" headerComment="Copyright 2024 My Company">
      <py.VariableDeclaration name="x" initializer={42} />
    </py.SourceFile>
  );

  expect(toSourceText(content)).toRenderTo(d`
    # Copyright 2024 My Company

    x = 42`);
});

it("headerComment + doc before definition", () => {
  const moduleDoc = (
    <py.ModuleDoc description={[<Prose>Module description.</Prose>]} />
  );

  const content = (
    <py.SourceFile
      path="test.py"
      headerComment="Copyright 2024 My Company"
      doc={moduleDoc}
    >
      <py.FunctionDeclaration name="hello">pass</py.FunctionDeclaration>
    </py.SourceFile>
  );

  // headerComment and doc adjacent, then PEP 8 spacing before definition
  expect(toSourceText(content)).toRenderTo(d`
    # Copyright 2024 My Company
    """
    Module description.
    """


    def hello():
        pass


  `);
});

it("headerComment + futureImports before definition", () => {
  const content = (
    <py.SourceFile
      path="test.py"
      headerComment="Copyright 2024 My Company"
      futureImports={[<py.FutureStatement feature="annotations" />]}
    >
      <py.FunctionDeclaration name="hello">pass</py.FunctionDeclaration>
    </py.SourceFile>
  );

  // headerComment and futureImports adjacent, then PEP 8 spacing
  expect(toSourceText(content)).toRenderTo(d`
    # Copyright 2024 My Company

    from __future__ import annotations


    def hello():
        pass


  `);
});

it("headerComment + imports before definition", () => {
  const content = (
    <py.SourceFile path="test.py" headerComment="Copyright 2024 My Company">
      <py.DataclassDeclaration name="User">
        <py.VariableDeclaration name="name" type="str" />
      </py.DataclassDeclaration>
    </py.SourceFile>
  );

  expect(toSourceText(content, { externals: [dataclassesModule] }))
    .toRenderTo(d`
    # Copyright 2024 My Company

    from dataclasses import dataclass


    @dataclass
    class User:
        name: str = None


  `);
});

it("headerComment + doc + futureImports before definition", () => {
  const moduleDoc = (
    <py.ModuleDoc description={[<Prose>Module description.</Prose>]} />
  );

  const content = (
    <py.SourceFile
      path="test.py"
      headerComment="Copyright 2024 My Company"
      doc={moduleDoc}
      futureImports={[<py.FutureStatement feature="annotations" />]}
    >
      <py.FunctionDeclaration name="hello">pass</py.FunctionDeclaration>
    </py.SourceFile>
  );

  expect(toSourceText(content)).toRenderTo(d`
    # Copyright 2024 My Company
    """
    Module description.
    """

    from __future__ import annotations


    def hello():
        pass


  `);
});

it("headerComment + doc + futureImports + imports before definition", () => {
  const moduleDoc = (
    <py.ModuleDoc description={[<Prose>Module description.</Prose>]} />
  );

  const content = (
    <py.SourceFile
      path="test.py"
      headerComment="Copyright 2024 My Company"
      doc={moduleDoc}
      futureImports={[<py.FutureStatement feature="annotations" />]}
    >
      <py.DataclassDeclaration name="User">
        <py.VariableDeclaration name="name" type="str" />
      </py.DataclassDeclaration>
    </py.SourceFile>
  );

  expect(toSourceText(content, { externals: [dataclassesModule] }))
    .toRenderTo(d`
    # Copyright 2024 My Company
    """
    Module description.
    """

    from __future__ import annotations

    from dataclasses import dataclass


    @dataclass
    class User:
        name: str = None


  `);
});

it("only headerComment in file (no children)", () => {
  const content = (
    <py.SourceFile path="test.py" headerComment="Copyright 2024 My Company" />
  );

  expect(toSourceText(content)).toRenderTo(d`
    # Copyright 2024 My Company

  `);
});

it("header + headerComment before definition", () => {
  const content = (
    <py.SourceFile
      path="test.py"
      header="#!/usr/bin/env python3"
      headerComment="Copyright 2024 My Company"
    >
      <py.FunctionDeclaration name="hello">pass</py.FunctionDeclaration>
    </py.SourceFile>
  );

  // 2 blank lines before definition (PEP 8)
  expect(toSourceText(content)).toRenderTo(d`
    #!/usr/bin/env python3
    # Copyright 2024 My Company


    def hello():
        pass


  `);
});

it("header + headerComment before class definition", () => {
  const content = (
    <py.SourceFile
      path="test.py"
      header="#!/usr/bin/env python3"
      headerComment="Copyright 2024 My Company"
    >
      <py.ClassDeclaration name="MyClass">pass</py.ClassDeclaration>
    </py.SourceFile>
  );

  // 2 blank lines before definition (PEP 8)
  expect(toSourceText(content)).toRenderTo(d`
    #!/usr/bin/env python3
    # Copyright 2024 My Company


    class MyClass:
        pass


  `);
});

it("header + headerComment before non-definition", () => {
  const content = (
    <py.SourceFile
      path="test.py"
      header="#!/usr/bin/env python3"
      headerComment="Copyright 2024 My Company"
    >
      <py.VariableDeclaration name="x" initializer={42} />
    </py.SourceFile>
  );

  // 1 blank line for non-definition
  expect(toSourceText(content)).toRenderTo(d`
    #!/usr/bin/env python3
    # Copyright 2024 My Company

    x = 42`);
});
