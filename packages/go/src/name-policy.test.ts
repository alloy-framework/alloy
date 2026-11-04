import { expect, it } from "vitest";

import { createGoNamePolicyGetterWithPublic } from "./name-policy.js";

it("flips the first letter for plain names", () => {
  expect(createGoNamePolicyGetterWithPublic("function", true)("myFunc")).toBe(
    "MyFunc",
  );
  expect(createGoNamePolicyGetterWithPublic("function", false)("MyFunc")).toBe(
    "myFunc",
  );
});

it("keeps leading initialisms intact when flipping", () => {
  expect(createGoNamePolicyGetterWithPublic("function", false)("OSDisk")).toBe(
    "osDisk",
  );
  expect(createGoNamePolicyGetterWithPublic("function", true)("osDisk")).toBe(
    "OSDisk",
  );
  expect(
    createGoNamePolicyGetterWithPublic("function", false)("URLParser"),
  ).toBe("urlParser");
  expect(
    createGoNamePolicyGetterWithPublic("function", true)("urlParser"),
  ).toBe("URLParser");
  expect(
    createGoNamePolicyGetterWithPublic("function", false)("IDGenerator"),
  ).toBe("idGenerator");
});

it("treats a name that is just an initialism as one unit", () => {
  expect(createGoNamePolicyGetterWithPublic("function", false)("URL")).toBe(
    "url",
  );
  expect(createGoNamePolicyGetterWithPublic("function", true)("url")).toBe(
    "URL",
  );
  expect(createGoNamePolicyGetterWithPublic("function", false)("ID")).toBe(
    "id",
  );
});

it("prefers the longest initialism", () => {
  expect(
    createGoNamePolicyGetterWithPublic("function", false)("HTTPSServer"),
  ).toBe("httpsServer");
  expect(
    createGoNamePolicyGetterWithPublic("function", true)("httpsServer"),
  ).toBe("HTTPSServer");
  expect(createGoNamePolicyGetterWithPublic("function", false)("UID")).toBe(
    "uid",
  );
});

it("does not treat acronym-like words without a boundary as initialisms", () => {
  expect(createGoNamePolicyGetterWithPublic("function", false)("Oslo")).toBe(
    "oslo",
  );
  expect(createGoNamePolicyGetterWithPublic("function", true)("ident")).toBe(
    "Ident",
  );
});

it("ignores initialisms that are not leading", () => {
  expect(
    createGoNamePolicyGetterWithPublic("function", true)("getUserID"),
  ).toBe("GetUserID");
  expect(
    createGoNamePolicyGetterWithPublic("function", false)("GetUserID"),
  ).toBe("getUserID");
});

it("escapes reserved words after the public flip", () => {
  expect(createGoNamePolicyGetterWithPublic("function", true)("func")).toBe(
    "Func",
  );
  expect(createGoNamePolicyGetterWithPublic("function", false)("func")).toBe(
    "func_",
  );
});

it("leaves names alone when no public flag is given", () => {
  expect(createGoNamePolicyGetterWithPublic("function")("myFunc")).toBe(
    "myFunc",
  );
  expect(createGoNamePolicyGetterWithPublic("function")("func")).toBe("func_");
});
