import { describe, expect, it } from "vitest";
import {
  createElement,
  createFragment,
  createTextNode,
} from "../src/render/index.js";
import { textContent } from "./tree-test-utils.js";

describe("Node tree", () => {
  it("append/prepend/before/after build linked list correctly", () => {
    const root = createElement("group");
    const b = createTextNode("B");
    const c = createTextNode("C");
    root.append(b, c);
    const a = createTextNode("A");
    root.prepend(a);
    const d = createTextNode("D");
    c.after(d);
    const between = createTextNode("X");
    c.before(between);

    expect(textContent(root)).toBe("ABXCD");
    expect(root.firstChild).toBe(a);
    expect(root.lastChild).toBe(d);
    expect(a.nextSibling).toBe(b);
    expect(d.previousSibling).toBe(c);
  });

  it("replaceWith / remove maintain links", () => {
    const root = createElement("group");
    const a = createTextNode("A");
    const b = createTextNode("B");
    const c = createTextNode("C");
    root.append(a, b, c);
    const x = createTextNode("X");
    const y = createTextNode("Y");
    b.replaceWith(x, y);
    expect(textContent(root)).toBe("AXYC");
    expect(b.parentNode).toBeNull();
    a.remove();
    expect(textContent(root)).toBe("XYC");
    expect(root.firstChild).toBe(x);
  });

  it("Fragment splices children on insert and self-empties", () => {
    const root = createElement("group");
    const f = createFragment();
    f.append("hello", " ", "world");
    expect(f.firstChild).not.toBeNull();
    root.append(f);
    expect(f.firstChild).toBeNull();
    expect(f.parentNode).toBeNull();
    expect(textContent(root)).toBe("hello world");
  });

  it("indent element preserves nested text in tree order", () => {
    const root = createElement("group");
    const indent = createElement("indent");
    indent.append("first\nsecond\nthird");
    root.append("top\n", indent);
    expect(textContent(root)).toBe("top\nfirst\nsecond\nthird");
    expect(root.lastChild).toBe(indent);
  });

  it("moveBefore atomically relocates without disconnecting subtree", () => {
    const root = createElement("group");
    const a = createElement("group");
    const b = createElement("group");
    a.append("A-content");
    b.append("B-content");
    root.append(a, b);
    expect(textContent(root)).toBe("A-contentB-content");
    // Move a after b.
    root.moveBefore(a, null);
    expect(textContent(root)).toBe("B-contentA-content");
    // Subtree of `a` is untouched.
    expect(a.firstChild).not.toBeNull();
  });

  it("moveBefore is a no-op when already at target position", () => {
    const root = createElement("group");
    const a = createTextNode("A");
    const b = createTextNode("B");
    root.append(a, b);
    const aPrev = a.previousSibling;
    root.moveBefore(a, b);
    expect(a.previousSibling).toBe(aPrev);
    expect(textContent(root)).toBe("AB");
  });
});
