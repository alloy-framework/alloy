/**
 * Adapter that converts TypeDoc JSON reflection data into our documentation model types.
 */
import { readFileSync } from "node:fs";
import type {
  ApiCallSignature,
  ApiClass,
  ApiConstructor,
  ApiFunction,
  ApiIndexSignature,
  ApiInterface,
  ApiItem,
  ApiMethod,
  ApiModel,
  ApiPackage,
  ApiPropertySignature,
  ApiTypeAlias,
  ApiVariable,
  DocBlock,
  DocCodeSpan,
  DocComment,
  DocFencedCode,
  DocLinkTag,
  DocNode,
  DocParagraph,
  DocPlainText,
  DocSection,
  Excerpt,
  ExcerptToken,
  Parameter,
} from "./types.js";
import { ExcerptTokenKind, ApiItemKind as Kind } from "./types.js";

// TypeDoc JSON types (subset we use)
interface TDReflection {
  id: number;
  name: string;
  variant?: string;
  kind: number;
  flags: Record<string, boolean>;
  children?: TDReflection[];
  groups?: { title: string; children: number[] }[];
  sources?: { fileName: string; line: number; url?: string }[];
  signatures?: TDSignature[];
  type?: TDType;
  comment?: TDComment;
  extendedTypes?: TDType[];
  typeParameters?: TDTypeParam[];
  defaultValue?: string;
}

interface TDSignature {
  id: number;
  name: string;
  variant?: string;
  kind: number;
  flags: Record<string, boolean>;
  comment?: TDComment;
  sources?: { fileName: string; line: number; url?: string }[];
  parameters?: TDParameter[];
  typeParameters?: TDTypeParam[];
  type?: TDType;
}

interface TDParameter {
  id: number;
  name: string;
  variant?: string;
  kind: number;
  flags: Record<string, boolean>;
  type?: TDType;
  comment?: TDComment;
  defaultValue?: string;
}

interface TDTypeParam {
  id: number;
  name: string;
  variant?: string;
  kind: number;
  flags: Record<string, boolean>;
  type?: TDType;
  default?: TDType;
}

interface TDType {
  type: string;
  name?: string;
  value?: string | number | boolean | null;
  target?: number | { sourceFileName?: string; qualifiedName?: string };
  typeArguments?: TDType[];
  types?: TDType[];
  elementType?: TDType;
  declaration?: TDReflection;
  operator?: string;
  objectType?: TDType;
  indexType?: TDType;
  checkType?: TDType;
  extendsType?: TDType;
  trueType?: TDType;
  falseType?: TDType;
  package?: string;
  refersToTypeParameter?: boolean;
  asserts?: boolean;
  targetType?: TDType;
  queryType?: TDType;
  constraint?: TDType;
  head?: string;
  tail?: [TDType, string][];
}

interface TDComment {
  summary?: TDCommentPart[];
  blockTags?: { tag: string; content: TDCommentPart[] }[];
}

interface TDCommentPart {
  kind: string;
  text?: string;
  tag?: string;
  target?: number | { sourceFileName?: string; qualifiedName?: string };
  tsLinkText?: string;
}

// TypeDoc ReflectionKind values
const TDKind = {
  Project: 1,
  Module: 2,
  Namespace: 4,
  Enum: 8,
  EnumMember: 16,
  Variable: 32,
  Function: 64,
  Class: 128,
  Interface: 256,
  Constructor: 512,
  Property: 1024,
  Method: 2048,
  CallSignature: 4096,
  IndexSignature: 8192,
  ConstructorSignature: 16384,
  Parameter: 32768,
  TypeLiteral: 65536,
  TypeParameter: 131072,
  Accessor: 262144,
  GetSignature: 524288,
  SetSignature: 1048576,
  TypeAlias: 2097152,
  Reference: 4194304,
} as const;

/**
 * Load a TypeDoc JSON file and create our ApiModel.
 */
export function loadTypedocJson(jsonPath: string): ApiModel {
  const data = JSON.parse(readFileSync(jsonPath, "utf-8")) as TDReflection;
  return createModel(data);
}

