import { memo } from "@alloy-js/core/jsx-runtime";
import {
  computed,
  effect,
  reactive,
  Ref,
  ShallowRef,
  shallowRef,
} from "@vue/reactivity";
import { useMemberScope } from "./context/member-scope.js";
import { useScope } from "./context/scope.js";
import { refkey, Refkey } from "./refkey.js";
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

  /**
   * Whether this symbol contains members of any kind.
   */
  MemberContainer = InstanceMemberContainer | StaticMemberContainer,

  /**
   * Whether this symbol is an instance member of another symbol (i.e that it is
   * stored in an instance member scope).
   */
  InstanceMember = 1 << 2,

  /**
   * Whether this symbol is a static member of another symbol (i.e that it is
   * stored in a static member scope).
   */
  StaticMember = 1 << 3,

  /**
   * Whether this is an instance member or static member of another symbol.
   */
  Member = InstanceMember | StaticMember,
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
   * The binder instance that created this symbol.
   */
  binder: Binder;

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
export enum OutputScopeFlags {
  None = 0,

  /**
   * This scope is a static member scope.
   */
  StaticMemberScope = 1 << 0,

  /**
   * This scope is an instance member scope.
   */
  InstanceMemberScope = 1 << 1,

  /**
   * This scope is a member scope. Scopes with this flag will have an `owner`
   * property that points to the symbol whose member this scope holds.
   */
  MemberScope = StaticMemberScope | InstanceMemberScope,
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
   * the {@link OutputScopeFlags.StaticMemberScope} flag.
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
      flags?: OutputScopeFlags;
      owner?: OutputSymbol;
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
   * Instantiate the static members of a symbol into the instance members of
   * another symbol.
   *
   * @param sourceSym - The symbol to add instance members to.
   * @param targetSym - The symbol with the static members to instantiate.
   */
  instantiateSymbolInto(sourceSym: OutputSymbol, targetSym: OutputSymbol): void;

  /**
   * Add static members to an existing symbol.
   *
   * @param symbol - The symbol to add static members to.
   */
  addStaticMembersToSymbol(symbol: OutputSymbol): void;

  /**
   * Add instance members to an existing symbol.
   *
   * @param symbol - The symbol to add instance members to.
   */
  addInstanceMembersToSymbol(symbol: OutputSymbol): void;

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
    currentScope: TScope | undefined,
    currentMemberScope: TScope | undefined,
    key: Refkey,
  ): Ref<ResolutionResult<TScope, TSymbol> | undefined>;

  globalScope: OutputScope;
}

