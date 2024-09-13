import { memo } from "@alloy-js/core/jsx-runtime";
import {
  computed,
  reactive,
  Ref,
  ShallowRef,
  shallowRef,
} from "@vue/reactivity";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useScope } from "./context/scope.js";
import { Refkey } from "./refkey.js";
export type Metadata = object;

/**
 * Flags that describe an output symbol.
 */
export enum OutputSymbolFlags {
  None = 0,

  /**
   * The symbol is an instance member container. Symbols with this flag will have a
   * instanceMemberScope property that contains symbols for instance members.
   */
  InstanceMemberContainer = 1 << 0,

  /**
   * The symbol is a static member container. Symbols with this flag will have a
   * staticMemberScope property that contains symbols for static members.
   */
  StaticMemberContainer = 1 << 1,
}

/**
 * An output symbol is a named entity that can be referenced in your output
 * code. Referencing symbols is generally accomplished by using a
 * {@link Refkey}.
 *
 * @remarks
 *
 * This interface is the base implementation of symbol. Generally, most
 * languages will have subtypes of this interface that provide additional,
 * language-specific metadata about declared symbols. For example, symbols in
 * TypeScript need to track whether they are exported or what kind of symbol
 * they are (e.g. type, value, parameter, etc.)
 *
 * Symbols are reactive values, which allows you to observe changes to the symbol
 * information. For example, a symbol's name may change if it becomes conflicted
 * with a symbol that is added later.
 */
export interface OutputSymbol {
  /**
   * The original name of the symbol, before any conflicts were resolved.
   */
  originalName: string;

  /**
   * The name of the symbol.
   */
  name: string;

  /**
   * The symbol's flags.
   */
  flags: OutputSymbolFlags;

  /**
   * The scope in which the symbol is defined.
   */
  scope: OutputScope;

  /**
   * A unique value that references this symbol.
   */
  refkey: Refkey;

  /**
   * The instance members available on this symbol.
   *
   * @remarks
   *
   * Instance members are members that are available when this symbol is
   * instantiated. Instantiation is language-specific. For example, in
   * TypeScript, instance members of symbols for classes are available when the
   * class is instantiated with a new expression.
   *
   * Unlike static members, instance members cannot be referenced directly with
   * a refkey, because these refkeys are not unique in your output. Instead,
   * instance members are resolved using the {@link resolveMember} function
   * which requires passing in the root symbol to resolve members from.
   *
   * When a symbol cannot have instance members, this is undefined.
   */
  instanceMemberScope?: OutputScope;

  /**
   * The static members available on this symbol.
   *
   * @remarks
   *
   * Static members are members that are available on the symbol itself. These symbols
   * can be accessed off the parent symbol directly with a refkey. There is only ever
   * one static member symbol in the output (i.e., the symbol is unique).
   */
  staticMemberScope?: OutputScope;
}

/**
 * Flags that describe an output scope.
 */
enum OutputScopeFlags {
  None = 0,

  /**
   * This scope is a member scope. Scopes with this flag will have an `owner`
   * property that points to the symbol whose members this scope holds.
   */
  MemberScope = 1 << 0,
}

/**
 * A container of symbols accessible within some scope in your output code.
 *
 * @remarks
 *
 * Scopes form a tree. All scopes except the global scope have a parent scope
 * identified by `parent`. Scopes can have nested scopes which can be accessed
 * using the `children` property. Whether a child scope can be accessed from
 * the parent scope is determined by each language's scoping rules.
 *
 * This interface is the base implementation of scope. Generally, most languages
 * will have subtypes of this interface that provide additional metadata about
 * the scope. For example, TypeScript scopes need to track whether the scope
 * represents a package, module, class, function, etc.
 *
 * Scopes are reactive values, which allows you to observe changes to the scope
 * within a reactive context.
 */
export interface OutputScope {
  /**
   * The kind of scope. Subtypes will likely provide a set of known scope kinds.
   * The kind is not used by the binder itself.
   */
  kind: string;

  /**
   * The name of the scope.
   */
  name: string;

  /**
   * The flags that describe this scope.
   */
  flags: OutputScopeFlags;

  /**
   * The symbols defined within this scope.
   */
  symbols: Set<OutputSymbol>;

  /**
   * The symbols defined within this scope, indexed by refkey.
   */
  symbolsByRefkey: Map<Refkey, OutputSymbol>;

  /**
   * The scopes nested within this scope.
   */
  children: Set<OutputScope>;

  /**
   * The container of this scope.
   */
  parent: OutputScope | undefined;

  /**
   * The symbol that owns this scope. This is only defined for scopes that have
   * the {@link OutputScopeFlags.MemberScope} flag.
   */
  owner?: OutputSymbol;

