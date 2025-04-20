import "@alloy-js/core/testing";
import { d } from "@alloy-js/core/testing";
import { expect, it } from "vitest";
import { For } from "../../src/components/For.jsx";
import { onCleanup, printTree, reactive, renderTree } from "../../src/index.js";
import { flushJobs } from "../../src/scheduler.js";

it("works", () => {
  const messages = ["hi", "bye"];

  const template = (
    <For each={messages}>{(message) => <>{message}, Jose!</>}</For>
  );

  expect(template).toRenderTo(`
    hi, Jose!
    bye, Jose!
  `);
});

it("handles map entries", () => {
  const map = new Map([["a", { name: "foo" }]]);
  const entries = Array.from(map.entries());
  const template = (
    <For each={entries}>
      {([key, value]) => (
        <>
          {key}: {value.name}
        </>
      )}
    </For>
  );
  expect(template).toRenderTo(`
    a: foo
  `);
});

it("handles iterators", () => {
  const iterator = new Map([["a", { name: "foo" }]]).entries();
  const template = (
    <For each={iterator}>
      {([key, value]) => (
        <>
          {key}: {value.name}
        </>
      )}
    </For>
  );

  expect(template).toRenderTo(`
    a: foo
  `);
});

it("handles maps", () => {
  const map = new Map([["a", { name: "foo" }]]);
  const template = (
    <For each={map}>
      {(key, value) => (
        <>
          {key}: {value.name}
        </>
      )}
    </For>
  );

  expect(template).toRenderTo(`
    a: foo
  `);
});

it("doesn't rerender mappers", () => {
  const messages = reactive(["hi", "bye"]);
  let count = 0;
  const template = <For each={messages}>{() => <>item {count++}</>}</For>;
  const tree = renderTree(template);
  expect(count).toBe(2);

  messages.push("maybe");
  flushJobs();

  expect(count).toBe(3);
  expect(printTree(tree)).toBe(d`
    item 0
    item 1
    item 2
  `);
});

it("doesn't rerender mappers with sets", () => {
  const messages = reactive(new Set(["hi", "bye"]));
  let count = 0;
  const template = <For each={messages}>{() => <>item {count++}</>}</For>;
  const tree = renderTree(template);
  expect(count).toBe(2);

  messages.add("maybe");
  flushJobs();
  expect(count).toBe(3);
  expect(printTree(tree)).toBe(d`
    item 0
    item 1
    item 2
  `);
});

it("doesn't rerender mappers with maps", () => {
  const messages = reactive(
    new Map([
      ["hi", "one"],
      ["bye", "two"],
    ]),
  );

  let count = 0;
  const template = <For each={messages}>{() => <>item {count++}</>}</For>;
  const tree = renderTree(template);
  expect(count).toBe(2);

  messages.set("maybe", "three");
  flushJobs();
  expect(count).toBe(3);
  expect(printTree(tree)).toBe(d`
    item 0
    item 1
    item 2
  `);
});

it("doesn't rerender mappers (with splice)", () => {
  const messages = reactive(["hi", "maybe", "bye"]);
  let count = 0;
  const template = <For each={messages}>{(msg) => <>item {count++}</>}</For>;
  const tree = renderTree(template);
  expect(count).toBe(3);
  messages.splice(1, 1);
  flushJobs();
  // A sufficiently smart mapJoin would be able to handle this case...
  // but for now we re-render everything after the splice point.
  expect(count).toBe(4);

  expect(printTree(tree)).toBe(d`
    item 0
    item 3
  `);
});

it("cleans up things which end up removed (with push)", () => {
  const cleanups: string[] = [];

  function Letter(props: any) {
    onCleanup(() => {
      cleanups.push(props.letter);
    });

    return <>Letter {props.letter}</>;
  }

  const items = reactive(["a", "b"]);

  const template = <For each={items}>{(item) => <Letter letter={item} />}</For>;

  const tree = renderTree(template);

  expect(cleanups).toEqual([]);
  expect(printTree(tree)).toBe(d`
    Letter a
    Letter b
  `);

  items.pop();
  flushJobs();
  expect(cleanups).toEqual(["b"]);
  expect(printTree(tree)).toBe(d`
    Letter a
  `);

  items.pop();
  flushJobs();
  expect(cleanups).toEqual(["b", "a"]);
  expect(printTree(tree)).toBe("");
});

it("cleans up things which end up removed (with splice)", () => {
  const cleanups: string[] = [];

  function Letter(props: any) {
    onCleanup(() => {
      cleanups.push(props.letter);
    });

    return <>Letter {props.letter}</>;
  }

  const items = reactive(["a", "b", "c"]);

  const template = <For each={items}>{(item) => <Letter letter={item} />}</For>;

  const tree = renderTree(template);

  expect(cleanups).toEqual([]);
  expect(printTree(tree)).toBe(d`
    Letter a
    Letter b
    Letter c
  `);

  items.splice(1, 1);
  flushJobs();
  // A sufficiently smart mapJoin would be able to handle this case...
  // but for now we re-render everything after the splice point.
  expect(cleanups).toEqual(["b", "c"]);
  expect(printTree(tree)).toBe(d`
    Letter a
    Letter c
  `);
});
