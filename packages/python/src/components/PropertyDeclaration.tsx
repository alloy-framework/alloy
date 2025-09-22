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
import { createPythonSymbol } from "../symbol-creation.js";
import { Atom } from "./Atom.jsx";
import { CommonFunctionProps } from "./FunctionBase.js";
import { MethodDeclarationBase, validateMemberScope } from "./MethodBase.js";

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
 */
export interface PropertyDeclarationProps {
  name: string;
  type?: Children;
  children?: Children;
  refkey?: Refkey;
  abstract?: boolean;
  doc?: Children;
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

  validateMemberScope(props.name, "PropertyDeclaration");

  const sym: PythonOutputSymbol = createPythonSymbol(
    props.name,
    {
      instance: true,
      refkeys: props.refkey,
    },
    "function",
  );
  return (
    <>
      <DeclarationContext.Provider value={sym}>
        <PropertyContext.Provider value={props.type}>
          <List hardline enderPunctuation>
            <PropertyMethodDeclaration
              abstract={props.abstract}
              doc={props.doc}
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

export interface PropertyMethodDeclarationProps
  extends Omit<CommonFunctionProps, "name"> {
  abstract?: boolean;
}

function PropertyMethodDeclaration(props: PropertyMethodDeclarationProps) {
  const declarationContext = useContext(
    DeclarationContext,
  ) as PythonOutputSymbol;
  const propertyType = useContext(PropertyContext);

  return (
    <>
      {code`@property`}
      <hbr />
      <MethodDeclarationBase
        {...props}
        name={declarationContext.name}
        functionType="instance"
        returnType={propertyType}
        sym={declarationContext}
      >
        {props.children}
      </MethodDeclarationBase>
    </>
  );
}

interface PropertyMethodBaseProps
  extends Omit<PropertyMethodDeclarationProps, "name"> {
  decoratorType: "setter" | "deleter";
  parameters?: ParameterDescriptor[];
}

function PropertyMethodBase(props: PropertyMethodBaseProps) {
  const declarationContext = useContext(
    DeclarationContext,
  ) as PythonOutputSymbol;
  const { decoratorType, parameters, children, ...restProps } = props;

  return (
    <>
      {code`@${declarationContext.name}.${decoratorType}`}
      <hbr />
      <MethodDeclarationBase
        {...restProps}
        name={declarationContext.name}
        functionType="instance"
        parameters={parameters}
        returnType={<Atom jsValue={null} />}
        sym={declarationContext}
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
 */
PropertyDeclaration.Deleter = taggedComponent(
  deleterTag,
  function PropertyDeleter(
    props: Omit<PropertyMethodDeclarationProps, "returnType">,
  ) {
    return <PropertyMethodBase decoratorType="deleter" {...props} />;
  },
);
