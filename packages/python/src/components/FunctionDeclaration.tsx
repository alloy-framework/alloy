import {
  Children,
  childrenArray,
  code,
  createContext,
  DeclarationContext,
  findKeyedChild,
  findUnkeyedChildren,
  isNamekey,
  List,
  Name,
  Namekey,
  namekey,
  Refkey,
  Show,
  taggedComponent,
  useContext,
} from "@alloy-js/core";
import { abcModule } from "../builtins/python.js";
import { PythonOutputSymbol } from "../index.js";
import { ParameterDescriptor } from "../parameter-descriptor.js";
import { createPythonSymbol } from "../symbol-creation.js";
import { usePythonScope } from "../symbols/scopes.js";
import { getCallSignatureProps } from "../utils.js";
import { Atom } from "./Atom.jsx";
import { CallSignature, CallSignatureProps } from "./CallSignature.jsx";
import { BaseDeclarationProps, Declaration } from "./Declaration.js";
import { LexicalScope } from "./LexicalScope.jsx";
import { PythonBlock } from "./PythonBlock.jsx";

const setterTag = Symbol();
const deleterTag = Symbol();

/**
 * Context to provide property type information within a PropertyDeclaration
 */
const PropertyContext = createContext<Children | undefined>();

/**
 * Validates that the current scope is a member scope (inside a class).
 * Throws an error if not in a member scope.
 */
function validateMemberScope(name: string | Namekey, type: string = "Method") {
  const currentScope = usePythonScope();
  if (!currentScope?.isMemberScope) {
    const displayName = typeof name === "string" ? name : name.name;
    throw new Error(
      `${type} "${displayName}" must be declared inside a class (member scope)`,
    );
  }
}

/**
 * Shared base interface for common function properties.
 * Useful for creating custom function-like components.
 */
export interface CommonFunctionProps
  extends BaseDeclarationProps,
    CallSignatureProps {
  /**
   * Indicates that the function is async.
   */
  async?: boolean;
}

// Internal interface with all properties - not exported to keep implementation details private
interface BaseFunctionDeclarationProps extends CommonFunctionProps {
  /**
   * Indicates the type of function.
   */
  functionType?: "instance" | "class" | "static";
  /**
   * Optional existing symbol to use instead of creating a new one.
   */
  sym?: PythonOutputSymbol;
}

/**
 * Internal base function declaration component that handles functionType logic.
 * This component is not exported to keep implementation details private.
 */
function BaseFunctionDeclaration(props: BaseFunctionDeclarationProps) {
  const asyncKwd = props.async ? "async " : "";
  // Add self/cls parameter if instance or class function
  let parameters;
  switch (props.functionType) {
    case "instance":
      parameters = [{ name: "self" }, ...(props.parameters || [])];
      break;
    case "class":
      parameters = [{ name: "cls" }, ...(props.parameters || [])];
      break;
    default:
      parameters = props.parameters;
  }
  const currentScope = usePythonScope();
  const sym: PythonOutputSymbol =
    props.sym ??
    createPythonSymbol(
      props.name,
      {
        instance:
          props.functionType !== undefined && currentScope?.isMemberScope,
        refkeys: props.refkey,
      },
      "function",
    );

  return (
    <>
      <Declaration {...props} nameKind="function" symbol={sym}>
        {asyncKwd}def <Name />
        <LexicalScope name={sym.name}>
          <CallSignature
            {...getCallSignatureProps(props, {})}
            parameters={parameters}
          />
          <PythonBlock opener=":">
            <Show when={Boolean(props.doc)}>{props.doc}</Show>
            {props.children ?? "pass"}
          </PythonBlock>
        </LexicalScope>
      </Declaration>
    </>
  );
}

// Clean public interface extending common properties
export interface FunctionDeclarationProps extends CommonFunctionProps {}

/**
 * Base props interface for all method declarations.
 */
export interface MethodDeclarationBaseProps extends FunctionDeclarationProps {
  /**
   * Indicates that the method is abstract.
   */
  abstract?: boolean;
}

/**
 * A Python function declaration.
 *
 * @example
 * ```tsx
 * <FunctionDeclaration
 *   name="my_function"
 *   returnType="int"
 *   parameters={[{ name: "a", type: { children: "int" } }, { name: "b", type: { children: "str" } }]}
 * >
 *   return a + b
 * </FunctionDeclaration>
 * ```
 * This will generate:
 * ```python
 * def my_function(a: int, b: str) -> int:
 *     return a + b
 * ```
 *
 * @remarks
 * This component creates a Python function declaration with optional type annotations,
 * parameters, and return types. It supports async functions and automatically
 * handles symbol creation and emission.
 */
