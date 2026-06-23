import { code, memo } from "@alloy-js/core";
import { ref } from "@vue/reactivity";
import { expect, it } from "vitest";

it("handles refs in the tree", () => {
  const r = ref(42);
  const tree = <>The number is {r}</>;

  expect(tree).toRenderTo("The number is 42");
  r.value = 12;
  expect(tree).toRenderTo("The number is 12");
});

it("handles refs in the tree with code", () => {
  const r = ref(42);
  const tree = code`
    The number is ${r}
  `;

  expect(tree).toRenderTo("The number is 42");
  r.value = 12;
  expect(tree).toRenderTo("The number is 12");
});

it("handles memos in the tree", () => {
  const r = ref(42);
  const m = memo(() => r.value + 10);
  const tree = <>The number is {m}</>;

  expect(tree).toRenderTo("The number is 52");
  r.value = 12;
  expect(tree).toRenderTo("The number is 22");
});

it("handles memos in the tree with code", () => {
  const r = ref(42);
  const m = memo(() => r.value + 10);
  const tree = code`
    The number is ${m}
  `;

  expect(tree).toRenderTo("The number is 52");
  r.value = 12;
  expect(tree).toRenderTo("The number is 22");
});