  /**
   * The binder that created this scope.
   */
  binder: Binder;

  /**
   * Get the names of all symbols in this scope.
   */
  getSymbolNames(): Set<string>;
}

/**
 * The binder tracks all output scopes and symbols. Scopes are nested containers
 * for symbols.
 *
 * @remarks
 *
 * Symbol information is reactive because in certain situations this data may
 * change. For example, when a symbol becomes conflicted with another symbol,
 * one of the symbol names may change. Ensure that you interact with binder
 * values in a reactive context (i.e. within JSX/code template, or within
 * memo/computed/etc).
 *
 */
export interface Binder {
  /**
   * Create a new scope. The scope will be added to the parent scope's children.
   * The returned scope object is reactive.
   */
  createScope<T extends OutputScope>(
    args: {
      kind: T["kind"];
      name: string;
      parent?: OutputScope | undefined;
    } & Omit<T, keyof OutputScope>,
  ): T;

  /**
   * Create a new symbol. The symbol will be added to the parent scope's symbols.
   * The returned symbol object is reactive.
   */
  createSymbol<T extends OutputSymbol>(
    args: {
      name: string;
      scope?: OutputScope;
      refkey?: unknown;
      flags?: OutputSymbolFlags;
    } & Omit<T, keyof OutputSymbol>,
  ): T;

  /**
   * Resolve the given refkey in the current scope.
   *
   * @returns a ref for the resolution result.
   * @see {@link resolve} a convenience function that uses the current scope and
   * binder.
   */
  resolveDeclarationByKey<
    TScope extends OutputScope = OutputScope,
    TSymbol extends OutputSymbol = OutputSymbol,
  >(
    currentScope: TScope,
    key: Refkey,
  ): Ref<ResolutionResult<TScope, TSymbol> | undefined>;

  /**
   * Resolve an instance member of a symbol. The symbol should have an instance
   * member scope.
   *
   * @param currentScope - The scope the lookup is occurring in.
   * @param baseKey - The refkey of the symbol to begin resolving members on
   * @param members - An array of refkeys to resolve representing a member path
   *
   * @see {@link resolveMember} a convenience function that uses the current scope and binder.
   */
  resolveInstanceMemberByKey<
    TScope extends OutputScope = OutputScope,
    TSymbol extends OutputSymbol = OutputSymbol,
  >(
    currentScope: TScope,
    baseKey: Refkey,
    members: Refkey[],
  ): ShallowRef<ResolutionResult<TScope, TSymbol> | undefined>;

  globalScope: OutputScope;
}

/**
 * A successful resolution of a refkey.
 */
export interface ResolutionResult<
  TScope extends OutputScope,
  TSymbol extends OutputSymbol,
> {
  /**
   * The symbol for the resolved declaration.
   */
  targetDeclaration: TSymbol;
  /**
   * The scopes between the common scope and the reference
   */
  pathUp: TScope[];

  /**
   * The scopes between the common scope and the declaration.
   */
  pathDown: TScope[];

  /**
   * The scope which contains both the reference and the declaration.
   */
  commonScope: TScope | undefined;
}

export interface NameConflictResolver {
  (name: string, symbols: OutputSymbol[]): void;
}

export interface BinderOptions {
  nameConflictResolver?: NameConflictResolver;
}

