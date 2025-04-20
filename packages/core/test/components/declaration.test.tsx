import { expect, it } from "vitest";
import { Output } from "../../src/components/Output.jsx";
import {
  Declaration,
  ref,
  renderTree,
  Scope,
  useBinder,
} from "../../src/index.js";
import { flushJobs } from "../../src/scheduler.js";
import { createTap } from "../../src/tap.js";

it("creates and cleans up a symbol", () => {
  const GetBinder = createTap(() => {
    return useBinder();
  });

  const binderRef = GetBinder.ref;
  const doDecl = ref(true);
  const template = (
    <Output>
      <GetBinder />
      <Scope name="foo">
        {doDecl.value ?
          <Declaration name="foo"></Declaration>
        : ""}
      </Scope>
    </Output>
  );

  renderTree(template);

  const binder = binderRef.value!;
  const subScope = [...binder.globalScope.children][0];
  expect(subScope.symbols.size).toBe(1);
  doDecl.value = false;
  flushJobs();
  expect(subScope.symbols.size).toBe(0);
});
