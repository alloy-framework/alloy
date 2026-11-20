import {
  resolve,
  SourceFileContext,
  unresolvedRefkey,
  useContext,
  type Refkey,
} from "@alloy-js/core";
import { dirname, relative } from "pathe";

import { useTableContext } from "../context/table.js";
import { HeadingSymbol } from "../symbols/heading-symbol.js";

export interface LinkPropsWithRefkey {
  /** Key of the target heading, which may be declared later or in another file. */
  refkey: Refkey;
  /**
   * Override the link text. Defaults to the target heading's text, which
   * requires the heading to have string children.
   */
  title?: string;
}

export interface LinkPropsWithHref {
  /** Link destination. */
  href: string;
  /** Link text. */
  title: string;
}

export type LinkProps = LinkPropsWithRefkey | LinkPropsWithHref;

export function Link(props: LinkProps) {
  if ("refkey" in props) {
    const sourceFile = useContext(SourceFileContext);
    if (!sourceFile) {
      throw new Error("Link references must be rendered inside a SourceFile.");
    }
    const target = resolve(props.refkey);
    const table = useTableContext();
    return () => {
      if (!target.value) {
        return unresolvedRefkey(props.refkey);
      }
      const symbol = target.value.symbol;
      if (!(symbol instanceof HeadingSymbol)) {
        throw new Error("Markdown Link refkey must reference a Heading.");
      }
      const path =
        sourceFile.path === symbol.path
          ? ""
          : relative(dirname(sourceFile.path), symbol.path)
              .split("/")
              .map(encodeUrlPart)
              .join("/");
      const href = `${path}#${encodeUrlPart(symbol.name)}`;
      return `[${props.title ?? defaultTitle(symbol, table)}](${href})`;
    };
  }

  return (
    <>
      [{props.title}]({props.href})
    </>
  );
}

function defaultTitle(symbol: HeadingSymbol, table: boolean): string {
  const text = symbol.text();
  if (text === undefined) {
    throw new Error(
      `Link to Markdown heading ${JSON.stringify(symbol.name)} requires a title because the heading has non-string children.`,
    );
  }
  const title = text.replace(/[\\`*_[\]<>&~]/g, "\\$&");
  return table ? title.replace(/\|/g, "\\|") : title;
}

function encodeUrlPart(value: string): string {
  return encodeURIComponent(value).replace(
    /[!'()*]/g,
    (character) => `%${character.charCodeAt(0).toString(16).toUpperCase()}`,
  );
}
