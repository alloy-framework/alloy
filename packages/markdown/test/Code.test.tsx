import { List, ref } from "@alloy-js/core";
import {
  d,
  printTree,
  renderToString,
  renderTree,
} from "@alloy-js/core/testing";
import { marked } from "marked";
import { expect, it } from "vitest";

import { Code } from "../src/components/Code.jsx";
import { mdTest } from "./utils.jsx";

it("renders with js value", () => {
  const template = mdTest(
    <Code lang="ts" children={"const foo = 123;\nconsole.log(foo);"} />,
  );

  expect(template).toRenderTo(d`
    \`\`\`ts
    const foo = 123;
    console.log(foo);
    \`\`\`
  `);
});

it("renders with children", () => {
  const template = mdTest(
    <Code lang="ts">
      <List>
        <>const foo = 123;</>
        <>console.log(foo);</>
      </List>
    </Code>,
  );

  expect(template).toRenderTo(d`
    \`\`\`ts
    const foo = 123;
    console.log(foo);
    \`\`\`
  `);
});

it("omits an absent language instead of emitting undefined", () => {
  const output = renderToString(<Code>plain text</Code>);
  expect(output).toBe("```\nplain text\n```");
  const tokens = marked.lexer(output);
  expect(tokens).toHaveLength(1);
  expect(tokens[0]).toMatchObject({
    type: "code",
    lang: "",
    text: "plain text",
  });
});

it.each(["before\n```\nafter", "before\n``````\nafter"])(
  "keeps conflicting fences in a single parsed code block: %s",
  (body) => {
    const output = renderToString(<Code lang="md">{body}</Code>);
    const tokens = marked.lexer(output);
    expect(tokens).toHaveLength(1);
    expect(tokens[0]).toMatchObject({ type: "code", lang: "md", text: body });
  },
);

it("chooses fences from composed children and updates them without rerendering components", () => {
  const run = ref("``");
  let renders = 0;
  function Body() {
    renders++;
    return (
      <List>
        before
        <>{run}`</>
        after
      </List>
    );
  }
  const tree = renderTree(
    <Code lang="md">
      <Body />
    </Code>,
  );
  expect(printTree(tree)).toBe("````md\nbefore\n```\nafter\n````");
  run.value = "`````";
  const output = printTree(tree);
  expect(output).toBe("```````md\nbefore\n``````\nafter\n```````");
  const tokens = marked.lexer(output);
  expect(tokens).toHaveLength(1);
  expect(tokens[0]).toMatchObject({
    type: "code",
    lang: "md",
    text: "before\n``````\nafter",
  });
  expect(renders).toBe(1);
});

it("preserves info strings containing backticks with safe tilde fences", () => {
  const body = "before\n~~~\nafter\n";
  const output = renderToString(
    <Code lang={' md title="`example`" '}>{body}</Code>,
  );
  expect(output).toBe('~~~~md title="`example`"\nbefore\n~~~\nafter\n\n~~~~');
  const tokens = marked.lexer(output);
  expect(tokens).toHaveLength(1);
  expect(tokens[0]).toMatchObject({
    type: "code",
    lang: 'md title="`example`"',
    text: body,
  });
});

it("preserves whitespace and trailing blank lines in string bodies", () => {
  const body = "first  \nsecond\n\n";
  const tokens = marked.lexer(renderToString(<Code>{body}</Code>));
  expect(tokens).toHaveLength(1);
  expect(tokens[0]).toMatchObject({ type: "code", text: body });
});

it.each(["md\ninjected", "md\r", "\nmd"])(
  "rejects multiline info strings: %j",
  (lang) => {
    expect(() => renderToString(<Code lang={lang}>body</Code>)).toThrow(
      "Code lang must be a single-line Markdown info string.",
    );
  },
);
