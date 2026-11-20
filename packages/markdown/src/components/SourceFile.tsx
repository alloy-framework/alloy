import type { Children } from "@alloy-js/core";
import { SourceFile as CoreSourceFile, List, Scope } from "@alloy-js/core";

import {
  createMarkdownFileContext,
  MarkdownFileContext,
} from "../context/source-file.js";
import { Link } from "./Link.jsx";

export interface SourceFileProps {
  path: string;
  children: Children;
}
export function SourceFile(props: SourceFileProps) {
  const file = createMarkdownFileContext();
  return (
    <CoreSourceFile path={props.path} filetype="md" reference={Link}>
      <Scope name={props.path}>
        <MarkdownFileContext.Provider value={file}>
          <List doubleHardline>{props.children}</List>
        </MarkdownFileContext.Provider>
      </Scope>
    </CoreSourceFile>
  );
}
