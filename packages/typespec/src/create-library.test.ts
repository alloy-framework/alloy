import { toRefkey } from "@alloy-js/core";
import { beforeEach, expect, it } from "vitest";
import { getProgram, resetProgram } from "./contexts/program.js";
import { createLibrary } from "./create-library.js";
import { NamespaceSymbol } from "./symbols/index.js";

beforeEach(() => {
  resetProgram();
});

it("Creates symbols on demand", () => {
  const TypeSpec = createLibrary("TypeSpec", {
    string: { kind: "scalar" },
  });

  const program = getProgram(undefined);
  const typeSpecNs = program.members.symbolNames.get("TypeSpec");
  expect(typeSpecNs).toBeUndefined();

  const _ = toRefkey(TypeSpec);

  const typeSpecNs2 = program.members.symbolNames.get("TypeSpec");
  expect(typeSpecNs2).toBeDefined();
});

it("Works with nested namespaces", () => {
  const Http = createLibrary("TypeSpec.Http", {
    get: { kind: "decorator" },
  });

  const program = getProgram(undefined);
  const typeSpecNs = program.members.symbolNames.get("TypeSpec");
  expect(typeSpecNs).toBeUndefined();

  const _ = toRefkey(Http.get);

  const typeSpecNs2 = program.members.symbolNames.get("TypeSpec");
  expect(typeSpecNs2).toBeDefined();
});

it("Doesn't create duplicate namespaces", () => {
  const Http = createLibrary("TypeSpec.Http", {
    get: { kind: "decorator" },
    post: { kind: "decorator" },
  });

  const Rest = createLibrary("TypeSpec.Rest", {
    action: { kind: "decorator" },
  });

  const _ = [toRefkey(Http.get), toRefkey(Http.post), toRefkey(Rest.action)];

  const program = getProgram(undefined);
  const typeSpecNs = program.members.symbolNames.get(
    "TypeSpec",
  ) as NamespaceSymbol;
  expect(typeSpecNs).toBeDefined();

  const httpNs = typeSpecNs!.members.symbolNames.get("Http");
  expect(httpNs).toBeDefined();
  const restNs = typeSpecNs!.members.symbolNames.get("Rest");
  expect(restNs).toBeDefined();
});

it("has a refkey getter", () => {
  const Http = createLibrary("TypeSpec.Http", {
    get: { kind: "decorator" },
  });

  const ioKey = toRefkey(Http);
  expect(ioKey).toBeDefined();

  const brKey = toRefkey(Http.get);
  expect(brKey).toBeDefined();
});

it("Can reference types which haven't been created yet", () => {
  const TypeSpec = createLibrary("TypeSpec", {
    Foo: {
      kind: "model",
      members: {
        bar: { kind: "property", type: () => Other.Bar },
      },
    },
  });

  const Other = createLibrary("Other", {
    Bar: {
      kind: "model",
      members: {},
    },
  });

  const program = getProgram(undefined);

  expect(program.members.symbolNames.get("TypeSpec")).toBeUndefined();
  expect(program.members.symbolNames.get("Other")).toBeUndefined();
  const _ = toRefkey(TypeSpec.Foo.bar);

  expect(program.members.symbolNames.get("TypeSpec")).toBeDefined();
  expect(program.members.symbolNames.get("Other")).toBeDefined();
});
