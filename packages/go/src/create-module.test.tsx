import { VariableDeclaration } from "./components/index.js";
import { TestPackage } from "#test/utils.jsx";
import { namekey, toRefkey } from "@alloy-js/core";
import { expect, it } from "vitest";
import { fmt } from "./builtins/fmt/fmt.js";
import { createModule, StrictDescriptor } from "./create-module.js";

it("Can reference types which haven't been created yet", () => {
  const std1 = createModule("std1", {
    kind: "package",
    members: {
      SomeType: {
        kind: "struct",
        members: {
          Special: { kind: "field", type: () => std2.SomeType2 },
        },
      },
    },
  } satisfies StrictDescriptor);

  const std2 = createModule("std2", {
    kind: "package",
    members: {
      SomeType2: {
        kind: "struct",
        members: {
          Hello: { kind: "field" },
        },
      },
    },
  } satisfies StrictDescriptor);

  const test = namekey("test");

  expect(
    <TestPackage>
      <VariableDeclaration name={test} type={std1.SomeType} />
    </TestPackage>,
  ).toRenderTo(`
    package alloy

    import "std1"

    var test std1.SomeType
  `);
});

it("renders as a refkey", () => {
  const mod = createModule("std", {
    kind: "package",
    members: {
      BinaryReader: {
        kind: "struct",
        members: {},
      },
    },
  } satisfies StrictDescriptor);

  expect(
    <TestPackage>
      <VariableDeclaration name="test" type={mod.BinaryReader} />
    </TestPackage>,
  ).toRenderTo(`
    package alloy

    import "std"

    var test std.BinaryReader
  `);
});

it("has a refkey getter", () => {
  const std = createModule("std", {
    kind: "package",
    members: {
      SomeType: {
        kind: "struct",
        members: {
          Special: { kind: "field" },
        },
      },
    },
  } satisfies StrictDescriptor);

  const ioKey = toRefkey(std);
  expect(ioKey).toBeDefined();
  const brKey = toRefkey(std.SomeType);
  expect(brKey).toBeDefined();
});

it("has built-ins available", () => {
  const template = <TestPackage>{fmt.Println}("Hello, World!")</TestPackage>;

  expect(template).toRenderTo(`
    package alloy

    import "fmt"

    fmt.Println("Hello, World!")
  `);
});

it("can render multiple times", () => {
  const mod = createModule("std", {
    kind: "package",
    members: {
      BinaryReader: {
        kind: "struct",
        members: {},
      },
    },
  } satisfies StrictDescriptor);

  expect(<TestPackage>{mod.BinaryReader}</TestPackage>).toRenderTo(`
    package alloy

    import "std"

    std.BinaryReader
  `);
  expect(<TestPackage>{mod.BinaryReader}</TestPackage>).toRenderTo(`
    package alloy

    import "std"

    std.BinaryReader
  `);
});
