import type { Children } from "@alloy-js/core";
import { SourceFile as CoreSourceFile, List, Scope } from "@alloy-js/core";
import GithubSlugger from "github-slugger";

import { MarkdownFileContext } from "../context/source-file.js";
import { Link } from "./Link.jsx";

export interface SourceFileProps {
  path: string;
  children: Children;
}
export function SourceFile(props: SourceFileProps) {
  return (
    <CoreSourceFile path={props.path} filetype="md" reference={Link}>
      <Scope name={props.path}>
        <MarkdownFileContext.Provider
          value={{ slugger: new GithubSlugger(), ids: new Set() }}
        >
          <List doubleHardline>{props.children}</List>
        </MarkdownFileContext.Provider>
      </Scope>
    </CoreSourceFile>
  );
}
