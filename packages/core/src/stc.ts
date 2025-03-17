import {
  Children,
  ComponentCreator,
  ComponentDefinition,
  createIntrinsic,
  IntrinsicElementBase,
  JSX,
} from "@alloy-js/core/jsx-runtime";
import { code, text } from "./code.js";

export type StiSignature<T extends keyof JSX.IntrinsicElements> = (
  ...args: unknown extends T ? []
  : {} extends Omit<JSX.IntrinsicElements[T], "children"> ?
    [props?: JSX.IntrinsicElements[T]]
  : [props: JSX.IntrinsicElements[T]]
) => StiComponentCreator<T>;

export type StiComponentCreator<T extends keyof JSX.IntrinsicElements> =
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

export function sti<T extends keyof JSX.IntrinsicElements>(
  name: T,
): StiSignature<T> {
  return (...args) => {
    const props: JSX.IntrinsicElements[T] | undefined = args[0];
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

export type MakeChildrenOptional<T extends object> =
  T extends { children?: any } ?
    Omit<T, "children"> & Partial<Pick<T, "children">>
  : T;

export type StcSignature<T extends {}> = (
  ...args: unknown extends T ? []
  : {} extends Omit<T, "children"> ? [props?: MakeChildrenOptional<T>]
  : [props: MakeChildrenOptional<T>]
) => StcComponentCreator<T>;

export type StcComponentCreator<T> = ComponentCreator<T> & {
  code(
    template: TemplateStringsArray,
    ...substitutions: Children[]
  ): ComponentCreator<T>;
  text(
    template: TemplateStringsArray,
    ...substitutions: Children[]
  ): ComponentCreator<T>;
  children(...children: Children[]): ComponentCreator<T>;
};

export function stc<T extends {}>(
  Component: ComponentDefinition<T>,
): StcSignature<T> {
  return (...args) => {
    const fn: StcComponentCreator<T> = () => Component(args[0] as any);
    fn.component = Component;
    fn.props = args[0]!;
    fn.code = (template, ...substitutions): ComponentCreator<T> => {
      const propsWithChildren = {
        ...(args[0] ?? {}),
        children: code(template, ...substitutions),
      };

      const fn = () => Component(propsWithChildren as any);
      fn.component = Component;
      fn.props = args[0]!;
      return fn;
    };
    fn.text = (template, ...substitutions) => {
      const propsWithChildren = {
        ...(args[0] ?? {}),
        children: text(template, ...substitutions),
      };

      const fn = () => Component(propsWithChildren as any);
      fn.component = Component;
      fn.props = args[0]!;
      return fn;
    };
    fn.children = (...children: Children[]): ComponentCreator<T> => {
      const propsWithChildren = {
        ...(args[0] ?? {}),
        children,
      };

      const fn = () => Component(propsWithChildren as any);
      fn.component = Component;
      fn.props = args[0]!;
      return fn;
    };

    return fn;
  };
}