function createModel(project: TDReflection): ApiModel {
  // Build a global ID → reflection map for reference resolution
  const idMap = new Map<number, TDReflection>();
  const itemMap = new Map<number, ApiItem>();
  buildIdMap(project, idMap);

  const packages = new Map<string, ApiPackage>();

  // Each child of the project is a package (in packages mode)
  for (const pkgReflection of project.children ?? []) {
    if (pkgReflection.kind !== TDKind.Module) continue;
    const pkg = createPackage(pkgReflection, idMap, itemMap);
    // Strip @alloy-js/ prefix for the key
    const shortName = pkgReflection.name.replace(/^@alloy-js\//, "");
    packages.set(shortName, pkg);
  }

  const model: ApiModel = {
    packages,
    resolveReference(id: number | undefined): ApiItem | undefined {
      if (id === undefined) return undefined;
      return itemMap.get(id);
    },
  };

  return model;
}

function buildIdMap(reflection: TDReflection, map: Map<number, TDReflection>) {
  map.set(reflection.id, reflection);
  for (const child of reflection.children ?? []) {
    buildIdMap(child, map);
  }
  for (const sig of reflection.signatures ?? []) {
    map.set(sig.id, sig as unknown as TDReflection);
    for (const param of sig.parameters ?? []) {
      map.set(param.id, param as unknown as TDReflection);
    }
  }
}

function createPackage(
  pkgReflection: TDReflection,
  idMap: Map<number, TDReflection>,
  itemMap: Map<number, ApiItem>,
): ApiPackage {
  const pkg: ApiPackage = {
    name: pkgReflection.name,
    displayName: pkgReflection.name,
    members: [],
  };

  // A package in TypeDoc's packages mode has module children
  // The main module is the one with empty name or same name
  for (const mod of pkgReflection.children ?? []) {
    if (mod.kind === TDKind.Module || mod.kind === TDKind.Project) {
      for (const member of mod.children ?? []) {
        const item = createApiItem(member, pkg, idMap, itemMap);
        if (item) {
          pkg.members.push(item);
        }
      }
    }
  }

  return pkg;
}

function createApiItem(
  reflection: TDReflection,
  pkg: ApiPackage,
  idMap: Map<number, TDReflection>,
  itemMap: Map<number, ApiItem>,
): ApiItem | undefined {
  let item: ApiItem | undefined;

  switch (reflection.kind) {
    case TDKind.Function:
      item = createFunction(reflection, pkg, idMap, itemMap);
      break;
    case TDKind.Variable:
      item = createVariable(reflection, pkg, idMap, itemMap);
      break;
    case TDKind.Interface:
      item = createInterface(reflection, pkg, idMap, itemMap);
      break;
    case TDKind.TypeAlias:
      item = createTypeAlias(reflection, pkg, idMap, itemMap);
      break;
    case TDKind.Class:
      item = createClass(reflection, pkg, idMap, itemMap);
      break;
    case TDKind.Enum:
      item = createEnum(reflection, pkg, idMap, itemMap);
      break;
  }

  if (item) {
    itemMap.set(reflection.id, item);
  }

  return item;
}

function createFunction(
  reflection: TDReflection,
  pkg: ApiPackage,
  idMap: Map<number, TDReflection>,
  itemMap: Map<number, ApiItem>,
): ApiFunction {
  const sig = reflection.signatures?.[0];
  const comment = sig?.comment ?? reflection.comment;

  const fn: ApiFunction = {
    kind: Kind.Function,
    id: reflection.id,
    displayName: reflection.name,
    name: reflection.name,
    tsdocComment: comment ? convertComment(comment) : undefined,
    fileUrlPath: getFileUrlPath(reflection),
    excerpt: createFunctionExcerpt(reflection, idMap),
    parameters: sig?.parameters?.map((p) => createParameter(p, comment)) ?? [],
    overloadIndex: 1,
    returnTypeExcerpt:
      sig?.type ? typeToExcerpt(sig.type, idMap) : emptyExcerpt(),
    getAssociatedPackage: () => pkg,
    getMergedSiblings: () => {
      // Collect all overloads
      return (reflection.signatures ?? []).map((s, i) => {
        if (i === 0) return fn;
        return createOverloadFunction(
          reflection,
          s,
          i + 1,
          pkg,
          idMap,
          itemMap,
        );
      });
    },
  };

  return fn;
}

function createOverloadFunction(
  reflection: TDReflection,
  sig: TDSignature,
  index: number,
  pkg: ApiPackage,
  idMap: Map<number, TDReflection>,
  _itemMap: Map<number, ApiItem>,
): ApiFunction {
  const comment = sig.comment;
  const overload: ApiFunction = {
    kind: Kind.Function,
    id: sig.id,
    displayName: reflection.name,
    name: reflection.name,
    tsdocComment: comment ? convertComment(comment) : undefined,
    fileUrlPath: getFileUrlPath(reflection),
    excerpt: createSignatureExcerpt(reflection.name, sig, idMap),
    parameters: sig.parameters?.map((p) => createParameter(p, comment)) ?? [],
    overloadIndex: index,
    returnTypeExcerpt:
      sig.type ? typeToExcerpt(sig.type, idMap) : emptyExcerpt(),
    getAssociatedPackage: () => pkg,
    getMergedSiblings: () => [overload],
  };
  return overload;
}

function createVariable(
  reflection: TDReflection,
  pkg: ApiPackage,
  idMap: Map<number, TDReflection>,
  _itemMap: Map<number, ApiItem>,
): ApiVariable {
  return {
    kind: Kind.Variable,
    id: reflection.id,
    displayName: reflection.name,
    name: reflection.name,
    tsdocComment:
      reflection.comment ? convertComment(reflection.comment) : undefined,
    fileUrlPath: getFileUrlPath(reflection),
    excerpt: createVariableExcerpt(reflection, idMap),
    variableTypeExcerpt:
      reflection.type ? typeToExcerpt(reflection.type, idMap) : emptyExcerpt(),
    getAssociatedPackage: () => pkg,
    getMergedSiblings: () => [],
  } as ApiVariable;
}

function createInterface(
  reflection: TDReflection,
  pkg: ApiPackage,
  idMap: Map<number, TDReflection>,
  itemMap: Map<number, ApiItem>,
): ApiInterface {
  const iface: ApiInterface = {
    kind: Kind.Interface,
    id: reflection.id,
    displayName: reflection.name,
    name: reflection.name,
    tsdocComment:
      reflection.comment ? convertComment(reflection.comment) : undefined,
    fileUrlPath: getFileUrlPath(reflection),
    excerpt: emptyExcerpt(),
    members: [],
    extendsTypes: (reflection.extendedTypes ?? []).map((t) => ({
      excerpt: typeToExcerpt(t, idMap),
    })),
    getAssociatedPackage: () => pkg,
    getMergedSiblings: () => [iface],
  };

  itemMap.set(reflection.id, iface);

  // Create members
  for (const child of reflection.children ?? []) {
    const member = createMember(child, pkg, idMap, itemMap);
    if (member) {
      iface.members.push(member);
    }
  }

  return iface;
}

function createTypeAlias(
  reflection: TDReflection,
  pkg: ApiPackage,
  idMap: Map<number, TDReflection>,
  _itemMap: Map<number, ApiItem>,
): ApiTypeAlias {
  return {
    kind: Kind.TypeAlias,
    id: reflection.id,
    displayName: reflection.name,
    name: reflection.name,
    tsdocComment:
      reflection.comment ? convertComment(reflection.comment) : undefined,
    fileUrlPath: getFileUrlPath(reflection),
    excerpt: createTypeAliasExcerpt(reflection, idMap),
    typeExcerpt:
      reflection.type ? typeToExcerpt(reflection.type, idMap) : emptyExcerpt(),
    getAssociatedPackage: () => pkg,
    getMergedSiblings: () => [],
  } as ApiTypeAlias;
}

function createClass(
  reflection: TDReflection,
  pkg: ApiPackage,
  idMap: Map<number, TDReflection>,
  itemMap: Map<number, ApiItem>,
): ApiClass {
  const cls: ApiClass = {
    kind: Kind.Class,
    id: reflection.id,
    displayName: reflection.name,
    name: reflection.name,
    tsdocComment:
      reflection.comment ? convertComment(reflection.comment) : undefined,
    fileUrlPath: getFileUrlPath(reflection),
    excerpt: emptyExcerpt(),
    members: [],
    extendsType:
      reflection.extendedTypes?.[0] ?
        { excerpt: typeToExcerpt(reflection.extendedTypes[0], idMap) }
      : undefined,
    getAssociatedPackage: () => pkg,
    getMergedSiblings: () => [cls],
  };

  itemMap.set(reflection.id, cls);

  for (const child of reflection.children ?? []) {
    const member = createMember(child, pkg, idMap, itemMap);
    if (member) {
      cls.members.push(member);
    }
  }

  return cls;
}

function createEnum(
  reflection: TDReflection,
  pkg: ApiPackage,
  _idMap: Map<number, TDReflection>,
  _itemMap: Map<number, ApiItem>,
): ApiVariable {
  // Treat enums as variables for rendering purposes
  return {
    kind: Kind.Variable,
    id: reflection.id,
    displayName: reflection.name,
    name: reflection.name,
    tsdocComment:
      reflection.comment ? convertComment(reflection.comment) : undefined,
    fileUrlPath: getFileUrlPath(reflection),
    excerpt: emptyExcerpt(),
    variableTypeExcerpt: emptyExcerpt(),
    getAssociatedPackage: () => pkg,
    getMergedSiblings: () => [],
  };
}

function createMember(
  reflection: TDReflection,
  pkg: ApiPackage,
  idMap: Map<number, TDReflection>,
  itemMap: Map<number, ApiItem>,
): ApiItem | undefined {
  switch (reflection.kind) {
    case TDKind.Property: {
      const item = createPropertyMember(reflection, pkg, idMap);
      if (item) itemMap.set(reflection.id, item);
      return item;
    }
    case TDKind.Method: {
      const item = createMethodMember(reflection, pkg, idMap);
      if (item) itemMap.set(reflection.id, item);
      return item;
    }
    case TDKind.Constructor: {
      const item = createConstructorMember(reflection, pkg, idMap);
      if (item) itemMap.set(reflection.id, item);
      return item;
    }
    case TDKind.Accessor: {
      // Treat accessors as properties
      const item = createAccessorMember(reflection, pkg, idMap);
      if (item) itemMap.set(reflection.id, item);
      return item;
    }
    case TDKind.IndexSignature:
    case 8192: {
      // Index signature at member level
      const item = createIndexSignatureMember(reflection, pkg, idMap);
      if (item) itemMap.set(reflection.id, item);
      return item;
    }
    case TDKind.CallSignature:
    case 4096: {
      const item = createCallSignatureMember(reflection, pkg, idMap);
      if (item) itemMap.set(reflection.id, item);
      return item;
    }
    default:
      return undefined;
  }
}

function createPropertyMember(
  reflection: TDReflection,
  pkg: ApiPackage,
  idMap: Map<number, TDReflection>,
): ApiPropertySignature {
  return {
    kind: Kind.PropertySignature,
    id: reflection.id,
    displayName: reflection.name,
    name: reflection.name,
    isOptional: !!reflection.flags.isOptional,
    isProtected: !!reflection.flags.isProtected,
    propertyTypeExcerpt:
      reflection.type ? typeToExcerpt(reflection.type, idMap) : emptyExcerpt(),
    tsdocComment:
      reflection.comment ? convertComment(reflection.comment) : undefined,
    fileUrlPath: getFileUrlPath(reflection),
    excerpt: emptyExcerpt(),
    getAssociatedPackage: () => pkg,
    getMergedSiblings: () => [],
  } as ApiPropertySignature;
}

function createMethodMember(
  reflection: TDReflection,
  pkg: ApiPackage,
  idMap: Map<number, TDReflection>,
): ApiMethod {
  const sig = reflection.signatures?.[0];
  const comment = sig?.comment ?? reflection.comment;
  return {
    kind: Kind.Method,
    id: reflection.id,
    displayName: reflection.name,
    name: reflection.name,
    isProtected: !!reflection.flags.isProtected,
    parameters: sig?.parameters?.map((p) => createParameter(p, comment)) ?? [],
    returnTypeExcerpt:
      sig?.type ? typeToExcerpt(sig.type, idMap) : emptyExcerpt(),
    tsdocComment: comment ? convertComment(comment) : undefined,
    fileUrlPath: getFileUrlPath(reflection),
    excerpt: emptyExcerpt(),
    getAssociatedPackage: () => pkg,
    getMergedSiblings: () => [],
  } as ApiMethod;
}

function createConstructorMember(
  reflection: TDReflection,
  pkg: ApiPackage,
  idMap: Map<number, TDReflection>,
): ApiConstructor {
  const sig = reflection.signatures?.[0];
  const comment = sig?.comment ?? reflection.comment;
  return {
    kind: Kind.Constructor,
    id: reflection.id,
    displayName: "constructor",
    name: "constructor",
    parameters: sig?.parameters?.map((p) => createParameter(p, comment)) ?? [],
    tsdocComment: comment ? convertComment(comment) : undefined,
    fileUrlPath: getFileUrlPath(reflection),
    excerpt: emptyExcerpt(),
    getAssociatedPackage: () => pkg,
    getMergedSiblings: () => [],
  } as ApiConstructor;
}

function createAccessorMember(
  reflection: TDReflection,
  pkg: ApiPackage,
  idMap: Map<number, TDReflection>,
): ApiPropertySignature {
  // Get the getter signature's return type
  const getSig = reflection.signatures?.find(
    (s) => s.kind === TDKind.GetSignature,
  );
  const type = getSig?.type ?? reflection.type;
  return {
    kind: Kind.PropertySignature,
    id: reflection.id,
    displayName: reflection.name,
    name: reflection.name,
    isOptional: !!reflection.flags.isOptional,
    isProtected: !!reflection.flags.isProtected,
    propertyTypeExcerpt: type ? typeToExcerpt(type, idMap) : emptyExcerpt(),
    tsdocComment:
      reflection.comment ? convertComment(reflection.comment)
      : getSig?.comment ? convertComment(getSig.comment)
      : undefined,
    fileUrlPath: getFileUrlPath(reflection),
    excerpt: emptyExcerpt(),
    getAssociatedPackage: () => pkg,
    getMergedSiblings: () => [],
  } as ApiPropertySignature;
}

function createIndexSignatureMember(
  reflection: TDReflection,
  pkg: ApiPackage,
  idMap: Map<number, TDReflection>,
): ApiIndexSignature {
  return {
    kind: Kind.IndexSignature,
    id: reflection.id,
    displayName: reflection.name,
    name: reflection.name,
    tsdocComment:
      reflection.comment ? convertComment(reflection.comment) : undefined,
    fileUrlPath: getFileUrlPath(reflection),
    excerpt: emptyExcerpt(), // TODO: render index signature excerpt
    getAssociatedPackage: () => pkg,
    getMergedSiblings: () => [],
  } as ApiIndexSignature;
}

function createCallSignatureMember(
  reflection: TDReflection,
  pkg: ApiPackage,
  idMap: Map<number, TDReflection>,
): ApiCallSignature {
  const sig =
    reflection.kind === TDKind.CallSignature ?
      (reflection as unknown as TDSignature)
    : reflection.signatures?.[0];
  return {
    kind: Kind.CallSignature,
    id: reflection.id,
    displayName: reflection.name,
    name: reflection.name,
    parameters:
      sig?.parameters?.map((p) => createParameter(p, sig.comment)) ?? [],
    returnTypeExcerpt:
      sig?.type ? typeToExcerpt(sig.type, idMap) : emptyExcerpt(),
    tsdocComment: sig?.comment ? convertComment(sig.comment) : undefined,
    fileUrlPath: getFileUrlPath(reflection),
    excerpt: emptyExcerpt(),
    getAssociatedPackage: () => pkg,
    getMergedSiblings: () => [],
  } as ApiCallSignature;
}

// --- Parameter ---

function createParameter(
  param: TDParameter,
  parentComment?: TDComment,
): Parameter {
  const paramBlock = findParamBlock(param.name, parentComment);
  return {
    name: param.name,
    isOptional: !!param.flags.isOptional || param.defaultValue !== undefined,
    parameterTypeExcerpt:
      param.type ? typeToExcerpt(param.type, new Map()) : emptyExcerpt(),
    tsdocParamBlock: paramBlock,
  };
}

function findParamBlock(
  paramName: string,
  comment?: TDComment,
): DocBlock | undefined {
  if (!comment?.blockTags) return undefined;
  const tag = comment.blockTags.find(
    (bt) => bt.tag === "@param" && bt.content?.[0]?.text?.startsWith(paramName),
  );
  if (!tag) return undefined;
  return {
    kind: "Block",
    blockTag: { tagName: "@param", tagNameWithUpperCase: "@PARAM" },
    content: { kind: "Section", nodes: convertCommentParts(tag.content) },
  };
}

// --- Excerpt / Type rendering ---

function emptyExcerpt(): Excerpt {
  return { text: "", spannedTokens: [], tokens: [] };
}

function typeToExcerpt(
  type: TDType,
  idMap: Map<number, TDReflection>,
): Excerpt {
  const tokens: ExcerptToken[] = [];
  renderType(type, tokens, idMap);
  const text = tokens.map((t) => t.text).join("");
  return { text, spannedTokens: tokens, tokens };
}

function renderType(
  type: TDType,
  tokens: ExcerptToken[],
  idMap: Map<number, TDReflection>,
): void {
  switch (type.type) {
    case "intrinsic":
    case "unknown":
      pushContent(tokens, type.name ?? "unknown");
      break;

    case "literal":
      if (type.value === null) {
        pushContent(tokens, "null");
      } else if (typeof type.value === "string") {
        pushContent(tokens, `"${type.value}"`);
      } else {
        pushContent(tokens, String(type.value));
      }
      break;

    case "reference": {
      const targetId =
        typeof type.target === "number" ? type.target : undefined;
      if (type.refersToTypeParameter) {
        pushContent(tokens, type.name ?? "unknown");
      } else if (targetId !== undefined) {
        tokens.push({
          kind: ExcerptTokenKind.Reference,
          text: type.name ?? "unknown",
          referenceId: targetId,
        });
      } else {
        pushContent(tokens, type.name ?? "unknown");
      }
      if (type.typeArguments && type.typeArguments.length > 0) {
        pushContent(tokens, "<");
        type.typeArguments.forEach((ta, i) => {
          if (i > 0) pushContent(tokens, ", ");
          renderType(ta, tokens, idMap);
        });
        pushContent(tokens, ">");
      }
      break;
    }

    case "union":
      (type.types ?? []).forEach((t, i) => {
        if (i > 0) pushContent(tokens, " | ");
        renderType(t, tokens, idMap);
      });
      break;

    case "intersection":
      (type.types ?? []).forEach((t, i) => {
        if (i > 0) pushContent(tokens, " & ");
        renderType(t, tokens, idMap);
      });
      break;

    case "array":
      if (type.elementType) {
        const needsParens =
          type.elementType.type === "union" ||
          type.elementType.type === "intersection";
        if (needsParens) pushContent(tokens, "(");
        renderType(type.elementType, tokens, idMap);
        if (needsParens) pushContent(tokens, ")");
      }
      pushContent(tokens, "[]");
      break;

    case "tuple":
      pushContent(tokens, "[");
      (type.types ?? []).forEach((t, i) => {
        if (i > 0) pushContent(tokens, ", ");
        renderType(t, tokens, idMap);
      });
      pushContent(tokens, "]");
      break;

    case "reflection": {
      // Inline type literal or function type
      const decl = type.declaration;
      if (decl?.signatures && decl.signatures.length > 0) {
        // Function type
        const sig = decl.signatures[0];
        pushContent(tokens, "(");
        (sig.parameters ?? []).forEach((p, i) => {
          if (i > 0) pushContent(tokens, ", ");
          pushContent(tokens, `${p.name}: `);
          if (p.type) renderType(p.type, tokens, idMap);
          else pushContent(tokens, "any");
        });
        pushContent(tokens, ") => ");
        if (sig.type) renderType(sig.type, tokens, idMap);
        else pushContent(tokens, "void");
      } else if (decl?.children && decl.children.length > 0) {
        // Object literal
        pushContent(tokens, "{ ");
        decl.children.forEach((child, i) => {
          if (i > 0) pushContent(tokens, "; ");
          pushContent(
            tokens,
            `${child.name}${child.flags.isOptional ? "?" : ""}: `,
          );
          if (child.type) renderType(child.type, tokens, idMap);
          else pushContent(tokens, "any");
        });
        pushContent(tokens, " }");
      } else {
        pushContent(tokens, "{}");
      }
      break;
    }

    case "indexedAccess":
      if (type.objectType) renderType(type.objectType, tokens, idMap);
      pushContent(tokens, "[");
      if (type.indexType) renderType(type.indexType, tokens, idMap);
      pushContent(tokens, "]");
      break;

    case "conditional":
      if (type.checkType) renderType(type.checkType, tokens, idMap);
      pushContent(tokens, " extends ");
      if (type.extendsType) renderType(type.extendsType, tokens, idMap);
      pushContent(tokens, " ? ");
      if (type.trueType) renderType(type.trueType, tokens, idMap);
      pushContent(tokens, " : ");
      if (type.falseType) renderType(type.falseType, tokens, idMap);
      break;

    case "mapped":
      pushContent(tokens, "{ [key: string]: ");
      if (type.types?.[0]) renderType(type.types[0], tokens, idMap);
      else pushContent(tokens, "any");
      pushContent(tokens, " }");
      break;

    case "typeOperator":
      pushContent(tokens, `${type.operator ?? "keyof"} `);
      if (type.target && typeof type.target !== "number") {
        pushContent(tokens, "unknown");
      } else if (type.targetType) {
        renderType(type.targetType, tokens, idMap);
      }
      break;

    case "query":
      pushContent(tokens, "typeof ");
      if (type.queryType) {
        renderType(type.queryType, tokens, idMap);
      }
      break;

    case "predicate":
      pushContent(tokens, `${type.name ?? "value"} is `);
      if (type.targetType) renderType(type.targetType, tokens, idMap);
      break;

    case "templateLiteral":
      pushContent(tokens, "`");
      pushContent(tokens, type.head ?? "");
      for (const [tailType, tailText] of type.tail ?? []) {
        pushContent(tokens, "${");
        renderType(tailType, tokens, idMap);
        pushContent(tokens, "}");
        pushContent(tokens, tailText);
      }
      pushContent(tokens, "`");
      break;

    case "rest":
      pushContent(tokens, "...");
      if (type.elementType) renderType(type.elementType, tokens, idMap);
      break;

    case "optional":
      if (type.elementType) renderType(type.elementType, tokens, idMap);
      pushContent(tokens, "?");
      break;

    case "namedTupleMember":
      pushContent(tokens, `${type.name}: `);
      if (type.elementType) renderType(type.elementType, tokens, idMap);
      break;

    default:
      pushContent(tokens, type.name ?? "unknown");
      break;
  }
}

function pushContent(tokens: ExcerptToken[], text: string) {
  const last = tokens[tokens.length - 1];
  if (last && last.kind === ExcerptTokenKind.Content) {
    last.text += text;
  } else {
    tokens.push({ kind: ExcerptTokenKind.Content, text });
  }
}

// --- Function excerpt (full signature text) ---

function createFunctionExcerpt(
  reflection: TDReflection,
  idMap: Map<number, TDReflection>,
): Excerpt {
  const sig = reflection.signatures?.[0];
  if (!sig) return emptyExcerpt();
  return createSignatureExcerpt(reflection.name, sig, idMap);
}

function createSignatureExcerpt(
  name: string,
  sig: TDSignature,
  idMap: Map<number, TDReflection>,
): Excerpt {
  const tokens: ExcerptToken[] = [];
  pushContent(tokens, `function ${name}`);

  // Type parameters
  if (sig.typeParameters && sig.typeParameters.length > 0) {
    pushContent(tokens, "<");
    sig.typeParameters.forEach((tp, i) => {
      if (i > 0) pushContent(tokens, ", ");
      pushContent(tokens, tp.name);
      if (tp.type) {
        pushContent(tokens, " extends ");
        renderType(tp.type, tokens, idMap);
      }
    });
    pushContent(tokens, ">");
  }

  // Parameters
  pushContent(tokens, "(");
  (sig.parameters ?? []).forEach((p, i) => {
    if (i > 0) pushContent(tokens, ", ");
    pushContent(tokens, p.name);
    if (p.flags.isOptional) pushContent(tokens, "?");
    pushContent(tokens, ": ");
    if (p.type) renderType(p.type, tokens, idMap);
    else pushContent(tokens, "any");
  });
  pushContent(tokens, ")");

  // Return type
  pushContent(tokens, ": ");
  if (sig.type) renderType(sig.type, tokens, idMap);
  else pushContent(tokens, "void");

  const text = tokens.map((t) => t.text).join("");
  return { text, spannedTokens: tokens, tokens };
}

function createVariableExcerpt(
  reflection: TDReflection,
  idMap: Map<number, TDReflection>,
): Excerpt {
  const tokens: ExcerptToken[] = [];
  pushContent(tokens, `const ${reflection.name}: `);
  if (reflection.type) renderType(reflection.type, tokens, idMap);
  else pushContent(tokens, "unknown");
  const text = tokens.map((t) => t.text).join("");
  return { text, spannedTokens: tokens, tokens };
}

function createTypeAliasExcerpt(
  reflection: TDReflection,
  idMap: Map<number, TDReflection>,
): Excerpt {
  const tokens: ExcerptToken[] = [];
  pushContent(tokens, `type ${reflection.name} = `);
  if (reflection.type) renderType(reflection.type, tokens, idMap);
  else pushContent(tokens, "unknown");
  const text = tokens.map((t) => t.text).join("");
  return { text, spannedTokens: tokens, tokens };
}

// --- Comment conversion ---

function convertComment(comment: TDComment): DocComment {
  const summarySection: DocSection | undefined =
    comment.summary ?
      { kind: "Section", nodes: convertCommentParts(comment.summary) }
    : undefined;

  let remarksBlock: DocBlock | undefined;
  let returnsBlock: DocBlock | undefined;
  const seeBlocks: DocBlock[] = [];
  const customBlocks: DocBlock[] = [];

  for (const tag of comment.blockTags ?? []) {
    const content: DocSection = {
      kind: "Section",
      nodes: convertCommentParts(tag.content),
    };
    const block: DocBlock = {
      kind: "Block",
      blockTag: {
        tagName: tag.tag,
        tagNameWithUpperCase: tag.tag.toUpperCase(),
      },
      content,
    };

    switch (tag.tag) {
      case "@remarks":
        remarksBlock = block;
        break;
      case "@returns":
        returnsBlock = block;
        break;
      case "@see":
        seeBlocks.push(block);
        break;
      case "@example":
        customBlocks.push(block);
        break;
      default:
        customBlocks.push(block);
        break;
    }
  }

  return {
    summarySection,
    remarksBlock,
    returnsBlock,
    seeBlocks,
    customBlocks,
    params: new Map(),
  };
}

function convertCommentParts(parts: TDCommentPart[]): DocNode[] {
  const nodes: DocNode[] = [];
  const paragraph: DocParagraph = { kind: "Paragraph", nodes: [] };

  for (const part of parts) {
    switch (part.kind) {
      case "text": {
        // Split on double newlines for paragraph breaks
        const text = part.text ?? "";
        const segments = text.split(/\n\n/);
        segments.forEach((seg, i) => {
          if (i > 0) {
            // Close current paragraph, start new one
            if (paragraph.nodes.length > 0) {
              nodes.push({ ...paragraph });
              paragraph.nodes = [];
            }
          }
          if (seg.includes("\n")) {
            // Handle single newlines as soft breaks
            const lines = seg.split("\n");
            lines.forEach((line, j) => {
              if (j > 0) {
                paragraph.nodes.push({ kind: "SoftBreak" } as DocNode);
              }
              if (line) {
                paragraph.nodes.push({
                  kind: "PlainText",
                  text: line,
                } as DocPlainText);
              }
            });
          } else if (seg) {
            paragraph.nodes.push({
              kind: "PlainText",
              text: seg,
            } as DocPlainText);
          }
        });
        break;
      }
      case "code": {
        const text = part.text ?? "";
        if (text.startsWith("```")) {
          // Fenced code block
          const match = text.match(/^```(\w*)\n([\s\S]*?)```$/);
          if (match) {
            // Push current paragraph first
            if (paragraph.nodes.length > 0) {
              nodes.push({ ...paragraph });
              paragraph.nodes = [];
            }
            nodes.push({
              kind: "FencedCode",
              language: match[1] || "ts",
              code: match[2],
            } as DocFencedCode);
          } else {
            paragraph.nodes.push({
              kind: "CodeSpan",
              code: text.slice(3, -3),
            } as DocCodeSpan);
          }
        } else if (text.startsWith("`") && text.endsWith("`")) {
          paragraph.nodes.push({
            kind: "CodeSpan",
            code: text.slice(1, -1),
          } as DocCodeSpan);
        } else {
          paragraph.nodes.push({
            kind: "CodeSpan",
            code: text,
          } as DocCodeSpan);
        }
        break;
      }
      case "inline-tag": {
        if (part.tag === "@link") {
          const linkTag: DocLinkTag = {
            kind: "LinkTag",
            linkText: part.tsLinkText || part.text,
          };
          if (typeof part.target === "number") {
            linkTag.referenceId = part.target;
          } else if (typeof part.target === "object" && part.target) {
            // External reference
            linkTag.urlDestination = undefined;
            linkTag.linkText = part.text;
          }
          paragraph.nodes.push(linkTag);
        }
        break;
      }
    }
  }

  // Push final paragraph
  if (paragraph.nodes.length > 0) {
    nodes.push(paragraph);
  }

  // If only one paragraph, return its nodes directly as a section with paragraphs
  return nodes.length > 0 ? nodes : [];
}

// --- Helpers ---

function getFileUrlPath(reflection: TDReflection): string | undefined {
  const source = reflection.sources?.[0];
  if (!source) return undefined;
  return source.fileName;
}
