import { type Children } from "@alloy-js/core";
import { SourceFile } from "@alloy-js/core/stc";
import { ApiItem } from "@microsoft/api-extractor-model";
import { Reference } from "./Reference.js";
import { DocDeclaration, Frontmatter } from "./stc/index.js";

export type DeclarationDescriptor =
  | ApiItem
  | { name: string; apiItem: ApiItem };

export interface DocSourceFileProps {
  children?: Children;
  title: string;
  declares?: DeclarationDescriptor | DeclarationDescriptor[];
}

export function DocSourceFile(props: DocSourceFileProps) {
  const descriptors =
    props.declares === undefined ? []
    : Array.isArray(props.declares) ? props.declares
    : [props.declares];

  const declarations = descriptors.map((descriptor) => {
    if (isApiItem(descriptor)) {
      return DocDeclaration({
        name: descriptor.displayName,
        apiItem: descriptor,
      });
    } else {
      return DocDeclaration({
        name: descriptor.name,
        apiItem: descriptor.apiItem,
      });
    }
  });

  return SourceFile({
    path: props.title.replaceAll(" ", "-") + ".mdx",
    reference: Reference,
    filetype: "mdx",
  }).children(
    declarations,
    Frontmatter({ title: props.title }),
    props.children,
  );
}

function isApiItem(type: unknown): type is ApiItem {
  return type instanceof ApiItem;
}
