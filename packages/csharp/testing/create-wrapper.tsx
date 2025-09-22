import { SourceFile } from "#components/index.js";
import {
  Children,
  Declaration,
  For,
  namekey,
  Namekey,
  Output,
  shallowReactive,
} from "@alloy-js/core";
import { CSharpSymbol, useSourceFileScope } from "../src/index.js";

/**
 * Higher-order helper for tests which allows referencing symbols by name without
 * having to manually create declarations for each one ahead of time.
 *
 * The returned `Wrapper` component proxies its children
 * through a root component consisting of Output -> SourceFile -> {children}
 * while providing a `defkey` function for lazily
 * declaring unique namekeys by string name.
 *
 * If `defkey` is called multiple times with the same name, the same Namekey is
 * returned (idempotent). New names get a fresh Namekey instance.
 */
export function createCSharpTestWrapper() {
  const seen = shallowReactive(new Map<string, Namekey>());
  const createdSymbols = new Map<Namekey, CSharpSymbol>();

  function defkey(name: string): Namekey {
    const existing = seen.get(name);
    if (existing) {
      return existing;
    }
    const nk = namekey(name, {
      ignoreNamePolicy: true,
      ignoreNameConflict: true,
    });

    seen.set(name, nk);

    return nk;
  }

  function Wrapper(props: { children: Children }) {
    return (
      <Output>
        <SourceFile path="test.cs">
          <For each={[...seen.values()]} joiner="">
            {(nk) => <Declaration symbol={createSymbol(nk)} />}
          </For>
          {props.children}
        </SourceFile>
      </Output>
    );
  }

  function createSymbol(nk: Namekey) {
    const existing = createdSymbols.get(nk);
    if (existing) {
      return existing;
    }

    const scope = useSourceFileScope();

    if (!scope) {
      throw new Error(`No SourceFile scope when declaring symbol: ${nk.name}`);
    }

    const sym = new CSharpSymbol(nk, scope.spaces);
    createdSymbols.set(nk, sym);
    return sym;
  }

  return { Wrapper, defkey } as const;
}
