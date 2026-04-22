import { describe, expect, it } from "vitest";
import {
  isValidCSharpIdentifier,
  isValidCSharpNamespace,
  sanitizeCSharpIdentifier,
} from "./identifier-utils.js";
import {
  csharpContextualKeywords,
  csharpKeywords,
  isCSharpContextualKeyword,
  isCSharpKeyword,
} from "./keywords.js";
import { createCSharpNamePolicy } from "./name-policy.js";

describe("isCSharpKeyword", () => {
  it("recognizes reserved keywords", () => {
    expect(isCSharpKeyword("class")).toBe(true);
    expect(isCSharpKeyword("interface")).toBe(true);
    expect(isCSharpKeyword("string")).toBe(true);
    expect(isCSharpKeyword("int")).toBe(true);
    expect(isCSharpKeyword("void")).toBe(true);
    expect(isCSharpKeyword("return")).toBe(true);
  });

  it("does not match contextual keywords", () => {
    expect(isCSharpKeyword("async")).toBe(false);
    expect(isCSharpKeyword("value")).toBe(false);
    expect(isCSharpKeyword("var")).toBe(false);
    expect(isCSharpKeyword("record")).toBe(false);
  });

  it("is case-sensitive — PascalCase versions are not keywords", () => {
    expect(isCSharpKeyword("Class")).toBe(false);
    expect(isCSharpKeyword("String")).toBe(false);
    expect(isCSharpKeyword("Int")).toBe(false);
    expect(isCSharpKeyword("Void")).toBe(false);
  });

  it("rejects non-keywords", () => {
    expect(isCSharpKeyword("MyClass")).toBe(false);
    expect(isCSharpKeyword("foo")).toBe(false);
  });

  it("keyword sets are non-empty", () => {
    expect(csharpKeywords.size).toBeGreaterThan(70);
    expect(csharpContextualKeywords.size).toBeGreaterThan(30);
  });
});

describe("isCSharpContextualKeyword", () => {
  it("recognizes contextual keywords", () => {
    expect(isCSharpContextualKeyword("async")).toBe(true);
    expect(isCSharpContextualKeyword("await")).toBe(true);
    expect(isCSharpContextualKeyword("value")).toBe(true);
    expect(isCSharpContextualKeyword("var")).toBe(true);
    expect(isCSharpContextualKeyword("record")).toBe(true);
    expect(isCSharpContextualKeyword("required")).toBe(true);
  });

  it("does not match reserved keywords", () => {
    expect(isCSharpContextualKeyword("class")).toBe(false);
    expect(isCSharpContextualKeyword("int")).toBe(false);
  });
});

describe("isValidCSharpIdentifier", () => {
  it("accepts valid identifiers", () => {
    expect(isValidCSharpIdentifier("MyClass")).toBe(true);
    expect(isValidCSharpIdentifier("_private")).toBe(true);
    expect(isValidCSharpIdentifier("name123")).toBe(true);
    expect(isValidCSharpIdentifier("a")).toBe(true);
    expect(isValidCSharpIdentifier("_")).toBe(true);
  });

  it("rejects invalid identifiers", () => {
    expect(isValidCSharpIdentifier("123start")).toBe(false);
    expect(isValidCSharpIdentifier("has-dash")).toBe(false);
    expect(isValidCSharpIdentifier("has space")).toBe(false);
    expect(isValidCSharpIdentifier("")).toBe(false);
    expect(isValidCSharpIdentifier("foo.bar")).toBe(false);
  });

  it("does not check for keywords (only character rules)", () => {
    // "class" has valid characters, even though it's a keyword
    expect(isValidCSharpIdentifier("class")).toBe(true);
  });
});

describe("isValidCSharpNamespace", () => {
  it("accepts valid dotted namespaces", () => {
    expect(isValidCSharpNamespace("My.Service.Models")).toBe(true);
    expect(isValidCSharpNamespace("System")).toBe(true);
    expect(isValidCSharpNamespace("A.B")).toBe(true);
  });

  it("rejects invalid namespaces", () => {
    expect(isValidCSharpNamespace("")).toBe(false);
    expect(isValidCSharpNamespace("Foo..Bar")).toBe(false);
    expect(isValidCSharpNamespace("Foo.1Bar")).toBe(false);
    expect(isValidCSharpNamespace("Foo.")).toBe(false);
    expect(isValidCSharpNamespace(".Foo")).toBe(false);
    expect(isValidCSharpNamespace("has-dash.ok")).toBe(false);
  });
});

