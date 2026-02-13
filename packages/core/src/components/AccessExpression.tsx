import {
  Children,
  childrenArray,
  ComponentCreator,
  computed,
  isComponentCreator,
  OutputSymbol,
  Refkeyable,
  symbolForRefkey,
  takeSymbols,
} from "../index.js";

/**
 * Base props that all language-specific Part components must include.
 * Language packages extend this with additional props.
 */
export interface BasePartProps {
  refkey?: Refkeyable;
  symbol?: OutputSymbol;
}

/**
 * Configuration for creating a language-specific access expression component.
 *
 * @typeParam TPartProps - The Part component's props type (extends BasePartProps)
 * @typeParam TPart - The descriptor type that formatPart receives
 */
export interface AccessExpressionConfig<TPartProps extends BasePartProps, TPart> {
  /**
   * Convert Part props + resolved symbol into a plain descriptor object.
   * Called once per Part during children processing. The returned descriptor
   * is wrapped in a computed + getter delegation for reactive optimization.
   */
  createDescriptor(
    props: TPartProps,
    symbol: OutputSymbol | undefined,
    first: boolean,
  ): TPart;

  /**
   * Extract the base content from the first part (the leftmost identifier).
   */
  getBase(part: TPart): Children;

  /**
   * Format a non-first part given its descriptor and the previous part.
   * Returns JSX children for that segment (e.g., `.foo`, `?.bar`, `[idx]`, `(args)`).
   * `inCallChain` is true when rendering inside a chunked call chain.
   */
  formatPart(part: TPart, prevPart: TPart, inCallChain: boolean): Children;

  /**
   * Identify which parts are function calls, for call chain detection.
   * When provided, the factory uses the chunked call chain algorithm
   * (line breaks after each call group) when more than one call is detected.
   * When omitted, the expression is always formatted linearly.
   */
  isCallPart?(part: TPart): boolean;

  /**
   * Additional check for whether call chain formatting should be used.
   * Called only when `isCallPart` is provided and more than one call is detected.
   * Return false to force linear formatting (e.g., TypeScript disables call
   * chains when any part has `await`).
   * Defaults to `() => true`.
   */
  canUseCallChains?(parts: TPart[]): boolean;

  /**
   * Post-process the accumulated expression after each part in linear
   * (non-call-chain) mode. Use this for language-specific wrapping like
   * TypeScript's `await` which wraps the entire expression so far.
   * Defaults to identity (returns expression unchanged).
   */
  wrapPartResult?(
    expression: Children,
    part: TPart,
    index: number,
    isLast: boolean,
  ): Children;
}

/**
 * Create a language-specific access/member expression component pair.
 *
 * Returns `{ Expression, Part }` where:
 * - `Expression` is the main component that collects Part children and renders the chain
 * - `Part` is a no-op component whose props are consumed by Expression
 *
 * The factory handles:
 * - Children collection and Part filtering
 * - Symbol resolution (refkey → symbol via binder, single computed per part)
 * - Reactive optimization (getter delegation over single computed per part)
 * - Flattening nested Expression instances
 * - `takeSymbols()` to prevent symbol leakage
 * - Call chain detection and chunked formatting algorithm
 */
export function createAccessExpression<
  TPartProps extends BasePartProps,
  TPart extends Record<string, unknown>,