/**
 * A successful resolution of a refkey.
 *
 * @example
 *
 * Let's say we have the following scopes and symbols:
 *
 * ```
 * scope: global scope
 * ├── scope: namespace scope 1
 * │   └── symbol: foo
 * │       └── static member scope
 * │           └── symbol: bar
 * └── scope: namespace scope 2
 *    └── (resolve bar from here)
 * ```
 *
 * When we resolve the refkey for `bar` from within `namespace scope 2`, we will get the following
 * resolution result:
 *
 * * **targetDeclaration**: symbol bar, the symbol we resolved.
 * * **commonScope**: global scope, because this is the most specific scope that contains both the declaration and the reference.
 * * **pathUp**: [namespace scope 2], because this is the scope between the reference and the common scope.
 * * **pathDown**: [namespace scope 1], because this is the scope between the common scope and the declaration
 * * **memberPath**: [foo, bar], because we resolved a member symbol and these are the symbols that lead from the base declaration to the member symbol.
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

  /**
   * When resolving a member symbol, this is the path of symbols that lead from
   * the base declaration to the member symbol.
   */
  memberPath?: TSymbol[];
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
    addStaticMembersToSymbol,
    addInstanceMembersToSymbol,
    instantiateSymbolInto,
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
    const {
      kind,
      name,
      parent,
      owner,
      flags = OutputScopeFlags.None,
      ...rest
    } = args;

    if (flags & OutputScopeFlags.MemberScope) {
      if (!owner) {
        throw new Error("Member scopes must have an owner");
      }
    }

    // member scopes don't have a parent regular scope. Perhaps in the future
    // their parent would be something like a prototype object.
    let parentScope: OutputScope | undefined;
    if (parent) {
      parentScope = parent;
    } else if (flags & OutputScopeFlags.MemberScope) {
      parentScope = undefined;
    } else {
      parentScope = useScope() ?? binder.globalScope;
    }

    const symbols = reactive(new Set<OutputSymbol>());
    const symbolsByRefkey = reactive(new Map<Refkey, OutputSymbol>());
    const scope: T = reactive({
      kind: kind,
      name: name,
      symbols,
      symbolsByRefkey,
      children: new Set(),
      parent: parentScope,
      flags,
      owner,
      binder,
      ...rest,
      getSymbolNames: symbolNames(symbols),
    }) as T;

    if (parentScope) {
      parentScope.children.add(scope);
    }

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
      scope = useDefaultScope(args.flags),
      refkey,
      flags = OutputSymbolFlags.None,
      ...rest
    } = args;

    if (!scope) {
      throw new Error(
        "No scope was provided and no scope could be found in context",
      );
    }

    if (
      flags & OutputSymbolFlags.Member &&
      (scope.flags & OutputScopeFlags.MemberScope) === 0
    ) {
      throw new Error("Member symbols must be stored in a member scope.");
    }

    if (scope.flags & OutputScopeFlags.StaticMemberScope) {
      if (
        ~flags & OutputSymbolFlags.InstanceMember &&
        ~flags & OutputSymbolFlags.StaticMember
      ) {
        throw new Error(
          "Symbols stored in a member scope must have either OutputSymbolFlags.InstanceMember or OutputSymbolFlags.StaticMember flags",
        );
      }
    }

    const symbol = reactive({
      originalName: name,
      name: name,
      scope,
      refkey,
      binder,
      flags,
      ...rest,
    }) as T;

    if (args.flags && args.flags & OutputSymbolFlags.InstanceMemberContainer) {
      symbol.instanceMemberScope = createScope({
        kind: "member",
        name: "instance members",
        parent: undefined,
        owner: symbol,
        flags: OutputScopeFlags.InstanceMemberScope,
      });
    }

    if (args.flags && args.flags & OutputSymbolFlags.StaticMemberContainer) {
      symbol.staticMemberScope = createScope({
        kind: "member",
        name: "static members",
        parent: undefined,
        owner: symbol,
        flags: OutputScopeFlags.StaticMemberScope,
      });
    }

    scope.symbols.add(symbol);
    scope.symbolsByRefkey.set(symbol.refkey, symbol);

    deconflict(symbol);
    notifyRefkey(refkey, symbol);

    return symbol;
  }

  function instantiateSymbolInto(source: OutputSymbol, target: OutputSymbol) {
    if (~source.flags & OutputSymbolFlags.InstanceMemberContainer) {
      throw new Error("Can only instantiate symbols with instance members");
    }

    addInstanceMembersToSymbol(target);

    effect(() => {
      for (const sym of source.instanceMemberScope!.symbols) {
        if (target.instanceMemberScope!.symbols.has(sym)) {
          continue;
        }

        createSymbol({
          name: sym.name,
          scope: target.instanceMemberScope!,
          refkey: refkey(target.refkey, sym.refkey),
          flags: sym.flags | OutputSymbolFlags.InstanceMember,
        });
      }
    });
  }

  function addStaticMembersToSymbol(symbol: OutputSymbol) {
    if (symbol.flags & OutputSymbolFlags.StaticMemberContainer) {
      // nothing to do.
      return;
    }

    symbol.flags |= OutputSymbolFlags.StaticMemberContainer;
    symbol.staticMemberScope = createScope({
      kind: "member",
      name: "static members",
      parent: undefined,
      owner: symbol,
      flags: OutputScopeFlags.StaticMemberScope,
    });
  }

  function addInstanceMembersToSymbol(symbol: OutputSymbol) {
    if (symbol.flags & OutputSymbolFlags.InstanceMemberContainer) {
      // nothing to do.
      return;
    }

    symbol.flags |= OutputSymbolFlags.InstanceMemberContainer;
    symbol.instanceMemberScope = createScope({
      kind: "member",
      name: "instance members",
      parent: undefined,
      owner: symbol,
      flags: OutputScopeFlags.InstanceMemberScope,
    });
  }

  function resolveDeclarationByKey<
    TScope extends OutputScope = OutputScope,
    TSymbol extends OutputSymbol = OutputSymbol,
  >(
    currentScope: TScope | undefined,
    currentMemberScope: TScope | undefined,
    key: Refkey,
  ): Ref<ResolutionResult<TScope, TSymbol> | undefined> {
    const targetDeclaration = knownDeclarations.get(key);

    if (targetDeclaration) {
      // this any cast hides a ridiculous error, fix it probably
      return shallowRef(
        buildResult(currentScope, currentMemberScope, targetDeclaration),
      ) as any;
    } else {
      return waitForRefkey(key, (symbol) => {
        if (symbol) {
          return buildResult(currentScope, currentMemberScope, symbol);
        } else {
          return undefined;
        }
      });
    }
  }

  function buildResult<
    TScope extends OutputScope = OutputScope,
    TSymbol extends OutputSymbol = OutputSymbol,
  >(
    currentScope: TScope | undefined,
    currentMemberScope: TScope | undefined,
    targetDeclarationBase: TSymbol,
  ): ResolutionResult<TScope, TSymbol> {
    if (targetDeclarationBase.flags & OutputSymbolFlags.InstanceMember) {
      if (targetDeclarationBase.scope !== currentMemberScope) {
        throw new Error(
          "Cannot resolve member symbols from a different member scope",
        );
      }

      // todo: handle referencing nested objects by refkey
      return {
        pathUp: [],
        pathDown: [],
        memberPath: [targetDeclarationBase],
        commonScope: currentMemberScope,
        targetDeclaration: targetDeclarationBase,
      };
    }

    const { memberPath, scopeChain: targetChain } = scopeAndMemberChain<
      TScope,
      TSymbol
    >(targetDeclarationBase);
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
      pathUp,
      pathDown,
      memberPath,
      commonScope,
      targetDeclaration:
        memberPath && memberPath.length > 0 ?
          memberPath.at(0)!
        : targetDeclarationBase,
    };
  }

  function scopeAndMemberChain<
    TScope extends OutputScope,
    TSymbol extends OutputSymbol,
  >(symbol: TSymbol) {
    const result = {
      memberPath: [] as TSymbol[],
      scopeChain: [] as TScope[],
    };

    let currentSymbol = symbol;
    while (currentSymbol.flags & OutputSymbolFlags.StaticMember) {
      result.memberPath.unshift(currentSymbol);
      currentSymbol = currentSymbol.scope.owner! as TSymbol;
    }

    if (symbol.flags & OutputSymbolFlags.StaticMember) {
      result.memberPath.unshift(currentSymbol);
    }

    const startScope = currentSymbol.scope as TScope;
    result.scopeChain = scopeChain(startScope);

    return result;
  }

  function scopeChain<TScope extends OutputScope>(scope: TScope | undefined) {
    const chain = [];
    while (scope) {
      chain.unshift(scope);
      scope = scope.parent as TScope;
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

  function waitForRefkey<
    TScope extends OutputScope,
    TSymbol extends OutputSymbol,
  >(
    refkey: Refkey,
    cb: (
      symbol: TSymbol | undefined,
    ) => ResolutionResult<TScope, TSymbol> | undefined,
  ): ShallowRef<ResolutionResult<TScope, TSymbol> | undefined> {
    let declSignal;
    if (waitingDeclarations.has(refkey)) {
      declSignal = waitingDeclarations.get(refkey)! as ShallowRef<TSymbol>;
    } else {
      declSignal = shallowRef();
      waitingDeclarations.set(refkey, declSignal);
    }

    return computed(() => cb(declSignal.value));
  }

  function notifyRefkey(
    refkey: Refkey | undefined,
    symbol: OutputSymbol,
  ): void {
    if (!refkey) return;
    knownDeclarations.set(refkey, symbol);
    if (waitingDeclarations.has(refkey)) {
      const signal = waitingDeclarations.get(refkey)!;
      signal.value = symbol;
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
  const memberScope = useMemberScope();
  const binder = scope.binder;

  return binder.resolveDeclarationByKey(
    scope,
    memberScope?.instanceMembers,
    refkey,
  ) as any;
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

/**
 * Use symbol flags to determine the scope in which a symbol with those flags
 * should be declared given the current context.
 *
 * @param flags - The symbol flags to use to determine the default scope.
 * @returns an {@link OutputScope} that is the default scope for the given
 * flags.
 */
export function useDefaultScope(
  flags: OutputSymbolFlags = OutputSymbolFlags.None,
) {
  if ((flags & OutputSymbolFlags.Member) === 0) {
    return useScope();
  } else {
    const memberScope = useMemberScope();
    if (!memberScope) {
      throw new Error("Cannot declare member symbols without a member scope");
    }
    if (flags & OutputSymbolFlags.InstanceMember) {
      return memberScope.instanceMembers;
    } else {
      return memberScope.staticMembers;
    }
  }
}
