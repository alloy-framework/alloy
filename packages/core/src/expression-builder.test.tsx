import { computed } from "@vue/reactivity";
import { expect, it } from "vitest";
import "../testing/extend-expect.js";
import { d } from "../testing/render.js";
import { code } from "./code.js";
import { Output } from "./components/Output.js";
import { Scope } from "./components/Scope.jsx";
import { SourceFile } from "./components/SourceFile.jsx";
import { useBinder } from "./context/binder.js";
import { ExpressionBuilder } from "./expression-builder.js";
import { namekey, Refkey } from "./refkey.js";
import { decl } from "./symbols/decl.js";

function DummyReference(props: { refkey: Refkey }) {
  const binder = useBinder();
  const symbol = binder!.getSymbolForRefkey(props.refkey);

  return computed(() => {
    if (!symbol.value) {
      return "<Unresolved symbol>";
    }
    return symbol.value.name;
  });
}

it("works", () => {
  const input = namekey("input");

  const builder = new ExpressionBuilder(input);
  process(builder);
  construct(builder);

  const { context, expression } = builder.build();

  function process(b: ExpressionBuilder) {
    b.replace((expr) => code`process(${expr})`);
  }

  function construct(b: ExpressionBuilder) {
    const buffer = namekey("buffer");

    b.pushContext(
      (expr) => code`const ${decl(buffer)} = Buffer.from(${expr});`,
    );

    b.replace(() => code`${buffer}.toString()`);
  }

  const tree = (
    <Output>
      <Scope>
        <SourceFile filetype="ts" path="example.ts" reference={DummyReference}>
          const {decl(input)} = getInput();
          <hbr />
          {context}
          <hbr />
          return {expression};
        </SourceFile>
      </Scope>
    </Output>
  );

  expect(tree).toRenderTo(d`
    const input = getInput();
    const buffer = Buffer.from(process(input));
    return buffer.toString();
  `);
});