>(config: AccessExpressionConfig<TPartProps, TPart>) {
  // Additional component references to match during flattening.
  // Used when the wrapper function (e.g. MemberExpression) differs
  // from the inner Expression function.
  const outerComponents: Function[] = [];

  function Expression(props: { children: Children }): Children {
    const children = flattenExpression(childrenArray(() => props.children));
    const parts = collectParts(children);
    takeSymbols();

    if (parts.length === 0) {
      return <></>;
    }

    const { isCallPart, canUseCallChains } = config;

    if (!isCallPart) {
      return computed(() => formatLinear(config, parts));
    }

    const isCallChain = computed(() => {
      if (canUseCallChains && !canUseCallChains(parts)) {
        return false;
      }
      let callCount = 0;
      for (const part of parts) {
        if (isCallPart(part)) callCount++;
      }
      return callCount > 1;
    });

    return computed(() => {
      return isCallChain.value
        ? formatCallChain(config, parts)
        : formatLinear(config, parts);
    });
  }

  function Part(_props: TPartProps) {
    // No-op — props are consumed by the parent Expression component.
  }

  function isExpressionComponent(child: unknown): boolean {
    if (isComponentCreator(child, Expression)) return true;
    for (const comp of outerComponents) {
      if (isComponentCreator(child, comp as any)) return true;
    }
    return false;
  }

  function flattenExpression(children: Children[]): Children[] {
    const flattened: Children[] = [];
    for (const child of children) {
      if (isExpressionComponent(child)) {
        flattened.push(
          ...flattenExpression(
            childrenArray(() => (child as ComponentCreator).props.children),
          ),
        );
      } else {
        flattened.push(child);
      }
    }
    return flattened;
  }

  function collectParts(children: Children[]): TPart[] {
    const parts: TPart[] = [];
    for (const child of children) {
      if (!isComponentCreator(child, Part)) continue;
      const partProps = child.props as TPartProps;
      const first = parts.length === 0;

      const symbolSource = computed(() => {
        if (partProps.refkey) {
          return symbolForRefkey(partProps.refkey).value;
        } else if (partProps.symbol) {
          return partProps.symbol;
        }
        return undefined;
      });

      const desc = computed(() =>
        config.createDescriptor(partProps, symbolSource.value, first),
      );

      // Create getter-delegation object for reactive optimization.
      // Property access on this object tracks the single `desc` computed.
      const keys = Object.keys(
        config.createDescriptor(partProps, undefined, first),
      );
      const proxy: Record<string, unknown> = {};
      for (const key of keys) {
        Object.defineProperty(proxy, key, {
          get() {
            return (desc.value as Record<string, unknown>)[key];
          },
          enumerable: true,
        });
      }

      parts.push(proxy as TPart);
    }
    return parts;
  }

  /**
   * Register an outer wrapper component for flattening support.
   * Call this after creating the wrapper function:
   *   `registerOuterComponent(MemberExpression);`
   */
  function registerOuterComponent(component: Function) {
    outerComponents.push(component);
  }

  return { Expression, Part, registerOuterComponent };
}

/**
 * Format parts linearly (no call chain grouping).
 */
function formatLinear<TPartProps extends BasePartProps, TPart>(
  config: AccessExpressionConfig<TPartProps, TPart>,
  parts: TPart[],
): Children {
  return computed(() => {
    let expression: Children = [];

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];

      if (i === 0) {
        (expression as Children[]).push(config.getBase(part));
      } else {
        const prevPart = parts[i - 1];
        const partExpr = config.formatPart(part, prevPart, false);

        if (Array.isArray(expression)) {
          expression.push(partExpr);
        } else {
          expression = (
            <>
              {expression}
              {partExpr}
            </>
          );
        }
      }

      if (config.wrapPartResult) {
        expression = config.wrapPartResult(
          expression,
          part,
          i,
          i === parts.length - 1,
        );
      }
    }

    return expression;
  });
}

/**
 * Format parts as a call chain with indented line breaks at call boundaries.
 */
function formatCallChain<TPartProps extends BasePartProps, TPart>(
  config: AccessExpressionConfig<TPartProps, TPart>,
  parts: TPart[],
): Children {
  return computed(() => {
    const expression: Children[] = [];
    const chunks: TPart[][] = [];
    let pi = 0;

    function pushPart() {
      chunks.at(-1)!.push(parts[pi]);
      pi++;
    }

    function pushChunk() {
      chunks.push([]);
    }

    // First chunk: take parts up to and including the first call
    pushChunk();
    while (
      pi < parts.length &&
      (pi === parts.length - 1 ||
        chunks.at(-1)!.length === 0 ||
        !config.isCallPart!(parts[pi + 1]))
    ) {
      pushPart();
      if (config.isCallPart!(chunks.at(-1)!.at(-1)!)) {
        break;
      }
    }

    // Remaining chunks: collect non-call parts then call parts
    while (pi < parts.length) {
      pushChunk();
      while (pi < parts.length && !config.isCallPart!(parts[pi])) {
        pushPart();
      }
      while (pi < parts.length && config.isCallPart!(parts[pi])) {
        pushPart();
      }
    }

    for (let ci = 0; ci < chunks.length; ci++) {
      const chunk = chunks[ci];
      const chunkExpr = [];
      for (let cpi = 0; cpi < chunk.length; cpi++) {
        if (ci === 0 && cpi === 0) {
          chunkExpr.push(config.getBase(chunk[0]));
          continue;
        }
        const part = chunk[cpi];
        const prevPart =
          cpi === 0 ? chunks[ci - 1].at(-1)! : chunk[cpi - 1];
        chunkExpr.push(config.formatPart(part, prevPart, true));
      }

      expression.push(
        ci === 0 ? chunkExpr : (
          <>
            <sbr />
            {chunkExpr}
          </>
        ),
      );
    }

    return (
      <group>
        <indent>{expression}</indent>
      </group>
    );
  });
}
