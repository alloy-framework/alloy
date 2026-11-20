import type { Children } from "@alloy-js/core";
import {
  SourceFile as CoreSourceFile,
  List,
  Scope,
  sti,
  onCleanup,
  _observeNode,
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
  const file = createMarkdownFileContext();
  function Content() {
    const content = sti("group")({
      children: <List doubleHardline>{props.children}</List>,
    })();
    file.content = content;
    onCleanup(_observeNode(content, file.invalidate));
    file.invalidate();
    return content;
  }
  return (
    <CoreSourceFile path={props.path} filetype="md" reference={Link}>
      <Scope name={props.path}>
        <MarkdownFileContext.Provider value={file}>
          <Content />
        </MarkdownFileContext.Provider>
      </Scope>
    </CoreSourceFile>
  );
}
