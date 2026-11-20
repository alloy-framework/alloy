import {
  createContext,
  List,
  printTree,
  ref,
  renderTree,
  useContext,
} from "@alloy-js/core";
import { marked } from "marked";
import { expect, it } from "vitest";

import { TableContext } from "../src/context/table.js";
import { Heading, InlineCode } from "../src/index.js";
import { mdTest } from "./utils.jsx";

it.each([
  ["plain", "`plain`"],
  ["a``b`c", "```a``b`c```"],
  ["``", "``` `` ```"],
  ["`name", "`` `name ``"],
  ["name`", "`` name` ``"],
  [" name ", "`  name  `"],
  [" name", "` name`"],
  ["name ", "`name `"],
  ["   ", "`   `"],
  ["a\r\nb\rc\nd", "`a b c d`"],
  ["a  \nb", "`a   b`"],
  ["\nname\n", "`  name  `"],
  ["| & < > [label] \\", "`| & < > [label] \\`"],
])("preserves parsed code-span text for %j", (text, expected) => {
  const output = printTree(renderTree(<InlineCode>{text}</InlineCode>));
  expect(output).toBe(expected);
  expect(marked.Lexer.lexInline(output)).toMatchObject([
    { type: "codespan", text: text.replace(/\r\n|\r|\n/g, " ") },
  ]);
});

it("renders an empty span as inline HTML", () => {
  expect(mdTest(<InlineCode />)).toRenderTo("<code></code>");
  expect(marked.parseInline(printTree(renderTree(<InlineCode />)))).toBe(
    "<code></code>",
  );
});

it("escapes direct string pipes only within the table context", () => {
  expect(
    <>
      <TableContext.Provider value={true}>
        <InlineCode>{"string | null"}</InlineCode>{" "}
        <InlineCode>{"^(a|b)\\.json$"}</InlineCode>
      </TableContext.Provider>{" "}
      <InlineCode>{"string | null"}</InlineCode>
    </>,
  ).toRenderTo("`string \\| null` `^(a\\|b)\\.json$` `string | null`");
});

it("leaves opaque JSX pipes unchanged inside table cells", () => {
  function Content() {
    return "a|b";
  }
  expect(
    <TableContext.Provider value={true}>
      <InlineCode>
        <Content />
      </InlineCode>
    </TableContext.Provider>,
  ).toRenderTo("`a|b`");
});

it("escapes updated direct string pipes inside table cells", () => {
  const text = ref("first");
  const tree = renderTree(
    <TableContext.Provider value={true}>
      <InlineCode>{text.value}</InlineCode>
    </TableContext.Provider>,
  );
  expect(printTree(tree)).toBe("`first`");
  text.value = "a|b";
  expect(printTree(tree)).toBe("`a\\|b`");
});

it("leaves JSX text unescaped while preserving its context", () => {
  const Name = createContext<string>();
  function NamePart() {
    return useContext(Name);
  }

  const output = printTree(
    renderTree(
      <Name.Provider value="`b">
        <InlineCode>
          {"a`"}
          <NamePart />
        </InlineCode>
      </Name.Provider>,
    ),
  );
  expect(output).toBe("`a``b`");
});

it("preserves JSX formatting without normalizing its line breaks", () => {
  const output = printTree(
    renderTree(
      <InlineCode>
        <List>
          <>first</>
          <>second</>
        </List>
      </InlineCode>,
    ),
  );
  expect(output).toBe("`first\nsecond`");
});

it("composes in a heading and a link label without treating content as markup", () => {
  const output = printTree(
    renderTree(
      <Heading level={2}>
        [<InlineCode>{"a`b [label]"}</InlineCode>](https://example.com)
      </Heading>,
    ),
  );
  expect(output).toBe("## [``a`b [label]``](https://example.com)");
  expect(marked.lexer(output)[0]).toMatchObject({
    type: "heading",
    depth: 2,
    tokens: [
      {
        type: "link",
        href: "https://example.com",
        tokens: [{ type: "codespan", text: "a`b [label]" }],
      },
    ],
  });
});

it("updates delimiters and padding when a direct string child changes", () => {
  const text = ref("name");
  const tree = renderTree(<InlineCode>{text.value}</InlineCode>);
  expect(printTree(tree)).toBe("`name`");

  text.value = "`name``";
  expect(printTree(tree)).toBe("``` `name`` ```");

  text.value = " name ";
  expect(printTree(tree)).toBe("`  name  `");
});

it("leaves reactive JSX content unescaped", () => {
  const text = ref("name");
  function Name() {
    return text;
  }
  const tree = renderTree(
    <InlineCode>
      <Name />
    </InlineCode>,
  );
  expect(printTree(tree)).toBe("`name`");

  text.value = "`name``";
  expect(printTree(tree)).toBe("``name```");

  text.value = " name ";
  expect(printTree(tree)).toBe("` name `");
});
