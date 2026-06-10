/**
 * This module defines a documentation model that mirrors the subset of
 * @microsoft/api-extractor-model used by the rendering components.
 * The model is populated from TypeDoc's reflection data.
 */

// Re-export enums and types that match the API Extractor interface
export enum ApiItemKind {
  Variable = "Variable",
  Function = "Function",
  Interface = "Interface",
  TypeAlias = "TypeAlias",
  Class = "Class",
  Enum = "Enum",
  PropertySignature = "PropertySignature",
  Property = "Property",
  MethodSignature = "MethodSignature",
  Method = "Method",
  CallSignature = "CallSignature",
  Constructor = "Constructor",
  IndexSignature = "IndexSignature",
}

export enum ExcerptTokenKind {
  Content = "Content",
  Reference = "Reference",
}

export interface ExcerptToken {
  kind: ExcerptTokenKind;
  text: string;
  canonicalReference?: string;
}

export interface Excerpt {
  text: string;
  spannedTokens: ExcerptToken[];
  tokens: ExcerptToken[];
}

/**
 * TSDoc-compatible comment model.
 * This matches the subset of @microsoft/tsdoc's DocNode tree used by rendering.
 */
export type DocNodeKind =
  | "Paragraph"
  | "CodeSpan"
  | "LinkTag"
  | "PlainText"
  | "Section"
  | "Block"
  | "ParamBlock"
  | "BlockTag"
  | "FencedCode"
  | "SoftBreak"
  | "EscapedText";

export interface DocNode {
  kind: DocNodeKind;
}

export interface DocPlainText extends DocNode {
  kind: "PlainText";
  text: string;
}

export interface DocCodeSpan extends DocNode {
  kind: "CodeSpan";
  code: string;
}

export interface DocFencedCode extends DocNode {
  kind: "FencedCode";
  language: string;
  code: string;
}

export interface DocSoftBreak extends DocNode {
  kind: "SoftBreak";
}

export interface DocEscapedText extends DocNode {
  kind: "EscapedText";
  encodedText: string;
}

export interface DocParagraph extends DocNode {
  kind: "Paragraph";
  nodes: DocNode[];
}

export interface DocSection extends DocNode {
  kind: "Section";
  nodes: DocNode[];
}

export interface DocBlock extends DocNode {
  kind: "Block";
  blockTag?: { tagName: string; tagNameWithUpperCase: string };
  content: DocSection;
}

export interface DocParamBlock extends DocNode {
  kind: "ParamBlock";
  parameterName: string;
  content: DocSection;
}

export interface DocLinkTag extends DocNode {
  kind: "LinkTag";
  codeDestination?: string; // Reference ID
  urlDestination?: string;
  linkText?: string;
}

export interface DocComment {
  summarySection?: DocSection;
  remarksBlock?: DocBlock;
  returnsBlock?: DocBlock;
  seeBlocks: DocBlock[];
  customBlocks: DocBlock[];
  params: Map<string, DocParamBlock>;
}

export interface Parameter {
  name: string;
  isOptional: boolean;
  parameterTypeExcerpt: Excerpt;
  tsdocParamBlock?: DocBlock;
}

export interface HeritageType {
  excerpt: Excerpt;
}

/**
 * Base interface for all API items.
 */
export interface ApiItem {
  kind: ApiItemKind;
  displayName: string;
  name: string;
  tsdocComment?: DocComment;
  fileUrlPath?: string;
  excerpt: Excerpt;
  /** Unique ID for refkey generation */
  id: number;
  getAssociatedPackage(): ApiPackage | undefined;
  getMergedSiblings(): ApiItem[];
}

export interface ApiFunction extends ApiItem {
  kind: ApiItemKind.Function;
  parameters: Parameter[];
  overloadIndex: number;
  returnTypeExcerpt: Excerpt;
}

export interface ApiVariable extends ApiItem {
  kind: ApiItemKind.Variable | ApiItemKind.Enum;
  variableTypeExcerpt: Excerpt;
}

export interface ApiInterface extends ApiItem {
  kind: ApiItemKind.Interface;
  members: ApiItem[];
  extendsTypes: HeritageType[];
}

export interface ApiTypeAlias extends ApiItem {
  kind: ApiItemKind.TypeAlias;
  typeExcerpt: Excerpt;
}

export interface ApiClass extends ApiItem {
  kind: ApiItemKind.Class;
  members: ApiItem[];
  extendsType?: HeritageType;
}

export interface ApiPropertySignature extends ApiItem {
  kind: ApiItemKind.PropertySignature;
  isOptional: boolean;
  isProtected: boolean;
  propertyTypeExcerpt: Excerpt;
}

export interface ApiProperty extends ApiItem {
  kind: ApiItemKind.Property;
  isOptional: boolean;
  isProtected: boolean;
  propertyTypeExcerpt: Excerpt;
}

export interface ApiMethod extends ApiItem {
  kind: ApiItemKind.Method | ApiItemKind.MethodSignature;
  isProtected: boolean;
  parameters: Parameter[];
  returnTypeExcerpt: Excerpt;
}

export interface ApiCallSignature extends ApiItem {
  kind: ApiItemKind.CallSignature;
  parameters: Parameter[];
  returnTypeExcerpt: Excerpt;
}

export interface ApiConstructor extends ApiItem {
  kind: ApiItemKind.Constructor;
  parameters: Parameter[];
}

export interface ApiIndexSignature extends ApiItem {
  kind: ApiItemKind.IndexSignature;
}

export interface ApiPackage {
  name: string;
  displayName: string;
  members: ApiItem[];
}

/**
 * The model holds all packages and provides resolution of references.
 */
export interface ApiModel {
  packages: Map<string, ApiPackage>;
  resolveReference(id: number | string | undefined): ApiItem | undefined;
}