export function createOutputBinder(options: BinderOptions = {}): Binder {
  const binder: Binder = {
    createScope,
    createSymbol,
    resolveDeclarationByKey,
    resolveInstanceMemberByKey,
    globalScope: undefined as any,
  };

  const globalSymbols = reactive(new Set<OutputSymbol>());

  binder.globalScope = reactive({
    kind: "global",
    name: "<global>",
    symbols: new Set(),
    symbolsByRefkey: new Map(),
    children: new Set(),
    parent: undefined,
    binder,
    flags: OutputScopeFlags.None,
    getSymbolNames: symbolNames(globalSymbols),
  });

  const knownDeclarations = new Map<Refkey, OutputSymbol>();
  const waitingDeclarations = new Map<Refkey, Ref<OutputSymbol | undefined>>();
  const waitingMembers = new Map<
    OutputSymbol,
    Map<Refkey, ShallowRef<OutputSymbol | undefined>>
  >();

  return binder;

  function createScope<T extends OutputScope>(
    args: {
      kind: string;
      name: string;
      parent?: OutputScope;
      flags?: OutputScopeFlags;
      owner?: OutputSymbol;
    } & Omit<T, keyof OutputScope>,
  ): T {
    const { kind, name, parent, owner, flags, ...rest } = args;

    const parentScope = parent ?? useScope() ?? binder.globalScope;
    const symbols = reactive(new Set<OutputSymbol>());
    const symbolsByRefkey = reactive(new Map<Refkey, OutputSymbol>());
    const scope: T = reactive({
      kind: kind,
      name: name,
      symbols,
      symbolsByRefkey,
      children: new Set(),
      parent: parentScope,
      flags: flags ?? OutputScopeFlags.None,
      owner: owner,
      binder,
      ...rest,
      getSymbolNames: symbolNames(symbols),
    }) as T;

    parentScope.children.add(scope);

    return scope as T;
  }

  function createSymbol<T extends OutputSymbol>(
    args: {
      name: string;
      scope?: OutputScope;
      refkey?: Refkey;
      flags?: OutputSymbolFlags;
    } & Omit<T, keyof OutputSymbol>,
  ): T {
    const {
      name,
      scope,
      refkey,
      flags = OutputSymbolFlags.None,
      ...rest
    } = args;

    const parentScope = scope ?? useScope() ?? binder.globalScope;
    const symbol = reactive({
      originalName: name,
      name: name,
      scope: parentScope,
      refkey,
      flags,
      ...rest,
    }) as T;

    if (args.flags && args.flags & OutputSymbolFlags.InstanceMemberContainer) {
      symbol.instanceMemberScope = createScope({
        kind: "member",
        name: "instance members",
        parent: parentScope,
        owner: symbol,
        flags: OutputScopeFlags.MemberScope,
      });
    }

    if (args.flags && args.flags & OutputSymbolFlags.StaticMemberContainer) {
      symbol.staticMemberScope = createScope({
        kind: "member",
        name: "static members",
        parent: parentScope,
        owner: symbol,
        flags: OutputScopeFlags.MemberScope,
      });
    }

    parentScope.symbols.add(symbol);
    parentScope.symbolsByRefkey.set(symbol.refkey, symbol);

    deconflict(symbol);

    if (parentScope.flags & OutputScopeFlags.MemberScope) {
      if (waitingMembers.has(parentScope.owner!)) {
        const waitingRefkeys = waitingMembers.get(parentScope.owner!)!;
        if (waitingRefkeys.has(symbol.refkey)) {
          const signal = waitingRefkeys.get(symbol.refkey)!;
          signal.value = symbol;
        }
      }
    } else if (refkey) {
      knownDeclarations.set(refkey, symbol);
      if (waitingDeclarations.has(refkey)) {
        const signal = waitingDeclarations.get(refkey)!;
        signal.value = symbol;
      }
    }
    return symbol;
  }

  function resolveDeclarationByKey<
    TScope extends OutputScope = OutputScope,
    TSymbol extends OutputSymbol = OutputSymbol,
  >(
    currentScope: TScope,
    key: Refkey,
  ): Ref<ResolutionResult<TScope, TSymbol> | undefined> {
    const targetDeclaration = knownDeclarations.get(key);
    let declSignal: Ref<TSymbol | undefined>;

    if (targetDeclaration) {
      // this any cast hides a ridiculous error, fix it probably
      declSignal = shallowRef(targetDeclaration) as any;
    } else {
      if (waitingDeclarations.has(key)) {
        declSignal = waitingDeclarations.get(key)! as Ref<TSymbol>;
      } else {
        declSignal = shallowRef();
        waitingDeclarations.set(key, declSignal);
      }
    }

    return computed(() => {
      if (declSignal.value !== undefined) {
        return buildResult(currentScope, declSignal.value);
      } else {
        return undefined;
      }
    });
  }

  function buildResult<
    TScope extends OutputScope = OutputScope,
    TSymbol extends OutputSymbol = OutputSymbol,
  >(
    currentScope: TScope,
    targetDeclaration: TSymbol,
  ): ResolutionResult<TScope, TSymbol> {
    const targetScope = targetDeclaration.scope;
    const targetChain = scopeChain(targetScope);
    const currentChain = scopeChain(currentScope);
    let diffStart = 0;
    while (
      targetChain[diffStart] &&
      currentChain[diffStart] &&
      targetChain[diffStart] === currentChain[diffStart]
    ) {
      diffStart++;
    }

    const pathUp = currentChain.slice(diffStart);
    const pathDown = targetChain.slice(diffStart);
    const commonScope = targetChain[diffStart - 1] ?? null;

    return {
      pathUp: pathUp as TScope[],
      pathDown: pathDown as TScope[],
      commonScope: commonScope as TScope,
      targetDeclaration,
    };
  }

  function resolveInstanceMemberByKey<
    TScope extends OutputScope = OutputScope,
    TSymbol extends OutputSymbol = OutputSymbol,
  >(
    currentScope: TScope,
    baseKey: Refkey,
    members: Refkey[],
  ): ShallowRef<ResolutionResult<TScope, TSymbol> | undefined> {
    const base = resolveDeclarationByKey(currentScope, baseKey);

    return computed(() => {
      if (!base.value) {
        return undefined;
      } else {
        let container = base.value.targetDeclaration as TSymbol;
        for (const member of members) {
          const memberSymbol = lookupMemberSymbol(container, member);

          if (!memberSymbol.value) {
            return undefined;
          }

          container = memberSymbol.value as TSymbol;
        }

        return buildResult(currentScope, container);
      }
    });

    function lookupMemberSymbol(
      base: OutputSymbol,
      member: Refkey,
    ): ShallowRef<OutputSymbol | undefined> {
      if (!base.instanceMemberScope) {
        // todo: throw an error?
        return shallowRef(undefined);
      }

      const sym = base.instanceMemberScope.symbolsByRefkey.get(members[0]);
      if (sym) {
        return shallowRef(sym);
      } else {
        // wait for the symbol.
        if (!waitingMembers.has(base)) {
          waitingMembers.set(base, new Map());
        }

        const waitingRefkeys = waitingMembers.get(base)!;
        if (waitingRefkeys.has(member)) {
          return waitingRefkeys.get(member)!;
        } else {
          const memberSignal = shallowRef();
          waitingRefkeys.set(member, memberSignal);
          return memberSignal;
        }
      }
    }
  }

  function scopeChain(scope: OutputScope | undefined) {
    const chain = [];
    while (scope) {
      chain.unshift(scope);
      scope = scope.parent;
    }

    return chain;
  }

  function deconflict(symbol: OutputSymbol) {
    const scope = symbol.scope;
    const existingNames = [...scope.symbols].filter(
      (sym) => sym.originalName === symbol.name,
    );

    if (existingNames.length < 2) {
      return;
    }

    if (options.nameConflictResolver) {
      options.nameConflictResolver(symbol.name, existingNames);
    } else {
      // default disambiguation is first-wins
      for (let i = 1; i < existingNames.length; i++) {
        existingNames[i].name = existingNames[i].originalName + "_" + (i + 1);
      }
    }
  }
}

