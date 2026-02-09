import {
  Children,
  Declaration,
  For,
  Namekey,
  namekey,
  Output,
  OutputSymbol,
  shallowReactive,
} from "../src/index.js";

export interface TestWrapper {
  Wrapper: (props: { children: Children }) => Children;
  defkey: (name: string) => Namekey;
}

/**
 * Generic test wrapper creator.
 */
export function createTestWrapper<
  SymbolT extends OutputSymbol,
  ScopeT extends { spaces: any },
>(opts: {
  filePath: string;
  useScope: () => ScopeT | undefined;
  makeSymbol: (nk: Namekey, scope: ScopeT) => SymbolT;
  SourceFile: (props: { path: string; children: Children }) => any;
}): TestWrapper {
  const seen = shallowReactive(new Map<string, Namekey>());
  const created = new Map<Namekey, SymbolT>();

  function defkey(name: string): Namekey {
    const existing = seen.get(name);
    if (existing) return existing;
    const nk = namekey(name, {
      ignoreNamePolicy: true,
      ignoreNameConflict: true,
    });
    seen.set(name, nk);
    return nk;
  }

  function createSymbol(nk: Namekey) {
    const existing = created.get(nk);
    if (existing) return existing;
    const scope = opts.useScope();
    if (!scope) {
      throw new Error(`No SourceFile scope when declaring symbol: ${nk.name}`);
    }
    const sym = opts.makeSymbol(nk, scope);
    created.set(nk, sym);
    return sym;
  }

  function Wrapper(props: { children: Children }) {
    const SF = opts.SourceFile;
    return (
      <Output>
        <SF path={opts.filePath}>
          <For each={[...seen.values()]} joiner="">
            {(nk) => <Declaration symbol={createSymbol(nk)} />}
          </For>
          {props.children}
        </SF>
      </Output>
    );
  }

  return { Wrapper, defkey } as const;
}
