import { expect, it, vi } from "vitest";

import {
  createNamedContext,
  Indent,
  List,
  ref,
  refkey,
  Show,
  SourceFile,
  TextTransform,
  useContext,
} from "../../src/index.js";
import { printTree, renderToString, renderTree } from "../../testing/render.js";

it("preserves child context, references, and reactive updates without rerendering components", () => {
  const context = createNamedContext<string>("prefix");
  const value = ref("first");
  let renders = 0;
  function Body() {
    renders++;
    const prefix = useContext(context);
    return (
      <List>
        {prefix}
        {value}
        {refkey("target")}
      </List>
    );
  }
  const tree = renderTree(
    <context.Provider value="scope">
      <SourceFile path="test.txt" filetype="text" reference={() => "reference"}>
        <TextTransform transform={(text) => `[${text}]`}>
          <Body />
        </TextTransform>
      </SourceFile>
    </context.Provider>,
  );
  expect(printTree(tree)).toBe("[scope\nfirst\nreference]");
  value.value = "second";
  expect(printTree(tree)).toBe("[scope\nsecond\nreference]");
  expect(renders).toBe(1);
});

it("measures transformed text rather than the original body when fitting groups", () => {
  const value = ref("a\nb");
  const transform = vi.fn((text: string) => text.replaceAll("\n", " "));
  const tree = renderTree(
    <group>
      before
      <br />
      <TextTransform transform={transform}>{value}</TextTransform>
    </group>,
  );
  expect(printTree(tree, { printWidth: 10 })).toBe("before a b");
  expect(transform).toHaveBeenCalledTimes(1);
  value.value = "longer\nbody";
  expect(printTree(tree, { printWidth: 10 })).toBe("before\nlonger body");
  expect(transform).toHaveBeenCalledTimes(2);
});

it("propagates line breaks introduced by transforms", () => {
  expect(
    renderToString(
      <group>
        before
        <br />
        <TextTransform transform={(text) => text.replace(" ", "\n")}>
          a b
        </TextTransform>
      </group>,
    ),
  ).toBe("before\na\nb");
});

it("uses print options for the body and applies outer indentation to its result", () => {
  const tree = renderTree(
    <Indent>
      <TextTransform transform={(text) => `[${text}]`}>
        <group>
          a<br />b
        </group>
        <Indent>c</Indent>
      </TextTransform>
    </Indent>,
  );
  expect(printTree(tree, { tabWidth: 4 })).toBe("\n    [a b\n        c]");
  expect(printTree(tree, { tabWidth: 4, printWidth: 1 })).toBe(
    "\n    [a\n    b\n        c]",
  );
});

it("composes nested transforms and keeps empty bodies in lists", () => {
  expect(
    renderToString(
      <List>
        <TextTransform transform={(text) => `[${text}]`}>
          <TextTransform transform={(text) => text.toUpperCase()}>
            abc
          </TextTransform>
        </TextTransform>
        <TextTransform transform={(text) => `empty:${text}`} />
        after
      </List>,
    ),
  ).toBe("[ABC]\nempty:\nafter");
});

it("preserves literal line whitespace and normalizes CRLF, CR, and LF", () => {
  const body = "first  \r\nsecond \rthird\n";
  expect(
    renderToString(
      <TextTransform transform={(text) => `[${text}]`}>{body}</TextTransform>,
    ),
  ).toBe("[first  \nsecond \nthird\n]");
});

it("tracks transforms added and removed reactively", () => {
  const visible = ref(false);
  const tree = renderTree(
    <Show when={visible.value}>
      <TextTransform transform={(text) => text.toUpperCase()}>
        abc
      </TextTransform>
    </Show>,
  );
  expect(printTree(tree)).toBe("");
  visible.value = true;
  expect(printTree(tree)).toBe("ABC");
  visible.value = false;
  expect(printTree(tree)).toBe("");
});

it("transforms alternate branches of ifBreak", () => {
  const visible = ref(false);
  const tree = renderTree(
    <group>
      <ifBreak
        flatContents={
          <Show when={visible.value}>
            <TextTransform transform={(text) => `[${text}]`}>abc</TextTransform>
          </Show>
        }
      >
        broken
      </ifBreak>
    </group>,
  );
  expect(printTree(tree)).toBe("");
  visible.value = true;
  expect(printTree(tree)).toBe("[abc]");
  expect(printTree(tree, { printWidth: 2 })).toBe("broken");
  visible.value = false;
  expect(printTree(tree)).toBe("");
});

it("surfaces transform errors", () => {
  const tree = renderTree(
    <TextTransform
      transform={() => {
        throw new Error("Cannot transform this body");
      }}
    >
      body
    </TextTransform>,
  );
  expect(() => printTree(tree)).toThrow("Cannot transform this body");
});