export function FunctionDeclaration(props: FunctionDeclarationProps) {
  return <BaseFunctionDeclaration {...props} />;
}

/**
 * Internal method declaration base component that handles validation
 * and ensures the method is declared within a class (member scope).
 * This component is not exported to keep implementation details private.
 */
function MethodDeclarationBase(
  props: MethodDeclarationBaseProps & {
    functionType?: "instance" | "class" | "static";
    sym?: PythonOutputSymbol;
  },
) {
  // Only validate if we don't have an existing symbol (which implies validation already happened)
  if (!props.sym) {
    validateMemberScope(props.name);
  }

  const abstractMethod =
    props.abstract ?
      <>
        {code`@${abcModule["."].abstractmethod}`}
        <hbr />
      </>
    : undefined;

  return (
    <>
      {abstractMethod}
      <BaseFunctionDeclaration {...props} />
    </>
  );
}

/**
 * A Python method declaration component.
 *
 * @example
 * ```tsx
 * <MethodDeclaration
 *   name="my_method"
 *   returnType="int"
 *   parameters={[{ name: "value", type: { children: "str" } }]}
 * >
 *   return len(value)
 * </MethodDeclaration>
 * ```
 * This will generate:
 * ```python
 * def my_method(self, value: str) -> int:
 *   return len(value)
 * ```
 *
 * @example Abstract method:
 * ```tsx
 * <MethodDeclaration
 *   name="abstract_method"
 *   abstract={true}
 *   returnType="str"
 * />
 * ```
 * This will generate:
 * ```python
 * @abstractmethod
 * def abstract_method(self) -> str:
 *   pass
 * ```
 *
 * @remarks
 * This component automatically adds the `self` parameter as the first parameter
 * for instance methods. Set `abstract={true}` to generate an abstract method
 * with the `@abstractmethod` decorator. The method must be declared within a class.
 */

export function MethodDeclaration(props: MethodDeclarationBaseProps) {
  return (
    <>
      <MethodDeclarationBase functionType="instance" {...props} />
    </>
  );
}

export interface PropertyDeclarationProps {
  /**
   * The name of the property.
   */
  name: string;

  /**
   * The type of the property.
   */
  type?: Children;

  /**
   * The children of the property.
   */
  children?: Children;

  /**
   * The refkey of the property.
   */
  refkey?: Refkey;

  /**
   * Indicates that the property is abstract.
   */
  abstract?: boolean;

  /**
   * Documentation for this declaration
   */
  doc?: Children;
}

/**
 * Declares a Python property with optional getter, setter, and deleter methods.
 *
 * @example
 * ```tsx
 * <PropertyDeclaration name="name" type={{ children: "str" }}>
 *   return self._name
 * </PropertyDeclaration>
 * ```
 * This will generate:
 * ```python
 * @property
 * def name(self) -> str:
 *   return self._name
 * ```
 *
 * @example
 * With setter and deleter:
 * ```tsx
 * <PropertyDeclaration name="value" type={{ children: "int" }}>
 *   return self._value
 *   <PropertyDeclaration.Setter type={{ children: [{ children: "int" }, { children: "float" }, { children: "str" }] }}>
 *     self._value = int(value)
 *   </PropertyDeclaration.Setter>
 *   <PropertyDeclaration.Deleter>
 *     del self._value
 *   </PropertyDeclaration.Deleter>
 * </PropertyDeclaration>
 * ```
 * This will generate:
 * ```python
 * @property
 * def value(self) -> int:
 *   return self._value
 *
 * @value.setter
 * def value(self, value: int | float | str) -> None:
 *   self._value = int(value)
 *
 * @value.deleter
 * def value(self) -> None:
 *   del self._value
 * ```
 *
 * @remarks
 * The property must be declared within a class. The getter method is automatically
 * generated with the `@property` decorator. Optional setter and deleter methods
 * can be added using the `PropertyDeclaration.Setter` and `PropertyDeclaration.Deleter`
 * child components.
 */
