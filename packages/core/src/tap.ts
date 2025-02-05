import { ShallowRef, shallowRef } from "@vue/reactivity";
import { OutputScope, OutputSymbol } from "./binder.js";
import { useContext } from "./context.js";
import { DeclarationContext } from "./context/declaration.js";
import { MemberDeclarationContext } from "./context/member-declaration.js";
import { useScope } from "./context/scope.js";
import { SourceFileContext } from "./context/source-file.js";
import { ComponentDefinition } from "./jsx-runtime.js";

export interface Tap<T> extends ComponentDefinition {
  ref: ShallowRef<T | undefined>;
}

export interface Tapper<T> {
  (): T | undefined;
}

export interface Handler<T> {
  (value: T): void;
}

export function createTap<T = unknown>(
  tapper: Tapper<T>,
  handler?: Handler<T>,
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

export function createDeclarationTap<
  TSymbol extends OutputSymbol = OutputSymbol,
>(handler?: Handler<TSymbol>) {
  return createTap<TSymbol>(() => {
    return useContext(DeclarationContext) as any;
  }, handler);
}

export function createMemberTap<TSymbol extends OutputSymbol = OutputSymbol>(
  handler?: Handler<TSymbol>,
) {
  return createTap<TSymbol>(() => {
    return useContext(MemberDeclarationContext) as any;
  }, handler);
}

export function createScopeTap<TScope extends OutputScope = OutputScope>(
  handler?: Handler<TScope>,
) {
  return createTap<TScope>(() => {
    return useScope() as any;
  }, handler);
}

export function createSourceFileTap(handler?: Handler<SourceFileContext>) {
  return createTap(() => {
    return useContext(SourceFileContext);
  }, handler);
}
