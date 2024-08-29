import {
  mapJoin,
  memo,
  SourceDirectoryContext,
  useContext,
} from "@alloy-js/core";
import { basename } from "pathe";
import { getSourceDirectoryData } from "../source-directory-data.js";
import { TSModuleScope } from "../symbols/index.js";
import { ExportStatement } from "./ExportStatement.js";
import { SourceFile } from "./SourceFile.js";
export interface BarrelFileProps {
  path?: string;
  export?: boolean | string;
}

export function BarrelFile(props: BarrelFileProps) {
  const path = props.path ?? "index.ts";
  const directory = useContext(SourceDirectoryContext)!;
  const sdData = getSourceDirectoryData(directory);

  const exports = memo(() => {
    const subdirs = directory.contents.filter(
      (c) => !(c as any).filetype,
    ) as SourceDirectoryContext[];

    const nestedBarrels: TSModuleScope[] = [];
    for (const subdir of subdirs) {
      const nestedSdData = getSourceDirectoryData(subdir);
      const nestedBarrel = Array.from(nestedSdData.modules).find(
        (m) => basename(m.name) === "index.ts",
      );
      if (nestedBarrel) {
        nestedBarrels.push(nestedBarrel);
      }
    }

    const sourceFiles = Array.from(sdData.modules).filter(
      (m) => basename(m.name) !== "index.ts",
    );

    const allModules = [...sourceFiles, ...nestedBarrels];
    return mapJoin(allModules, (module) => {
      return <ExportStatement star from={module} />;
    });
  });

  return <SourceFile path={path} export={props.export}>
    {exports}
  </SourceFile>;
}
