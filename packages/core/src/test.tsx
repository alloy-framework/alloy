import { render, type RenderTree } from "./render.js";
import { ref, reactive } from "@vue/reactivity";

function Foo(props: any) {
  return <>
    a
    {props.children}
    b
  </>
}

const arg1 = <>
  a, b, c
</>

function g() { return "hi" }

console.log(printTree(
    <>
      base
      <Indent>
        1
        2
        <Indent>
          3
          4
          <Indent>
            5
            6
          </Indent>
          7
          8
        </Indent>
        9
        10
      </Indent>
      11
      12
    </>
))

/*
function Bar({children}: any) {
  return <>
    {blah.propName}: str
    {children}
  </>
}

const blah = reactive({propName: "default"});

function Foo() {
  return <>
    class Bar:
      x: str
      <Bar>
        child2: child
      </Bar>
      y: str
  </>
}

const tree = render(  <Foo />);
printTree(tree);
*/

/*
customName.value = "bye";
printTree(tree);
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
    mapJoin(props.records, (path, types) => (
      <ImportStatement path={path} types={types} />
    ))
  );
}

interface ImportStatementProps {
  path: string;
  types: Set<string>;
}

function ImportStatement(props: ImportStatementProps) {
  return () =>
    `import { ${[...props.types.values()].join(", ")} } from "${props.path}";`;
}

const tree = render(<ImportStatements records={importRecords} />);
addImport("./foo.js", "hi");
printTree(tree);
addImport("./foo.js", "bye");
printTree(tree);
addImport("node:assert", "strictEqual");
printTree(tree);
*/
function printTree(tree: RenderTree) {
  console.log("## Source code:");
  console.log("```")
  console.log((tree as any).flat(Infinity).join(""));
  console.log("```");
}