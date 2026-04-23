import {
  Children,
  Declaration,
  For,
  NameConflictResolver,
  Namekey,
  namekey,
  NamePolicy,
  Output,
  OutputSymbol,
  shallowReactive,
} from "../src/index.js";

/**
 * Test harness returned by {@link createTestWrapper}.
 */
export interface TestWrapper {
  /**
   * JSX wrapper providing Output + a file-level component + language scope context.
   * Name policy is applied only when `namePolicy`/`nameConflictResolver` are
   * passed to {@link createTestWrapper}. Pre-declares all namekeys created by
   * {@link TestWrapper.defkey} before rendering children.
   */
  Wrapper: (props: { children: Children }) => Children;

  /**
   * Creates a stable `Namekey` and schedules a pre-declaration inside
   * {@link TestWrapper.Wrapper}.
   *
   * @remarks
   * Call `defkey(name)` before rendering. `Wrapper` renders
   * `<Declaration symbol={...} />` for this name so `<Reference>` to the
   * returned namekey resolves without requiring an explicit `<Declaration>`
   * in the test body.
   *
   * @example
   * ```tsx
   * const { Wrapper, defkey } = createTestWrapper(...);
   * const fooKey = defkey("foo");
   * expect(
   *   <Wrapper><MyComponent refkey={fooKey} /></Wrapper>
   * ).toRenderTo(`foo`);
   * ```
   */
  defkey: (name: string) => Namekey;
}

/**
 * Create a reusable test harness for a language package. Returns a `Wrapper`
 * component (wraps content in `<Output>` + `<SourceFile>`) and a `defkey`
 * helper that creates stable namekeys for pre-declaring symbols.
 *
 * @remarks
 *
 * Downstream consumers import and call this from the language package's
 * `testing/` entrypoint. The `Wrapper` automatically declares symbols
 * created by `defkey` before rendering children, so tests can reference
 * symbols without explicit `<Declaration>` boilerplate.
 *
 * @example
 * ```ts
 * // In your language package's testing/ entrypoint:
 * import { FileComponent } from "./components/index.js"; // your language package's top-level file component
 * import { createTestWrapper, type TestWrapper } from "@alloy-js/core/testing";
 *
 * export function createMyLangTestWrapper(): TestWrapper {
 *   return createTestWrapper({
 *     filePath: "test.ext",
 *     useScope: useMyLangScope,
 *     makeSymbol: (nk, scope) => new MyOutputSymbol(nk, scope),
 *     SourceFile: FileComponent,
 *   });
 * }
 * ```
 *
 * @example
 * ```ts
 * // Extend your language test factory to accept and forward namePolicy:
 * export function createMyLangTestWrapper(namePolicy?: NamePolicy<string>): TestWrapper {
 *   return createTestWrapper({ ...langOpts, namePolicy });
 * }
 *
 * // In a name-policy test:
 * const { Wrapper } = createMyLangTestWrapper(myNamePolicy);
 * const fooKey = namekey("foo"); // namekey(), not defkey — name policy applies
 * // namekey() schedules no pre-declaration; the test body must declare the symbol.
 * expect(
 *   <Wrapper>
 *     <MyDeclaration refkey={fooKey} name="foo" />
 *   </Wrapper>
 * ).toRenderTo("FOO");
 * ```
 */
export function createTestWrapper<
  SymbolT extends OutputSymbol,
  ScopeT extends { spaces: any },
>(opts: {
  filePath: string;
  useScope: () => ScopeT | undefined;
  makeSymbol: (nk: Namekey, scope: ScopeT) => SymbolT;
  SourceFile: (props: { path: string; children: Children }) => any;
  namePolicy?: NamePolicy<string>;
  nameConflictResolver?: NameConflictResolver;
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
      <Output
        namePolicy={opts.namePolicy}
        nameConflictResolver={opts.nameConflictResolver}
      >
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
