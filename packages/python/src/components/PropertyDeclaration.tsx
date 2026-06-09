import {
  Children,
  DeclarationContext,
  List,
  Refkey,
  Show,
  childrenArray,
  code,
  createContext,
  findKeyedChild,
  findUnkeyedChildren,
  taggedComponent,
  useContext,
} from "@alloy-js/core";
import { PythonOutputSymbol } from "../index.js";
import { ParameterDescriptor } from "../parameter-descriptor.js";
import { createMethodSymbol } from "../symbols/factories.js";
import { Atom } from "./Atom.jsx";
import { DecoratorList } from "./DecoratorList.jsx";
import { CommonFunctionProps } from "./FunctionBase.js";
import { MethodDeclarationBase } from "./MethodBase.js";

const setterTag = Symbol();
const deleterTag = Symbol();

/** Context to provide property type information within a PropertyDeclaration */
const PropertyContext = createContext<Children | undefined>();

/**
 * Declares a Python property with optional getter, setter, and deleter methods.
 *
 * @example
 * ```tsx
 * <py.PropertyDeclaration name="name" type={{ children: "str" }}>
 *   return self._name
 * </py.PropertyDeclaration>
 * ```
 * Generates:
 * ```python
 * @property
 * def name(self) -> str:
 *     return self._name
 * ```
 *
 * @example Setter and deleter
 * ```tsx
 * <py.PropertyDeclaration name="value" type={{ children: "int" }}>
 *   return self._value
 *   <py.PropertyDeclaration.Setter type={{ children: "int" }}>
 *     self._value = value
 *   </py.PropertyDeclaration.Setter>
 *   <py.PropertyDeclaration.Deleter>
 *     del self._value
 *   </py.PropertyDeclaration.Deleter>
 * </py.PropertyDeclaration>
 * ```
 * Generates:
 * ```python
 * @property
 * def value(self) -> int:
 *     return self._value
 *
 * @value.setter
 * def value(self, value: int) -> None:
 *     self._value = value
 *
 * @value.deleter
 * def value(self) -> None:
 *     del self._value
 * ```
 *
 * @remarks
 * The property must be declared within a class. The getter method is
 * automatically generated using the `@property` decorator. Use the nested
 * `Setter` and `Deleter` components to add mutators.
 *
 * Use **`decorators`** for decorators that must appear **above** the intrinsic
 * `@property` (for example Pydantic `@computed_field`, `@typing.final`,
 * `@typing.override`). The first array entry is rendered topmost, matching
 * Python source order.
 *
 * @example Pydantic computed field
 * ```tsx
 * <py.PropertyDeclaration
 *   name="area"
 *   type="float"
 *   decorators={[code`@${pydanticModule["."].computed_field}`]}
 * >
 *   return self.width ** 2
 * </py.PropertyDeclaration>
 * ```
 * Generates:
 * ```python
 * @computed_field
 * @property
 * def area(self) -> float:
 *     return self.width ** 2
 * ```
 */
export interface PropertyDeclarationProps {
  name: string;
  type?: Children;
  children?: Children;
  refkey?: Refkey;
  abstract?: boolean;
  doc?: Children;
  /**
   * Decorators rendered above the intrinsic `@property` line, in source order
   * (`decorators[0]` is topmost / applied last). Use for decorators that wrap
   * the resulting property, e.g. Pydantic's `@computed_field`.
   */
  decorators?: Children[];
}

export function PropertyDeclaration(props: PropertyDeclarationProps) {
  const nonEmptyOrNotImplemented = (
    children: Children | undefined,
  ): Children => {
    if (children && childrenArray(() => children).length > 0) {
      return children;
    } else {
      return [code`raise NotImplementedError`];
    }
  };

  const children = childrenArray(() => props.children);
  const setterComponent =
    findKeyedChild(children, PropertyDeclaration.Setter.tag) ?? undefined;
  const deleterComponent =
    findKeyedChild(children, PropertyDeclaration.Deleter.tag) ?? undefined;

  const setterChildren = nonEmptyOrNotImplemented(
    setterComponent?.props?.children,
  );
  const deleterChildren = nonEmptyOrNotImplemented(
    deleterComponent?.props?.children,
  );
  const unkeyedChildren = nonEmptyOrNotImplemented(
    findUnkeyedChildren(children),
  );

  const sym: PythonOutputSymbol = createMethodSymbol(props.name, {
    refkeys: props.refkey,
  });
  return (
    <>
      <DeclarationContext.Provider value={sym}>
        <PropertyContext.Provider value={props.type}>
          <List hardline enderPunctuation>
            <PropertyMethodDeclaration
              abstract={props.abstract}
              doc={props.doc}
              decorators={props.decorators}
            >
              {unkeyedChildren}
            </PropertyMethodDeclaration>
            <Show when={Boolean(setterComponent)}>
              <PropertyDeclaration.Setter
                {...setterComponent?.props}
                type={setterComponent?.props?.type ?? props.type}
                abstract={setterComponent?.props?.abstract ?? props.abstract}
              >
                {setterChildren}
              </PropertyDeclaration.Setter>
            </Show>
            <Show when={Boolean(deleterComponent)}>
              <PropertyDeclaration.Deleter
                {...deleterComponent?.props}
                abstract={deleterComponent?.props?.abstract ?? props.abstract}
              >
                {deleterChildren}
              </PropertyDeclaration.Deleter>
            </Show>
          </List>
        </PropertyContext.Provider>
      </DeclarationContext.Provider>
    </>
  );
}

