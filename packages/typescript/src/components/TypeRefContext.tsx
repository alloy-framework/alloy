import type { Children, Component } from "@alloy-js/core";
import {
  isTypeRefContext,
  TypeRefContext as TypeRefContextDef,
} from "../context/type-ref-context.jsx";

export interface TypeRefContextProps {
  /**
   * Children
   */
  children: Children;
}

/**
 * Set the current context of reference to be type reference.
 *
 * @remarks
 * References used inside the children of this component will be treated as type reference {@link Reference}.
 *
 * Prefer using {@link ensureTypeRefContext} when wrapping the whole component to reduce tree nodes.
 */
export const TypeRefContext = ({ children }: TypeRefContextProps) => {
  return (
    <TypeRefContextDef.Provider value={{ type: true }}>
      {children}
    </TypeRefContextDef.Provider>
  );
};

/** Ensure the current component is inside a type ref context.
 * If not it will wrap in a {@link TypeRefContext} component.
 * If yes it will not add an extra node and return the original component.
 */
export function ensureTypeRefContext<TProps>(
  Comp: Component<TProps>,
): (props: TProps) => Children {
  return (props: TProps) => {
    const ref = isTypeRefContext();
    if (!ref) {
      return (
        <TypeRefContextDef.Provider value={{ type: true }}>
          <Comp {...props} />
        </TypeRefContextDef.Provider>
      );
    }

    return <Comp {...props} />;
  };
}
