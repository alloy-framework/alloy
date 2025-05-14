import { ShallowRef, shallowRef } from "@vue/reactivity";
import { useContext } from "./context.js";
import { DeclarationContext } from "./context/declaration.js";
import { MemberDeclarationContext } from "./context/member-declaration.js";
import { useScope } from "./context/scope.js";
import { SourceFileContext } from "./context/source-file.js";
import { ComponentDefinition } from "./jsx-runtime.js";
import { OutputScope } from "./symbols/output-scope.js";
import { OutputSymbol } from "./symbols/output-symbol.js";

/**
 * The return value of {@link createTap}, this holds a reference to the tapped
 * value. It will be undefined until the tapped value is initialized.
 */
export interface Tap<T> extends ComponentDefinition {
  /** Ref for the tapped value */
  ref: ShallowRef<T | undefined>;
}

/**
 * A function called when the Tap is rendered.
 *
 * @returns The tapped value.
 */
export interface Tapper<T> {
  (): T | undefined;
}

/**
 * A function that is called when the tapped value is available.
 */
export interface TapHandler<T> {
  (value: T): void;
}

/**
 * Create a component that when rendered, initializes the tapped value
 * with the provided callback. This is useful for accessing context
 * provided by child components inside a parent component.
 *
 * @example
 * ```tsx
 * import { type Children, computed, createTap } from "@alloy-js/core";
 *
 * // context we will tap into
 * const SomeContext = createContext<string>();
 *
 * // a component which provides some specific context
 * function MyDeclaration(props: { children: Children }) {
 *   return <SomeContext.Provider value="Hello World">
 *     {props.children}
 *   </SomeContext.Provider>;
 * }
 *
 * // a parent component which wants to know about the context set
 * // by its children
 * function MySpecialDeclaration() {
 *   const SomeContextTap = createTap(() => useContext(SomeContext));
 *
 *   return <>
 *     The declaration context is: {SomeContextTap.ref}
 *     <MyDeclaration>
 *       <SomeContextTap />
 *     </MyDeclaration>
 *   </>
 * }
 *
 * @see {@link createDeclarationTap} for tapping {@link DeclarationContext}.
 * @see {@link createMemberTap} for tapping {@link MemberDeclarationContext}.
 * @see {@link createScopeTap} for tapping {@link OutputScope}.
 * @see {@link createSourceFileTap} for tapping {@link SourceFileContext}.
 * ```
 */
export function createTap<T = unknown>(
  tapper: Tapper<T>,
  handler?: TapHandler<T>,
): Tap<T> {
  const signal = shallowRef<T | undefined>(undefined);
  const fn = () => {
    signal.value = tapper();
    if (handler && signal.value !== undefined) {
      handler(signal.value);
    }

    return "";
  };

  fn.ref = signal;

  return fn;
}

/**
 * Create a tap for {@link DeclarationContext}.
 */
export function createDeclarationTap<
  TSymbol extends OutputSymbol = OutputSymbol,
>(handler?: TapHandler<TSymbol>) {
  return createTap<TSymbol>(() => {
    return useContext(DeclarationContext) as any;
  }, handler);
}

/**
 * Create a tap for {@link MemberDeclarationContext}.
 */
export function createMemberTap<TSymbol extends OutputSymbol = OutputSymbol>(
  handler?: TapHandler<TSymbol>,
) {
  return createTap<TSymbol>(() => {
    return useContext(MemberDeclarationContext) as any;
  }, handler);
}

/**
 * Create a tap for {@link OutputScope}.
 */
export function createScopeTap<TScope extends OutputScope = OutputScope>(
  handler?: TapHandler<TScope>,
) {
  return createTap<TScope>(() => {
    return useScope() as any;
  }, handler);
}

/**
 * Create a tap for {@link (SourceFileContext:interface)}.
 */
export function createSourceFileTap(handler?: TapHandler<SourceFileContext>) {
  return createTap(() => {
    return useContext(SourceFileContext);
  }, handler);
}
