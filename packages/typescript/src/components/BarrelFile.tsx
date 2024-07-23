import { mapJoin, memo, SourceDirectoryContext, useContext } from "@alloy-js/core";
import { SourceFile } from "./SourceFile.js";
import { basename, join } from "pathe";
export interface BarrelFileProps {
  path?: string;
  export?: boolean | string;
}

export function BarrelFile(props: BarrelFileProps) {
  const path = props.path ?? "index.ts";
  const directory = useContext(SourceDirectoryContext)!;

  const imports = memo(() => {
    // todo: this filter is possibly incorrect if another file happens to have the same suffix
    // probably better to do this calculation on the barrel file's full path
    const otherFiles = directory.contents
      .filter(
        (c) =>
          !c.path.endsWith(path) &&
          ((c as any).filetype === undefined || (c as any).filetype === "typescript")
      )
      .map((c) => {
        const relativePath = basename(c.path).replace(/\.ts$/, ".js");
        if (c.hasOwnProperty("filetype")) {
          return makeRelative(relativePath);
        } else {
          return makeRelative(join(relativePath, "index.js"));
        }
      });

    return mapJoin(otherFiles, (file) => 
      <>export * from "{file}";</>
    , { joiner: "\n"});
  });

  return <SourceFile path={path} export={props.export}>
    {imports}
  </SourceFile>
}

function makeRelative(path: string) {
  return path[0] === "." ? path : "./" + path;
}