/**
 * Resolve a refkey in the current scope. Returns a Ref for the resolution result.
 * The value of the ref will be undefined if the identifier hasn't been resolved yet.
 *
 * @remarks
 *
 * This API may return a ref for undefined, but that does not mean that the symbol is
 * not found. The symbol you're looking for may not have been declared yet. When the symbol
 * is declared, the ref will be updated with the resolution result.
 */
export function resolve<
  TScope extends OutputScope,
  TSymbol extends OutputSymbol,
>(refkey: Refkey): Ref<ResolutionResult<TScope, TSymbol>> {
  const scope = useScope();
  const binder = scope.binder;

  return binder.resolveDeclarationByKey(scope, refkey) as any;
}

/**
 * Resolve an instance member of a symbol. The symbol should have an instance
 * member scope.
 *
 * @remarks
 *
 * This API may return a ref for undefined, but that does not mean that the symbol is
 * not found. The symbol you're looking for may not have been declared yet. When the symbol
 * is declared, the ref will be updated with the resolution result.
 *
 * @param base - The refkey whose members you want to resolve
 * @param path - An array of refkeys to resolve representing a member path
 * @returns a ref for the resolution result. Returns undefined if the symbol
 * could not be resolved.
 */
export function resolveMember<
  TScope extends OutputScope,
  TSymbol extends OutputSymbol,
>(
  base: Refkey,
  path: Refkey[],
): Ref<ResolutionResult<TScope, TSymbol> | undefined> {
  const scope = useScope() as TScope;
  const binder = scope.binder;

  return binder.resolveInstanceMemberByKey(scope, base, path) as any;
}

const createSymbolsSymbol: unique symbol = Symbol();
export function getSymbolCreator(
  creator: SymbolCreator,
): SymbolCreator[typeof createSymbolsSymbol] {
  return creator[createSymbolsSymbol];
}

export function getSymbolCreatorSymbol(): typeof createSymbolsSymbol {
  return createSymbolsSymbol;
}

export interface SymbolCreator {
  [createSymbolsSymbol](binder: Binder): void;
}

function symbolNames(symbols: Set<OutputSymbol>): () => Set<string> {
  return memo(() => {
    const names = new Set<string>();
    for (const sym of symbols.values()) {
      names.add(sym.name);
    }

    return names;
  });
}
