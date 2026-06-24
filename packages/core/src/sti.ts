import { code, text } from "./code.js";
import type { ElementNode } from "./render/node.js";
import { Children, _INTRINSIC_CREATOR } from "./runtime/component.js";
import { createIntrinsic } from "./runtime/create-intrinsic.js";
import { IntrinsicElements } from "./runtime/intrinsic.js";

export type StiSignature<T extends keyof IntrinsicElements> = (
  ...args: unknown extends T ? []
  : {} extends Omit<IntrinsicElements[T], "children"> ?
    [props?: IntrinsicElements[T]]
  : [props: IntrinsicElements[T]]
) => StiComponentCreator;

export type StiComponentCreator = (() => ElementNode) & {
  code(
    template: TemplateStringsArray,
    ...substitutions: Children[]
  ): () => ElementNode;
  text(
    template: TemplateStringsArray,
    ...substitutions: Children[]
  ): () => ElementNode;
  children(...children: Children[]): () => ElementNode;
};

export function sti<T extends keyof IntrinsicElements>(
  name: T,
): StiSignature<T> {
  return (...args) => {
    const props: IntrinsicElements[T] | undefined = args[0];
    const fn = markIntrinsicCreator(() =>
      createIntrinsic(name, props),
    ) as StiComponentCreator;
    fn.children = (...children: Children[]) => {
      const propsWithChildren = {
        ...(props ?? {}),
        children,
      };

      return markIntrinsicCreator(() =>
        createIntrinsic(name, propsWithChildren as any),
      );
    };

    fn.code = (template, ...substitutions) => {
      const propsWithChildren = {
        ...(args[0] ?? {}),
        children: code(template, ...substitutions),
      };

      return markIntrinsicCreator(() =>
        createIntrinsic(name, propsWithChildren as any),
      );
    };

    fn.text = (template, ...substitutions) => {
      const propsWithChildren = {
        ...(args[0] ?? {}),
        children: text(template, ...substitutions),
      };

      return markIntrinsicCreator(() =>
        createIntrinsic(name, propsWithChildren as any),
      );
    };
    return fn;
  };
}

function markIntrinsicCreator<T extends (...args: any[]) => ElementNode>(
  fn: T,
): T {
  (fn as any)[_INTRINSIC_CREATOR] = true;
  return fn;
}
