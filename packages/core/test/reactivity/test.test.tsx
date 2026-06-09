import { memo } from "@alloy-js/core";
import { computed, reactive, ref } from "@vue/reactivity";
import { expect, it } from "vitest";
import { flushJobs } from "../../src/scheduler.js";
import { mapJoin } from "../../src/utils.js";

it("splices in new nodes", () => {
  const r = ref(["one"]);
  const mapped = computed(() => {
    return r.value.map((v) => `mapped ${v}`).join(" ");
  });

  function Foo() {
    return <>{mapped.value} done</>;
  }

  const tree = <Foo />;
  expect(tree).toRenderTo("mapped one done");
  r.value = [...r.value, "two"];

  expect(tree).toRenderTo("mapped one mapped two done");
});

it("works with a complex case", () => {
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
    return memo(() =>
      mapJoin(
        () => props.records,
        (path, types) => <ImportStatement path={path} types={types} />,
      ),
    );
  }

  interface ImportStatementProps {
    path: string;
    types: Set<string>;
  }

  function ImportStatement(props: ImportStatementProps) {
    // when the `code` template tag is implemented, the lambda won't be needed.
    return () =>
      `import { ${[...props.types.values()].join(", ")} } from "${props.path}";`;
  }

  const tree = <ImportStatements records={importRecords} />;
  // the tree is empty.

  expect(tree).toRenderTo("");

  addImport("./foo.js", "hi");
  flushJobs();
  expect(tree).toRenderTo('import { hi } from "./foo.js";');

  addImport("./foo.js", "bye");
  expect(tree).toRenderTo('import { hi, bye } from "./foo.js";');

  addImport("node:assert", "strictEqual");
  expect(tree).toRenderTo(`
    import { hi, bye } from "./foo.js";
    import { strictEqual } from "node:assert";
  `);
});

it("works with memos of memos", () => {
  const test = ref(1);
  const tree = memo(() => memo(() => test.value));
  expect(tree).toRenderTo("1");
  test.value = 2;
  expect(tree).toRenderTo("2");
});
