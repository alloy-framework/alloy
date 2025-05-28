import { code, text } from "./code.js";
import { Children } from "./runtime/component.js";
import {
  createIntrinsic,
  IntrinsicElementBase,
  IntrinsicElements,
} from "./runtime/intrinsic.js";

export type StiSignature<T extends keyof IntrinsicElements> = (
  ...args: unknown extends T ? []
  : {} extends Omit<IntrinsicElements[T], "children"> ?
    [props?: IntrinsicElements[T]]
  : [props: IntrinsicElements[T]]
) => StiComponentCreator<T>;

export type StiComponentCreator<T extends keyof IntrinsicElements> =
  (() => IntrinsicElementBase<T>) & {
    code(
      template: TemplateStringsArray,
      ...substitutions: Children[]
    ): () => IntrinsicElementBase<T>;
    text(
      template: TemplateStringsArray,
      ...substitutions: Children[]
    ): () => IntrinsicElementBase<T>;
    children(...children: Children[]): () => IntrinsicElementBase<T>;
  };

export function sti<T extends keyof IntrinsicElements>(
  name: T,
): StiSignature<T> {
  return (...args) => {
    const props: IntrinsicElements[T] | undefined = args[0];
    const fn: StiComponentCreator<T> = () => createIntrinsic(name, props!);
    fn.children = (...children: Children[]) => {
      const propsWithChildren = {
        ...(props ?? {}),
        children,
      };

      return () => createIntrinsic(name, propsWithChildren as any);
    };

    fn.code = (template, ...substitutions) => {
      const propsWithChildren = {
        ...(args[0] ?? {}),
        children: code(template, ...substitutions),
      };

      return () => createIntrinsic(name, propsWithChildren as any);
    };

    fn.text = (template, ...substitutions) => {
      const propsWithChildren = {
        ...(args[0] ?? {}),
        children: text(template, ...substitutions),
      };

      return () => createIntrinsic(name, propsWithChildren as any);
    };
    return fn;
  };
}
