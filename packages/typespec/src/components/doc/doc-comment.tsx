import { Children, List, Show } from "@alloy-js/core";

export interface DocCommentProps {
  /** The main description text for the doc comment. */
  children: Children;
}

/**
 * A TypeSpec doc comment (`/** ... *\/`), rendered as a block comment
 * with ` * ` continuation lines.
 *
 * @example
 * ```tsx
 * <DocComment>A pet in the store</DocComment>
 * ```
 * This will produce:
 * ```typespec
 * /**
 *  * A pet in the store
 *  *\/
 * ```
 */
export function DocComment(props: DocCommentProps) {
  return (
    <>
      {"/**"}
      <hbr />
      {" * "}
      <align string=" * ">
        <List>{props.children}</List>
      </align>
      <hbr />
      {" */"}
    </>
  );
}

export interface DocParamProps {
  /** The parameter name. */
  name: string;
  /** Description of the parameter. */
  children: Children;
}

/**
 * A `@param` tag inside a TypeSpec doc comment.
 *
 * @example
 * ```tsx
 * <DocComment>
 *   Description
 *   <DocParam name="id">The unique identifier</DocParam>
 * </DocComment>
 * ```
 * This will produce:
 * ```typespec
 * /**
 *  * Description
 *  * \@param id The unique identifier
 *  *\/
 * ```
 */
export function DocParam(props: DocParamProps) {
  return (
    <>
      @param {props.name} {props.children}
    </>
  );
}

export interface DocTagProps {
  /** The content of the tag. */
  children: Children;
}

/**
 * A `@returns` tag inside a TypeSpec doc comment.
 *
 * @example
 * ```tsx
 * <DocComment>
 *   Description
 *   <DocReturns>The result</DocReturns>
 * </DocComment>
 * ```
 * This will produce:
 * ```typespec
 * /**
 *  * Description
 *  * \@returns The result
 *  *\/
 * ```
 */
export function DocReturns(props: DocTagProps) {
  return <>@returns {props.children}</>;
}

export interface DocTemplateProps {
  /** The template parameter name. */
  name: string;
  /** Description of the template parameter. */
  children: Children;
}

/**
 * A `@template` tag inside a TypeSpec doc comment.
 *
 * @example
 * ```tsx
 * <DocComment>
 *   Description
 *   <DocTemplate name="T">The element type</DocTemplate>
 * </DocComment>
 * ```
 * This will produce:
 * ```typespec
 * /**
 *  * Description
 *  * \@template T The element type
 *  *\/
 * ```
 */
export function DocTemplate(props: DocTemplateProps) {
  return (
    <>
      @template {props.name} {props.children}
    </>
  );
}

export interface DocWhenProps {
  /** The doc content to conditionally render. */
  doc: Children | undefined;
}

/**
 * Conditionally renders a {@link DocComment} followed by a line break,
 * only when `doc` is provided.
 */
export function DocWhen(props: DocWhenProps) {
  return (
    <Show when={Boolean(props.doc)}>
      <DocComment children={props.doc} />
      <hbr />
    </Show>
  );
}
