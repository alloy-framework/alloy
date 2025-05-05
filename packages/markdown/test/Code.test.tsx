import { List } from "@alloy-js/core";
import "@alloy-js/core/testing";
import { d } from "@alloy-js/core/testing";
import { expect, it } from "vitest";
import { Code } from "../src/components/Code.jsx";
import { mdTest } from "./utils.jsx";

it("renders with js value", () => {
  const template = mdTest(
    <Code lang="ts" content={"const foo = 123;\nconsole.log(foo);"} />,
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
