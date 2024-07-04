import { it, expect } from "vitest";
import { Children, Component, memo } from "../../src/jsx-runtime.js";
import { ref, computed, reactive } from "@vue/reactivity";
import { RenderTree, render } from "../../src/render.js";
import { mapJoin } from "../../src/utils.js";
import "../extend-expect.util.js";
import { d, printTree } from "../render.utils.js";

it("renders text fragments", () => {
  function Foo() {
    return "bye";
  }

  expect(
    <>
      hi
      <Foo />
    </>
  ).toRenderTo(`
    hi
    bye
  `);
});

it("renders basic components", () => {
  function Bar(props: { children?: Children }) {
    return props.children;
  }

  function Foo() {
    return <Bar>hello</Bar>;
  }

  expect(<Foo />).toRenderTo("hello");
});

it("renders booleans appropriately", () => {
  function Foo() {
    return false;
  }

  expect(<Foo />).toRenderTo("");
});

it("splices in new nodes", () => {
  const r = ref(["one"]);
  const mapped = computed(() => {
    return r.value.map((v) => `mapped ${v}`).join(" ");
  });

  function Foo() {
    return <>{mapped.value} done</>;
  }

  const tree = render(<Foo />);
  expect(printTree(tree)).toEqual("mapped one done");
  r.value = [...r.value, "two"];

  expect(printTree(tree)).toEqual("mapped one mapped two done");
});

it.skip("works with fancy data types", () => {
  const importRecords: Map<string, Set<string>> = reactive(new Map());

  function addImport(path: string, type: string) {
    if (!importRecords.has(path)) {
      importRecords.set(path, new Set());
    }

    importRecords.get(path)!.add(type);
  }

  interface ImportStatementsProps {
    records: Map<string, Set<string>>;
  }

  function ImportStatements(props: ImportStatementsProps) {
    return memo(() => {
      let val = mapJoin(props.records, (path, types) => (
        <ImportStatement path={path} types={types} />
      ));
      console.log(JSON.stringify(val));
      return val;
    });
  }

  interface ImportStatementProps {
    path: string;
    types: Set<string>;
  }

  function ImportStatement(props: ImportStatementProps) {
    // when the `code` template tag is implemented, the lambda won't be needed.
    return () =>
      `import { ${[...props.types.values()].join(", ")} } from "${
        props.path
      }";`;
  }

  const tree = render(<ImportStatements records={importRecords} />);
  // the tree is empty.

  addImport("./foo.js", "hi");
  printTree(tree);
  // import { hi } from "./foo.js";
  console.log("!!!");

  addImport("node:assert", "strictEqual");
  console.log(printTree(tree));
  // import { hi, bye } from "./foo.js";
  // import { strictEqual } from "node:assert";
});

it("keeps spaces between expressions", () => {
  const str = "str"
  function getStr() { return "getStr" }
  expect(<>
    a {str} {str} {getStr()} {getStr()} c
  </>).toRenderTo("a str str getStr getStr c");
});