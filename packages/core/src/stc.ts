import {
  Children,
  ComponentCreator,
  ComponentDefinition,
  createIntrinsic,
  IntrinsicElementBase,
  JSX,
} from "@alloy-js/core/jsx-runtime";
import { code } from "./code.js";

export function sti<T extends keyof JSX.IntrinsicElements>(name: T) {
  return (
    ...args: unknown extends T ? []
    : {} extends Omit<JSX.IntrinsicElements[T], "children"> ?
      [props?: JSX.IntrinsicElements[T]]
    : [props: JSX.IntrinsicElements[T]]
  ) => {
    const props: JSX.IntrinsicElements[T] | undefined = args[0];
    const fn = () => createIntrinsic(name, props!);
    fn.children = (
      ...children: Children[]
    ): (() => IntrinsicElementBase<T>) => {
      const propsWithChildren = {
        ...(props ?? {}),
        children,
      };

      return () => createIntrinsic(name, propsWithChildren as any);
    };

    fn.code = (
      template: TemplateStringsArray,
      ...substitutions: Children[]
    ): (() => IntrinsicElementBase<T>) => {
      const propsWithChildren = {
        ...(args[0] ?? {}),
        children: code(template, ...substitutions),
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

export function stc<T extends {}>(Component: ComponentDefinition<T>) {
  return (
    ...args: unknown extends T ? []
    : {} extends Omit<T, "children"> ? [props?: MakeChildrenOptional<T>]
    : [props: MakeChildrenOptional<T>]
  ) => {
    const fn: ComponentCreator<T> & {
      code(
        template: TemplateStringsArray,
        ...substitutions: Children[]
      ): ComponentCreator<T>;
      children(...children: Children[]): ComponentCreator<T>;
    } = () => Component(args[0] as any);
    fn.component = Component;
    fn.props = args[0]!;
    fn.code = (
      template: TemplateStringsArray,
      ...substitutions: Children[]
    ): ComponentCreator<T> => {
      const propsWithChildren = {
        ...(args[0] ?? {}),
        children: code(template, ...substitutions),
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
