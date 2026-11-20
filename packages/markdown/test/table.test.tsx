import {
  code,
  createContext,
  For,
  printTree,
  ref,
  renderTree,
  useContext,
} from "@alloy-js/core";
import { d } from "@alloy-js/core/testing";
import { decode } from "html-entities";
import { marked, type Tokens } from "marked";
import { expect, it } from "vitest";

import { InlineCode } from "../src/components/inline-code.jsx";
import { Table, TableCell, TableRow } from "../src/components/table.jsx";
import { useTableContext } from "../src/context/table.js";
import { mdTest } from "./utils.jsx";

function parseTable(markdown: string) {
  const tokens = marked.lexer(markdown);
  expect(tokens).toHaveLength(1);
  const table = tokens.find(
    (token): token is Tokens.Table => token.type === "table",
  );
  if (!table) {
    throw new Error("Expected a parsed GFM table.");
  }
  return table;
}

function visibleText(markdown: string) {
  const html = marked.parseInline(markdown, { async: false });
  return decode(html.replace(/<br\s*\/?>/g, "\n").replace(/<[^>]*>/g, ""));
}

it("separates two direct rows without relying on a For joiner", () => {
  const template = mdTest(
    <Table columns={[{ header: "Name" }, { header: "Value" }]}>
      <TableRow>
        <TableCell>one</TableCell>
        <TableCell>1</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>two</TableCell>
        <TableCell>2</TableCell>
      </TableRow>
    </Table>,
  );
  expect(template).toRenderTo(d`
    |Name |Value |
    | --- | --- |
    |one |1 |
    |two |2 |
  `);
});

it("composes InlineCode pipes in headings and two direct rows", () => {
  const template = mdTest(
    <Table
      columns={[
        { header: <InlineCode>{"kind | type"}</InlineCode> },
        { header: "Value" },
      ]}
    >
      <TableRow>
        <TableCell>
          <InlineCode>{"string | null"}</InlineCode>
        </TableCell>
        <TableCell>one</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          <InlineCode>{"^(a|b)\\.json$"}</InlineCode>
        </TableCell>
        <TableCell>two</TableCell>
      </TableRow>
    </Table>,
  );
  expect(template).toRenderTo(d`
    |\`kind \\| type\` |Value |
    | --- | --- |
    |\`string \\| null\` |one |
    |\`^(a\\|b)\\.json$\` |two |
  `);
  const table = parseTable(printTree(renderTree(template)));
  expect(table.header.map((cell) => visibleText(cell.text))).toEqual([
    "kind | type",
    "Value",
  ]);
  expect(
    table.rows.map((row) => row.map((cell) => visibleText(cell.text))),
  ).toEqual([
    ["string | null", "one"],
    ["^(a|b)\\.json$", "two"],
  ]);
});

it("provides table context in headers and cells without leaking outside", () => {
  function InlineContent() {
    return useTableContext() ? "A\\|B" : "A|B";
  }
  const template = mdTest(
    <>
      <InlineContent />
      <Table columns={[{ header: <InlineContent /> }]}>
        <TableRow>
          <TableCell>
            <InlineContent />
          </TableCell>
        </TableRow>
      </Table>
      <InlineContent />
    </>,
  );
  expect(template).toRenderTo(d`
    A|B

    |A\\|B |
    | --- |
    |A\\|B |

    A|B
  `);
});

it("preserves direct string punctuation, backticks and empty cells without adding columns", () => {
  const literal = "A | B <T> & `literal backticks` &amp;";
  const inlineCode = "``A \\| B <T> &amp; `tick` ``";
  const markdown = printTree(
    renderTree(
      mdTest(
        <Table
          columns={[
            { header: "Type", align: "left" },
            { header: "`Literal`", align: "center" },
            { header: "Empty", align: "right" },
          ]}
        >
          <TableRow>
            <TableCell>{literal}</TableCell>
            <TableCell>{inlineCode}</TableCell>
            <TableCell />
          </TableRow>
        </Table>,
      ),
    ),
    { printWidth: 20 },
  );
  const table = parseTable(markdown);

  expect(table.align).toEqual(["left", "center", "right"]);
  expect(table.header.map((cell) => visibleText(cell.text))).toEqual([
    "Type",
    "`Literal`",
    "Empty",
  ]);
  expect(table.rows).toHaveLength(1);
  expect(table.rows[0].map((cell) => visibleText(cell.text))).toEqual([
    literal,
    inlineCode,
    "",
  ]);
});

