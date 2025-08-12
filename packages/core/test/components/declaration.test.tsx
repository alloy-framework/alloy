import { expect, it } from "vitest";
import { Output } from "../../src/components/Output.jsx";
import { Declaration, ref, renderTree, Scope } from "../../src/index.js";
import { flushJobs } from "../../src/scheduler.js";
import { BasicScope } from "../../src/symbols/basic-scope.js";

it("creates and cleans up a symbol", () => {
  const doDecl = ref(true);
  const scope = new BasicScope("test", undefined);
  const template = (
    <Output>
      <Scope value={scope}>
        {doDecl.value ?
          <Declaration name="foo"></Declaration>
        : ""}
      </Scope>
    </Output>
  );

  renderTree(template);

  expect(scope.symbols.size).toBe(1);
  doDecl.value = false;
  flushJobs();
  expect(scope.symbols.size).toBe(0);
});
