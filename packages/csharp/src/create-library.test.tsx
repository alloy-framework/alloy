import { VarDeclaration } from "#components/index.js";
import { InvocationExpression } from "#components/invocation-expression/invocation-expression.jsx";
import { TestNamespace } from "#test/utils.jsx";
import { List, memberRefkey, namekey, toRefkey } from "@alloy-js/core";
import { beforeEach, expect, it } from "vitest";
import { IO } from "./builtins/System/index.js";
import {
  getGlobalNamespace,
  resetGlobalNamespace,
} from "./contexts/global-namespace.js";
import { createLibrary } from "./create-library.js";
import { NamespaceSymbol } from "./symbols/namespace.js";

beforeEach(() => {
  resetGlobalNamespace();
});

it("Creates symbols on demand", () => {
  const System = createLibrary("System", {
    String: {
      kind: "class",
      members: {
        Special: { kind: "class", members: { BeSpecial: { kind: "field" } } },
        Substring: { kind: "method" },
        Length: { kind: "field" },
        Empty: { kind: "field", isStatic: true },
      },
    },
  });

  const globalNamespace = getGlobalNamespace(undefined);
  const systemNs = globalNamespace.members.symbolNames.get("System")!;
  expect(systemNs).toBeUndefined();
  const _ = toRefkey(System);
  const systemNs2 = globalNamespace.members.symbolNames.get("System")!;
  expect(systemNs2).toBeDefined();
});

it("Can reference types which haven't been created yet", () => {
  const System = createLibrary("System", {
    String: {
      kind: "class",
      members: {
        Special: { kind: "property", type: () => SomeNs.SomeType },
      },
    },
  });

  const SomeNs = createLibrary("SomeNs", {
    SomeType: {
      kind: "class",
      members: {},
    },
  });

  const globalNamespace = getGlobalNamespace(undefined);
  const _ = toRefkey(System.String.Special);
  const systemNs2 = globalNamespace.members.symbolNames.get("System")!;
  expect(systemNs2).toBeDefined();
  const someNs = globalNamespace.members.symbolNames.get("SomeNs")!;
  expect(someNs).toBeDefined();
});

it("Works with nested namespaces", () => {
  const IO = createLibrary("System.IO", {
    BinaryReader: {
      kind: "class",
      members: {},
    },
  });

  const globalNamespace = getGlobalNamespace(undefined);
  const systemNs = globalNamespace.members.symbolNames.get("System")!;
  expect(systemNs).toBeUndefined();
  const _ = toRefkey(IO.BinaryReader);
  const systemNs2 = globalNamespace.members.symbolNames.get("System")!;
  expect(systemNs2).toBeDefined();
});

it("Doesn't create duplicate namespaces", () => {
  const IO = createLibrary("System.IO", {
    BinaryReader: { kind: "class", members: {} },
    BinaryWriter: { kind: "class", members: {} },
  });

  const Collections = createLibrary("System.Collections", {
    ArrayList: { kind: "class", members: {} },
  });

  const _refkeys = [
    toRefkey(IO.BinaryReader),
    toRefkey(IO.BinaryWriter),
    toRefkey(Collections.ArrayList),
  ];

  const globalNamespace = getGlobalNamespace(undefined);
  const systemNs = globalNamespace.members.symbolNames.get(
    "System",
  )! as NamespaceSymbol;
  expect(systemNs).toBeDefined();
  const ioNs = systemNs.members.symbolNames.get("IO")!;
  expect(ioNs).toBeDefined();
  const collectionsNs = systemNs.members.symbolNames.get("Collections")!;
  expect(collectionsNs).toBeDefined();
});

it("renders as a refkey", () => {
  const IO = createLibrary("System.IO", {
    BinaryReader: {
      kind: "class",
      members: {},
    },
  });

  expect(
    <TestNamespace>
      new <InvocationExpression target={IO.BinaryReader} />;
    </TestNamespace>,
  ).toRenderTo(`
    using System.IO;

    new BinaryReader();
  `);
});

it("has a refkey getter", () => {
  const IO = createLibrary("System.IO", {
    BinaryReader: {
      kind: "class",
      members: {},
    },
  });

  const ioKey = toRefkey(IO);
  expect(ioKey).toBeDefined();
  const brKey = toRefkey(IO.BinaryReader);
  expect(brKey).toBeDefined();
});

it("works to reference members", () => {
  const IO = createLibrary("System.IO", {
    BinaryReader: {
      kind: "class",
      members: {
        ReadString: { kind: "method" },
      },
    },
  });

  const reader = namekey("reader");

  expect(
    <TestNamespace>
      <VarDeclaration name={reader} type={IO.BinaryReader}>
        new <InvocationExpression target={IO.BinaryReader} />
      </VarDeclaration>
      <hbr />
      <InvocationExpression
        target={memberRefkey(reader, IO.BinaryReader.ReadString)}
      />
      ;
    </TestNamespace>,
  ).toRenderTo(`
    using System.IO;

    BinaryReader reader = new BinaryReader();
    reader.ReadString();
  `);
});

it("has built-ins available", () => {
  const info = namekey("info");

  const template = (
    <TestNamespace>
      <List>
        <VarDeclaration name={info}>
          new {IO.FileInfo}("test.txt")
        </VarDeclaration>
        <VarDeclaration name="directoryName">
          {memberRefkey(info, "DirectoryName", "Length")}
        </VarDeclaration>
      </List>
    </TestNamespace>
  );

  expect(template).toRenderTo(`
    using System.IO;

    var info = new FileInfo("test.txt");
    var directoryName = info.DirectoryName?.Length;
  `);
});

/**
        <VarDeclaration name={info}>
          new {IO.FileInfo}("test.txt")
        </VarDeclaration>
        <VarDeclaration name="directoryName">
          {access(info, "DirectoryName", "Length")}
        </VarDeclaration>
 */
