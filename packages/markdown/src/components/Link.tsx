import {
  resolve,
  onCleanup,
  SourceFileContext,
  unresolvedRefkey,
  useContext,
  type Refkey,
} from "@alloy-js/core";
import { dirname, relative } from "pathe";

import { HeadingContext } from "../context/source-file.js";
import { useTableContext } from "../context/table.js";
import { HeadingSymbol } from "../symbols/heading-symbol.js";

export interface LinkPropsWithRefkey {
  /** Key of the target heading, which may be declared later or in another file. */
  refkey: Refkey;
  /** Override the link text. Defaults to the target heading's display text. */
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
    const heading = useContext(HeadingContext);
    const table = useTableContext();
    let renderedTitle: string | undefined;
    let renderedName: string | undefined;
    if (heading) {
      const resolveTarget = () => {
        const symbol = target.value?.symbol;
        return symbol instanceof HeadingSymbol ? symbol : undefined;
      };
      const dependency = {
        resolve: resolveTarget,
        isCurrent() {
          const symbol = resolveTarget();
          return (
            !!symbol?.ready &&
            symbol.title === renderedTitle &&
            symbol.name === renderedName
          );
        },
      };
      heading.dependencies.add(dependency);
      onCleanup(() => {
        heading.dependencies.delete(dependency);
      });
    }
    return () => {
      if (!target.value) {
        return unresolvedRefkey(props.refkey);
      }
      const symbol = target.value.symbol;
      if (!(symbol instanceof HeadingSymbol)) {
        throw new Error("Markdown Link refkey must reference a Heading.");
      }
      if (!symbol.ready) return unresolvedRefkey(props.refkey);
      renderedTitle = symbol.title;
      renderedName = symbol.name;
      const path =
        sourceFile.path === symbol.path
          ? ""
          : relative(dirname(sourceFile.path), symbol.path)
              .split("/")
              .map(encodeUrlPart)
              .join("/");
      const href = `${path}#${encodeUrlPart(symbol.name)}`;
      let title = props.title ?? symbol.title.replace(/[\\`*_[\]<>&]/g, "\\$&");
      if (table && props.title === undefined) {
        title = title.replace(/\|/g, "\\|");
      }
      return `[${title}](${href})`;
    };
  }

  return (
    <>
      [{props.title}]({props.href})
    </>
  );
}

function encodeUrlPart(value: string): string {
  return encodeURIComponent(value).replace(
    /[!'()*]/g,
    (character) => `%${character.charCodeAt(0).toString(16).toUpperCase()}`,
  );
}
