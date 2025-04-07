import {
  Children,
  ComponentCreator,
  ComponentDefinition,
} from "@alloy-js/core/jsx-runtime";
import { code, text } from "./code.js";

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
    const fn: StcComponentCreator<T> = (() => Component(args[0] as T)) as any;
    fn.component = Component;
    fn.props = args[0]! as T;
    fn.code = (template, ...substitutions): ComponentCreator<T> => {
      const propsWithChildren = {
        ...(args[0] ?? {}),
        children: code(template, ...substitutions),
      };

      const fn = () => Component(propsWithChildren as any);
      fn.component = Component;
      fn.props = args[0]! as T;
      return fn;
    };
    fn.text = (template, ...substitutions) => {
      const propsWithChildren = {
        ...(args[0] ?? {}),
        children: text(template, ...substitutions),
      };

      const fn = () => Component(propsWithChildren as any);
      fn.component = Component;
      fn.props = args[0]! as T;
      return fn;
    };
    fn.children = (...children: Children[]): ComponentCreator<T> => {
      const propsWithChildren = {
        ...(args[0] ?? {}),
        children,
      };

      const fn = () => Component(propsWithChildren as any);
      fn.component = Component;
      fn.props = args[0]! as T;
      return fn;
    };

    return fn;
  };
}
