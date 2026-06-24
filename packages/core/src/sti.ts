import { code, text } from "./code.js";
import { Children, Component, ComponentCreator } from "./runtime/component.js";
import { createIntrinsic } from "./runtime/create-intrinsic.js";
import { IntrinsicElements } from "./runtime/intrinsic.js";

export type StiSignature<T extends keyof IntrinsicElements> = (
  ...args: unknown extends T ? []
  : {} extends Omit<IntrinsicElements[T], "children"> ?
    [props?: IntrinsicElements[T]]
  : [props: IntrinsicElements[T]]
) => StiComponentCreator;

export type StiComponentCreator = ComponentCreator & {
  code(
    template: TemplateStringsArray,
    ...substitutions: Children[]
  ): ComponentCreator;
  text(
    template: TemplateStringsArray,
    ...substitutions: Children[]
  ): ComponentCreator;
  children(...children: Children[]): ComponentCreator;
};

export function sti<T extends keyof IntrinsicElements>(
  name: T,
): StiSignature<T> {
  // A stable component identity for this intrinsic. Producing `ComponentCreator`s
  // (rather than plain function thunks) means child collection
  // (`children()`/`childrenArray()`) treats them as opaque deferred thunks
  // instead of invoking them during keyed-child analysis. `insert` then runs
  // them at their real render position, inside the correct owner context, so
  // refkeys in indented `code` blocks resolve against the right scope.
  const component: Component = (props) =>
    createIntrinsic(name, props as IntrinsicElements[T]);
  // Give the component a readable identity so render-stack / error diagnostics
  // report the intrinsic name (e.g. "indent") rather than "component".
  Object.defineProperty(component, "name", { value: name });

  function createCreator(props?: IntrinsicElements[T]): ComponentCreator {
    const creator: ComponentCreator = () => createIntrinsic(name, props);
    creator.component = component;
    creator.props = props as any;
    return creator;
  }

  return (...args) => {
    const props: IntrinsicElements[T] | undefined = args[0];
    const fn = createCreator(props) as StiComponentCreator;

    fn.children = (...children: Children[]) =>
      createCreator({ ...(props ?? {}), children } as any);

    fn.code = (template, ...substitutions) =>
      createCreator({
        ...(props ?? {}),
        children: code(template, ...substitutions),
      } as any);

    fn.text = (template, ...substitutions) =>
      createCreator({
        ...(props ?? {}),
        children: text(template, ...substitutions),
      } as any);

    return fn;
  };
}
