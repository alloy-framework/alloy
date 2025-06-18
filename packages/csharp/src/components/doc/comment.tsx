import { Children, code, For, Indent, List, Prose, Show } from "@alloy-js/core";

export interface DocCommentProps {
  children: Children;
}

export function DocComment(props: DocCommentProps) {
  return (
    <>
      {"/// "}
      <align string="/// ">
        <List>{props.children}</List>
      </align>
    </>
  );
}

export interface DocWhenProps {
  doc: Children | undefined;
}

/** Conditionally render the given doc in a <DocComment /> component and tail with a line */
export function DocWhen(props: DocWhenProps) {
  return (
    <Show when={Boolean(props.doc)}>
      <DocComment children={props.doc} />
      <hbr />
    </Show>
  );
}

export interface DocCommentTagProps {
  children: Children;
}

export function makeDocCommentTag(name: string) {
  return function DocCommentTag(props: DocCommentProps) {
    return (
      <Prose>
        {code`
        <${name}>
        ${props.children}
        </${name}>`}
      </Prose>
    );
  };
}
export function makeInlineDocCommentTag(name: string) {
  return function DocCommentTag(props: DocCommentProps) {
    return `<${name}>${props.children}</${name}>`;
  };
}

export const DocSummary = makeDocCommentTag("summary");
export const DocCode = makeDocCommentTag("code");
export const DocC = makeInlineDocCommentTag("c");
export const DocExample = makeDocCommentTag("example");
export const DocException = makeDocCommentTag("exception");

export interface DocIncludeProps {
  /**  is the file name of an external XML file. The file name is interpreted relative to the file that contains the include tag. */
  file: string;
  /** is an XPath expression that selects some of the XML in the external XML file. */
  path?: string;
}
export const DocInclude = (props: DocIncludeProps) => {
  return `<include file="${props.file}" path="${props.path}" />`;
};

export interface DocParamProps {
  name: string;
  children: Children;
}
export const DocParam = (props: DocParamProps) =>
  code`<param name="${props.name}">${props.children}</param>`;

export interface DocTypeParamProps {
  name: string;
  children: Children;
}
export const DocTypeParam = (props: DocTypeParamProps) =>
  code`<typeparam name="${props.name}">${props.children}</typeparam>`;

export const DocReturns = makeDocCommentTag("returns");
export const DocRemarks = makeDocCommentTag("remarks");
export const DocValue = makeDocCommentTag("value");
export const DocPermission = makeDocCommentTag("permission");
export const DocDescription = makeDocCommentTag("description");
export const DocPara = makeDocCommentTag("para");

export interface DocSeeProps {
  cref?: string;
  href?: string;
  langword?: string;
  children?: Children;
}
export const DocSee = (props: DocSeeProps) => {
  const attributes = [
    props.cref ? `cref="${props.cref}"` : undefined,
    props.href ? `href="${props.href}"` : undefined,
    props.langword ? `langword="${props.langword}"` : undefined,
  ]
    .filter(Boolean)
    .join(" ");
  return code`<see ${attributes}${props.children ? code`>${props.children}</see>` : " />"}`;
};

export interface DocSeeAlsoProps {
  cref?: string;
  href?: string;
  children?: Children;
}
export const DocSeeAlso = (props: DocSeeAlsoProps) => {
  const attributes = [
    props.cref ? `cref="${props.cref}"` : undefined,
    props.href ? `href="${props.href}"` : undefined,
  ]
    .filter(Boolean)
    .join(" ");
  return code`<seealso ${attributes}${props.children ? code`>${props.children}</seealso>` : " />"}`;
};

export interface DocParamRefProps {
  name: string;
}
export const DocParamRef = (props: DocParamRefProps) =>
  `<paramref name="${props.name}" />`;

export interface DocTypeParamRefProps {
  name: string;
}
export const DocTypeParamRef = (props: DocTypeParamRefProps) =>
  `<typeparamref name="${props.name}" />`;

export interface DocListProps {
  type?: "bullet" | "number";
  items: Children[];
}
export function DocList(props: DocListProps) {
  return (
    <Prose>
      {`<list type="${props.type ?? "bullet"}">`}
      <Indent>
        <For each={props.items}>
          {(item) => code`<item><description>${item}</description></item>`}
        </For>
      </Indent>
      <hbr />
      {`</list>`}
    </Prose>
  );
}
