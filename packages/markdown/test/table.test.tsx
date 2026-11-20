import {
  code,
  createContext,
  For,
  printTree,
  Prose,
  ref,
  renderTree,
  useContext,
} from "@alloy-js/core";
import { decode } from "html-entities";
import { marked, type Tokens } from "marked";
import { expect, it } from "vitest";

import { Table, TableCell, TableRow } from "../src/components/table.jsx";
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

it("preserves literal punctuation, code contents and empty cells without adding columns", () => {
  const literal = "A | B <T> & `literal backticks` &amp;";
  const inlineCode = "``A \\| B <T> &amp; `tick` ``";
  const markdown = printTree(
    renderTree(
      mdTest(
        <Table
          columns={[
            { header: "Type", align: "left" },
            { header: "`Code`", align: "center" },
            { header: "Empty", align: "right" },
          ]}
        >
          <TableRow>
            <TableCell text={literal} />
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
    "Code",
    "Empty",
  ]);
  expect(table.rows).toHaveLength(1);
  expect(table.rows[0].map((cell) => visibleText(cell.text))).toEqual([
    literal,
    "A \\| B <T> &amp; `tick` ",
    "",
  ]);
  expect(marked.parseInline(table.rows[0][1].text)).toContain("<code>");
});

it("composes inline JSX once in its owning context and observes reactive updates", () => {
  const Value = createContext<string>();
  const value = ref("A | B");
  let renders = 0;
  function Description() {
    renders++;
    const label = useContext(Value);
    return code`**${label}:** ${value}`;
  }

  const tree = renderTree(
    mdTest(
      <Value.Provider value="Allowed">
        <Table columns={[{ header: "Description" }]}>
          <TableRow>
            <TableCell>
              <Description /> [details | examples](https://example.com/a%7Cb)
            </TableCell>
          </TableRow>
        </Table>
      </Value.Provider>,
    ),
  );
  const before = parseTable(printTree(tree));
  expect(visibleText(before.rows[0][0].text)).toBe(
    "Allowed: A | B details | examples",
  );
  expect(marked.parseInline(before.rows[0][0].text)).toContain(
    '<a href="https://example.com/a%7Cb">',
  );

  value.value = "<T> & C";
  const after = parseTable(printTree(tree));
  expect(visibleText(after.rows[0][0].text)).toBe(
    "Allowed: <T> & C details | examples",
  );
  expect(renders).toBe(1);
});

it("keeps multiline descriptions and inline formatting within a single physical row", () => {
  const tree = renderTree(
    mdTest(
      <Table columns={[{ header: "Description" }, { header: "Notes" }]}>
        <TableRow>
          <TableCell text={"first\r\nsecond\n\nfourth"} />
          <TableCell>
            <Prose>
              Long description with **emphasis** and `A | B` that wraps.
            </Prose>
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
  expect(visibleText(table.rows[0][1].text).replaceAll("\n", " ")).toBe(
    "Long description with emphasis and A | B that wraps.",
  );
  expect(marked.parseInline(table.rows[0][1].text)).toContain("<strong>");
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
                  <For each={[name, ""]}>
                    {(value) => <TableCell text={value} />}
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

it("rejects tables with no columns and rows with the wrong cell count", () => {
  expect(() => printTree(renderTree(mdTest(<Table columns={[]} />)))).toThrow(
    "Table requires at least one column",
  );
  for (const cells of [[], [<TableCell />, <TableCell />]]) {
    expect(() =>
      printTree(
        renderTree(
          mdTest(
            <Table columns={[{ header: "Name" }]}>
              <TableRow>{cells}</TableRow>
            </Table>,
          ),
        ),
      ),
    ).toThrow("TableRow requires 1 cell");
  }
});