it("passes composed JSX through in its owning context without escaping its output", () => {
  const Value = createContext<string>();
  const value = ref("A \\| B");
  let renders = 0;
  function Description() {
    renders++;
    const label = useContext(Value);
    return code`**${label}:** \`${value}\``;
  }

  const tree = renderTree(
    mdTest(
      <Value.Provider value="Allowed">
        <Table columns={[{ header: "Description" }]}>
          <TableRow>
            <TableCell>
              <Description /> & direct
            </TableCell>
          </TableRow>
        </Table>
      </Value.Provider>,
    ),
  );
  const markdown = printTree(tree);
  const before = parseTable(markdown);
  expect(visibleText(before.rows[0][0].text)).toBe("Allowed: A | B & direct");
  expect(markdown).toContain("**Allowed:** `A \\| B`");
  expect(marked.parseInline(before.rows[0][0].text)).toContain("<code>");

  value.value = "<T> & C";
  const after = parseTable(printTree(tree));
  expect(visibleText(after.rows[0][0].text)).toBe("Allowed: <T> & C & direct");
  expect(renders).toBe(1);
});

it("keeps direct multiline descriptions within a single physical row", () => {
  const tree = renderTree(
    mdTest(
      <Table columns={[{ header: "Description" }, { header: "Notes" }]}>
        <TableRow>
          <TableCell>{"first\r\nsecond\n\nfourth"}</TableCell>
          <TableCell>
            Long description with **literal emphasis** and `A | B`.
          </TableCell>
        </TableRow>
      </Table>,
    ),
  );
  const markdown = printTree(tree, { printWidth: 25 });
  const table = parseTable(markdown);
  expect(markdown.trim().split("\n")).toHaveLength(3);
  expect(table.rows).toHaveLength(1);
  expect(visibleText(table.rows[0][0].text)).toBe("first\nsecond\n\nfourth");
  expect(visibleText(table.rows[0][1].text)).toBe(
    "Long description with **literal emphasis** and `A | B`.",
  );
});

it("does not inspect or repair pipes and physical newlines emitted by JSX", () => {
  function RawContent() {
    return "**unescaped | JSX**\nnext line";
  }
  const markdown = printTree(
    renderTree(
      mdTest(
        <Table columns={[{ header: "Caller-owned Markdown" }]}>
          <TableRow>
            <TableCell>
              <RawContent />
            </TableCell>
          </TableRow>
        </Table>,
      ),
    ),
  );
  expect(markdown).toContain("**unescaped | JSX**\nnext line");
});

it("renders a header-only table and composes body rows with For", () => {
  const table = parseTable(
    printTree(renderTree(mdTest(<Table columns={[{ header: "Name" }]} />))),
  );
  expect(table.header.map((cell) => visibleText(cell.text))).toEqual(["Name"]);
  expect(table.rows).toEqual([]);

  const body = parseTable(
    printTree(
      renderTree(
        mdTest(
          <Table columns={[{ header: "Name" }, { header: "Empty" }]}>
            <For each={["A | B", "<T>"]}>
              {(name) => (
                <TableRow>
                  <For each={[name, ""]} joiner="">
                    {(value) => <TableCell>{value}</TableCell>}
                  </For>
                </TableRow>
              )}
            </For>
          </Table>,
        ),
      ),
    ),
  );
  expect(
    body.rows.map((row) => row.map((cell) => visibleText(cell.text))),
  ).toEqual([
    ["A | B", ""],
    ["<T>", ""],
  ]);
});

it("rejects tables with no columns", () => {
  expect(() => printTree(renderTree(mdTest(<Table columns={[]} />)))).toThrow(
    "Table requires at least one column",
  );
});