export function PropertyDeclaration(props: PropertyDeclarationProps) {
  // Utility function to format the children output
  // If we pass an empty array to a component, it will treat as if valid children
  // were passed, and thus "pass" will not be rendered.
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

/**
 * Props for property method declarations (getter, setter, deleter).
 * Excludes 'name' since property methods derive their name from the PropertyDeclaration context.
 */
export interface PropertyMethodDeclarationProps
  extends Omit<MethodDeclarationBaseProps, "name"> {}

/**
 * A Python property method declaration component.
 *
 * @remarks
 * This component is used only within a PropertyDeclaration to define the getter method.
 * The property name and return type are automatically obtained from the parent PropertyDeclaration context.
 * It automatically generates the `@property` decorator.
 *
 * @example
 * ```tsx
 * <PropertyMethodDeclaration>
 *   return self._my_property
 * </PropertyMethodDeclaration>
 * ```
 */
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

/**
 * Props for the PropertyMethodBase component.
 */
interface PropertyMethodBaseProps
  extends Omit<PropertyMethodDeclarationProps, "name"> {
  decoratorType: "setter" | "deleter";
  parameters?: ParameterDescriptor[];
}

/**
 * Shared base component for property setter and deleter methods.
 */
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

PropertyDeclaration.Deleter = taggedComponent(
  deleterTag,
  function PropertyDeleter(
    props: Omit<PropertyMethodDeclarationProps, "returnType">,
  ) {
    return <PropertyMethodBase decoratorType="deleter" {...props} />;
  },
);

/**
 * A Python class method declaration component.
 *
 * @example
 * ```tsx
 * <ClassMethodDeclaration
 *   name="create_instance"
 *   returnType={"MyClass"}
 *   parameters={[{ name: "value", type: { children: "str" } }]}
 * >
 *   return cls(value)
 * </ClassMethodDeclaration>
 * ```
 * This will generate:
 * ```python
 * @classmethod
 * def create_instance(cls, value: str) -> MyClass:
 *   return cls(value)
 * ```
 *
 * @remarks
 * This component automatically adds the `@classmethod` decorator and the `cls`
 * parameter as the first parameter. The method must be declared within a class.
 */
export function ClassMethodDeclaration(props: MethodDeclarationBaseProps) {
  return (
    <>
      {"@classmethod"}
      <hbr />
      <MethodDeclarationBase functionType="class" {...props} />
    </>
  );
}

/**
 * A Python static method declaration component.
 *
 * @example
 * ```tsx
 * <StaticMethodDeclaration
 *   name="create_instance"
 *   returnType="str"
 *   parameters={[{ name: "value", type: { children: "str" } }]}
 * >
 *   return value
 * </StaticMethodDeclaration>
 * ```
 * This will generate:
 * ```python
 * @staticmethod
 * def create_instance(value: str) -> str:
 *   return value
 * ```
 *
 * @remarks
 * This component automatically adds the `@staticmethod` decorator. The method must be
 * declared within a class.
 */
export function StaticMethodDeclaration(props: MethodDeclarationBaseProps) {
  return (
    <>
      {"@staticmethod"}
      <hbr />
      <MethodDeclarationBase functionType="static" {...props} />
    </>
  );
}

export interface DunderMethodDeclarationProps
  extends MethodDeclarationBaseProps {}

/**
 * A Python dunder method declaration.
 *
 * @example
 * ```tsx
 * <DunderMethodDeclaration name="__init__">
 *   self.attribute = "value"
 * </DunderMethodDeclaration>
 * ```
 * This will generate:
 * ```python
 * def __init__(self) -> None:
 *     self.attribute = "value"
 * ```
 *
 * @remarks
 * This is a convenience component for dunder methods. The method must be declared
 * within a class.
 */
export function DunderMethodDeclaration(props: DunderMethodDeclarationProps) {
  const finalName =
    isNamekey(props.name) ?
      props.name
    : namekey(props.name as string, { ignoreNamePolicy: true });
  return <MethodDeclaration {...props} name={finalName} />;
}

export interface ConstructorDeclarationProps
  extends Omit<DunderMethodDeclarationProps, "name"> {}

/**
 * A Python constructor declaration (__new__).
 *
 * @example
 * ```tsx
 * <ConstructorDeclaration
 *   parameters={[
 *     { name: "args", spread: "args" },
 *     { name: "kwargs", spread: "kwargs" }
 *   ]}
 * >
 *   pass
 * </ConstructorDeclaration>
 * ```
 * This will generate:
 * ```python
 * def __new__(cls, *args, **kwargs):
 *   pass
 * ```
 *
 * @remarks
 * The `__new__` method is a special method that acts as a constructor. It automatically
 * receives `cls` as the first parameter but is not decorated with `@classmethod`.
 * The method must be declared within a class.
 */
export function ConstructorDeclaration(props: ConstructorDeclarationProps) {
  // __new__ is a special method, as, despite having cls as the first parameter,
  // it isn't decorated with @classmethod.
  return (
    <MethodDeclarationBase
      {...props}
      name={namekey("__new__", { ignoreNamePolicy: true })}
      functionType="class"
    />
  );
}