export interface PropertyMethodDeclarationProps extends Omit<
  CommonFunctionProps,
  "name"
> {
  abstract?: boolean;
}

function PropertyMethodDeclaration(props: PropertyMethodDeclarationProps) {
  const propertySymbol = useContext(DeclarationContext) as PythonOutputSymbol;
  const propertyType = useContext(PropertyContext);
  const { decorators, ...rest } = props;

  return (
    <>
      <DecoratorList decorators={decorators} />
      {code`@property`}
      <hbr />
      <MethodDeclarationBase
        {...rest}
        name={propertySymbol.name}
        functionType="instance"
        returnType={propertyType}
        sym={propertySymbol}
      >
        {props.children}
      </MethodDeclarationBase>
    </>
  );
}

interface PropertyMethodBaseProps extends Omit<
  PropertyMethodDeclarationProps,
  "name"
> {
  decoratorType: "setter" | "deleter";
  parameters?: (ParameterDescriptor | string)[];
}

function PropertyMethodBase(props: PropertyMethodBaseProps) {
  const propertySymbol = useContext(DeclarationContext) as PythonOutputSymbol;
  const { decoratorType, parameters, children, ...restProps } = props;

  return (
    <>
      {code`@${propertySymbol.name}.${decoratorType}`}
      <hbr />
      <MethodDeclarationBase
        {...restProps}
        name={propertySymbol.name}
        functionType="instance"
        parameters={parameters}
        returnType={<Atom jsValue={null} />}
        sym={propertySymbol}
      >
        {children}
      </MethodDeclarationBase>
    </>
  );
}

/**
 * Adds a setter to a `PropertyDeclaration`.
 *
 * @example
 * ```tsx
 * <py.PropertyDeclaration name="value" type={{ children: "int" }}>
 *   return self._value
 *   <py.PropertyDeclaration.Setter type={{ children: "int" }}>
 *     self._value = value
 *   </py.PropertyDeclaration.Setter>
 * </py.PropertyDeclaration>
 * ```
 * Generates:
 * ```python
 * @value.setter
 * def value(self, value: int) -> None:
 *     self._value = value
 * ```
 *
 * @remarks
 * The intrinsic `@<name>.setter` decorator is always rendered topmost (it must
 * remain the outermost decorator). Any `decorators` passed to this component
 * are rendered **between** `@<name>.setter` and `def`, which is the correct
 * position for wrappers that should decorate the underlying function before
 * `setter` re-binds it to the property (e.g. `@deprecated`, `@abstractmethod`).
 */
PropertyDeclaration.Setter = taggedComponent(
  setterTag,
  function PropertySetter(
    props: PropertyMethodDeclarationProps & { type?: Children },
  ) {
    return (
      <PropertyMethodBase
        decoratorType="setter"
        parameters={[{ name: "value", type: props.type }]}
        {...props}
      />
    );
  },
);

/**
 * Adds a deleter to a `PropertyDeclaration`.
 *
 * @example
 * ```tsx
 * <py.PropertyDeclaration name="value" type={{ children: "int" }}>
 *   return self._value
 *   <py.PropertyDeclaration.Deleter>
 *     del self._value
 *   </py.PropertyDeclaration.Deleter>
 * </py.PropertyDeclaration>
 * ```
 * Generates:
 * ```python
 * @value.deleter
 * def value(self) -> None:
 *     del self._value
 * ```
 *
 * @remarks
 * The intrinsic `@<name>.deleter` decorator is always rendered topmost (it
 * must remain the outermost decorator). Any `decorators` passed to this
 * component are rendered **between** `@<name>.deleter` and `def`, which is
 * the correct position for wrappers that should decorate the underlying
 * function before `deleter` re-binds it to the property.
 */
PropertyDeclaration.Deleter = taggedComponent(
  deleterTag,
  function PropertyDeleter(
    props: Omit<PropertyMethodDeclarationProps, "returnType">,
  ) {
    return <PropertyMethodBase decoratorType="deleter" {...props} />;
  },
);