describe("sanitizeCSharpIdentifier", () => {
  it("passes through valid identifiers unchanged", () => {
    expect(sanitizeCSharpIdentifier("ValidName")).toBe("ValidName");
    expect(sanitizeCSharpIdentifier("_private")).toBe("_private");
    expect(sanitizeCSharpIdentifier("name123")).toBe("name123");
  });

  it("prefixes underscore when first char is a digit", () => {
    expect(sanitizeCSharpIdentifier("1foo")).toBe("_1foo");
  });

  it("replaces non-word characters with underscore", () => {
    expect(sanitizeCSharpIdentifier("foo-bar")).toBe("foo_bar");
    expect(sanitizeCSharpIdentifier("has space")).toBe("has_space");
    expect(sanitizeCSharpIdentifier("a.b.c")).toBe("a_b_c");
  });

  it("handles leading special characters", () => {
    expect(sanitizeCSharpIdentifier("$foo")).toBe("_foo");
    expect(sanitizeCSharpIdentifier("-bar")).toBe("_bar");
  });

  it("handles empty string", () => {
    expect(sanitizeCSharpIdentifier("")).toBe("_");
  });
});

describe("createCSharpNamePolicy keyword escaping", () => {
  const policy = createCSharpNamePolicy();

  describe("PascalCase elements avoid most keyword conflicts naturally", () => {
    it("class element: 'string' becomes 'String' (not a keyword, no escape)", () => {
      expect(policy.getName("string", "class")).toBe("String");
    });

    it("class element: 'class' becomes 'Class' (not a keyword, no escape)", () => {
      expect(policy.getName("class", "class")).toBe("Class");
    });

    it("class-property element: 'value' becomes 'Value' (not a keyword, no escape)", () => {
      expect(policy.getName("value", "class-property")).toBe("Value");
    });
  });

  describe("camelCase elements may hit keywords and get @-escaped", () => {
    it("parameter: 'string' stays 'string' → gets @-escaped", () => {
      expect(policy.getName("string", "parameter")).toBe("@string");
    });

    it("variable: 'int' stays 'int' → gets @-escaped", () => {
      expect(policy.getName("int", "variable")).toBe("@int");
    });

    it("parameter: 'return' stays 'return' → gets @-escaped", () => {
      expect(policy.getName("return", "parameter")).toBe("@return");
    });

    it("variable: 'value' stays 'value' — contextual keyword, not escaped", () => {
      expect(policy.getName("value", "variable")).toBe("value");
    });

    it("parameter: 'async' stays 'async' — contextual keyword, not escaped", () => {
      expect(policy.getName("async", "parameter")).toBe("async");
    });
  });

  describe("non-keyword names pass through normally", () => {
    it("parameter: 'myParam' stays 'myParam'", () => {
      expect(policy.getName("myParam", "parameter")).toBe("myParam");
    });

    it("class: 'my-model' becomes 'MyModel'", () => {
      expect(policy.getName("my-model", "class")).toBe("MyModel");
    });

    it("parameter: 'some-param' becomes 'someParam'", () => {
      expect(policy.getName("some-param", "parameter")).toBe("someParam");
    });
  });

  describe("namespace handling", () => {
    it("applies PascalCase to each segment", () => {
      expect(policy.getName("my-service.models", "namespace")).toBe("MyService.Models");
    });

    it("single segment works", () => {
      expect(policy.getName("system", "namespace")).toBe("System");
    });

    it("escapes keyword segments", () => {
      // "namespace" as a namespace segment → PascalCase → "Namespace" → not a keyword
      expect(policy.getName("namespace", "namespace")).toBe("Namespace");
    });
  });

  describe("constant and private member escaping", () => {
    it("constant: 'class' becomes 'CLASS' (not a keyword)", () => {
      expect(policy.getName("class", "constant")).toBe("CLASS");
    });

    it("class-member-private: 'value' becomes '_value' (not a keyword)", () => {
      expect(policy.getName("value", "class-member-private")).toBe("_value");
    });
  });
});
