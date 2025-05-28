import {
  ComponentContext,
  SourceFile as CoreSourceFile,
  createNamedContext,
  Scope,
  Show,
  SourceDirectoryContext,
  useContext,
  type Children,
} from "@alloy-js/core";

import { join } from "pathe";
import { getSourceDirectoryData } from "../source-directory-data.js";
import { TSModuleScope } from "../symbols/index.js";
import { ImportStatements } from "./ImportStatement.js";
import { PackageContext } from "./PackageDirectory.js";
import { Reference } from "./Reference.js";
import { SingleLineCommentBlock } from "./SingleLineCommentBlock.jsx";
export interface SourceFileContext {
  scope: TSModuleScope;
}

export const SourceFileContext: ComponentContext<SourceFileContext> =
  createNamedContext("@alloy-js/typescript SourceFile");

export function useSourceFile() {
  return useContext(SourceFileContext)!;
}
export interface SourceFileProps {
  path: string;
  children?: Children;
  header?: Children;
  headerComment?: string;
  export?: boolean | string;
}

export function SourceFile(props: SourceFileProps) {
  const directoryContext = useContext(SourceDirectoryContext)!;
  const sdData = getSourceDirectoryData(directoryContext);
  const currentDir = directoryContext.path;
  const path: string = join(currentDir, props.path);
  const scope = new TSModuleScope(path);
  sdData.modules.add(scope);
  const pkg = useContext(PackageContext);
  if (pkg) {
    pkg.scope.addModule(scope);
  }
  const sfContext: SourceFileContext = {
    scope,
  };

  if (props.export) {
    if (pkg) {
      if (typeof props.export === "boolean") {
        pkg.scope.addExport(path, scope);
      } else {
        pkg.scope.addExport(props.export, scope);
      }
    }
  }

  const header =
    props.header || props.headerComment ?
      <SourceFileHeader
        header={props.header}
        headerComment={props.headerComment}
      />
    : undefined;

  return (
    <CoreSourceFile
      path={props.path}
      filetype="typescript"
      reference={Reference}
      header={header}
    >
      <Show when={scope.importedModules.size > 0}>
        <ImportStatements records={scope.importedModules} />
        <hbr />
        <hbr />
      </Show>
      <SourceFileContext.Provider value={sfContext}>
        <Scope value={scope}>{props.children}</Scope>
      </SourceFileContext.Provider>
    </CoreSourceFile>
  );
}

export interface SourceFileHeaderProps {
  header?: Children;
  headerComment?: string;
}

function SourceFileHeader(props: SourceFileHeaderProps) {
  return (
    <>
      <Show when={props.headerComment !== undefined}>
        <SingleLineCommentBlock>{props.headerComment}</SingleLineCommentBlock>
      </Show>
      <Show when={props.header !== undefined}>{props.header}</Show>
      <hbr />
    </>
  );
}
