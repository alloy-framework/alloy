import type { Children } from "@alloy-js/core";
import {
  BasicScope,
  SourceFile as CoreSourceFile,
  createScope,
  List,
  Scope,
  useScope,
} from "@alloy-js/core";

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
  const scope = createScope(BasicScope, props.path, useScope());
  const file = createMarkdownFileContext();
  return (
    <CoreSourceFile path={props.path} filetype="md" reference={Link}>
      <Scope value={scope}>
        <MarkdownFileContext.Provider value={file}>
          <List doubleHardline>{props.children}</List>
        </MarkdownFileContext.Provider>
      </Scope>
    </CoreSourceFile>
  );
}
