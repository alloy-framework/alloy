import {
  SourceFile as CoreSourceFile,
  Scope,
  Show,
  SourceDirectoryContext,
  useContext,
  type Children,
} from "@alloy-js/core";
import { join } from "pathe";
import { usePackage } from "../scopes/package.js";
import { GoSourceFileScope } from "../scopes/source-file.js";
import { ImportStatements } from "./ImportStatement.js";
import { Reference } from "./Reference.js";
import { LineComment } from "./doc/comment.js";

export interface SourceFileProps {
  path: string;
  package?: string;
  children?: Children;
  header?: Children;
  headerComment?: string;
  export?: boolean | string;
}

export function SourceFile(props: SourceFileProps) {
  const pkg = usePackage();
  const directoryContext = useContext(SourceDirectoryContext)!;
  const currentDir = directoryContext.path;
  const path: string = join(currentDir, props.path);
  const scope = new GoSourceFileScope(path, pkg);

  const header = (
    <SourceFileHeader
      package={pkg?.ownerSymbol.name ?? "main"}
      header={props.header}
      headerComment={props.headerComment}
    />
  );

  return (
    <CoreSourceFile
      path={props.path}
      filetype="go"
      reference={Reference}
      header={header}
    >
      <Show when={scope.imports.size > 0}>
        <ImportStatements records={scope.imports} />
        <hbr />
        <hbr />
      </Show>
      <Scope value={scope}>{props.children}</Scope>
    </CoreSourceFile>
  );
}

export interface SourceFileHeaderProps {
  package: string;
  header?: Children;
  headerComment?: string;
}

function SourceFileHeader(props: SourceFileHeaderProps) {
  return (
    <>
      <Show when={props.headerComment !== undefined}>
        <LineComment>{props.headerComment}</LineComment>
      </Show>
      <Show when={props.header !== undefined}>{props.header}</Show>
      package {props.package}
      <hbr />
    </>
  );
}
