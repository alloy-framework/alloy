import { shallowRef } from "@vue/reactivity";
import { expect, it } from "vitest";
import { getDiagnosticsForTree, renderTree } from "../render.js";
import { flushJobs } from "../scheduler.js";
import { BasicSymbol } from "./basic-symbol.js";
import { emitSymbol } from "./symbol-flow.js";
import { createSymbolSlot } from "./symbol-slot.jsx";

it("captures firstSymbol", async () => {
  const Slot = createSymbolSlot();

  renderTree(
    <Slot>
      {() => {
        emitSymbol(new BasicSymbol("a", undefined));
      }}
    </Slot>,
  );
  await flushJobs();
  expect(Slot.firstSymbol.value).toBeDefined();
  expect(Slot.firstSymbol.value!.name).toBe("a");
});

it("emits error diagnostic when rendered more than once", async () => {
  const Slot = createSymbolSlot();

  const tree = renderTree(
    <>
      <Slot>
        {() => {
          emitSymbol(new BasicSymbol("a", undefined));
        }}
      </Slot>
      <Slot>
        {() => {
          emitSymbol(new BasicSymbol("b", undefined));
        }}
      </Slot>
    </>,
  );
  await flushJobs();

  const diagnostics = getDiagnosticsForTree(tree);
  expect(diagnostics.length).toBe(1);
  expect(diagnostics[0].severity).toBe("error");
  expect(diagnostics[0].message).toContain(
    "SymbolSlot rendered more than once",
  );
});

it("captures firstSymbol when emitting a ref to a symbol", async () => {
  const Slot = createSymbolSlot();
  const symref = shallowRef<BasicSymbol | undefined>();

  renderTree(
    <Slot>
      {() => {
        emitSymbol(symref);
      }}
    </Slot>,
  );
  await flushJobs();
  expect(Slot.firstSymbol.value).toBeUndefined();
  symref.value = new BasicSymbol("a", undefined);
  await flushJobs();
  expect(Slot.firstSymbol.value).toBeDefined();
  expect(Slot.firstSymbol.value!.name).toBe("a");
});
