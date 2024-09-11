import { Child, Children, code, mapJoin } from "@alloy-js/core";

/**
 * Allow component to specify generic typing
 */
export interface GenericTypes {
  generics?: Record<string, Children>;
}

/**
 * Collect generics types to pass definitions to components
 *
 * @remarks
 *
 * Input of `{ T: 'String' }` will produce `<T extends String>`.
 *
 * Can then be passed to class definition, method definition, using a generic class etc.
 *
 * @param generics - Record of type variable, (T, Z, etc), mapped to its bounds (if any).
 */
export function collectGenerics(generics: Record<string, Children>) {
  const genericTypes = mapJoin(
    new Map(Object.entries(generics)),
    (key, value) => {
      const extendsExpression = value ? code` extends ${value}` : "";
      return [key, extendsExpression];
    },
    {
      joiner: ", ",
    },
  );
  return code`<${genericTypes}>`;
}

/**
 * Pass generics types to an actual object. For instance if we are using the `List` class, we define it like `List<String>`
 * or whatever type we like. These are where we define the types. Can also pass wildcard types like `List<? extends String>`, which
 * allows you to pass unknown types.
 *
 * @param generics - Takes an array of either direct child (refkey or defining type), or a record which passes a wildcard type with optional bounds
 */
export function passGenerics(generics: (Child | Record<"?", Children>)[]) {
  return mapJoin(
    generics,
    (val) => {
      if (typeof val === "object" && val) {
        const key = Object.keys(val)[0];
        if (key === "?") {
          // @ts-expect-error Key is ? in this case
          const value = val[key];
          const extendsExpression = value ? code` extends ${value}` : "";
          return [key, extendsExpression];
        }
      }
      return val as Child;
    },
    { joiner: ", " },
  );
}
