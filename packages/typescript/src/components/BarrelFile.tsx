import { For, memo, SourceDirectoryContext, useContext } from "@alloy-js/core";
import { basename } from "pathe";
import { getSourceDirectoryData } from "../source-directory-data.js";
import { TSModuleScope } from "../symbols/index.js";
import { ExportStatement } from "./ExportStatement.js";
import { SourceFile } from "./SourceFile.js";

export interface BarrelFileProps {
  /**
   * The name of the source file
   */
  path?: string;

  /**
   * Whether the source file is exported out of the package. When true, this
   * source file with its source file relative to the project root. Otherwise,
   * it will be exported with the specified path.
   */
  export?: boolean | string;
}

/**
 * Creates a source file which re-exports the exports in other files and nested
 * barrel files in the source directory its placed in.
 *
 * @remarks
 *
 * This component must be placed directly inside a {@link @alloy-js/core#SourceDirectory}
 * component. It will only discover nested barrel files directly within nested
 * source directories.
 *
 * @example
 *
 * Creating a barrel file which exports the two other source files in the same directory
 *
 * ```tsx
 * <Output>
 *   <SourceDirectory path="src">
 *     <SourceFile path="one.ts" />
 *     <SourceFile path="two.ts" />
 *     <BarrelFile />
 *   </SourceDirectory>
 * </Output>
 * ```
 *
 * The barrel file will contain the following contents:
 *
 * ```ts
 * export * from "./one.js";
 * export * from "./two.js";
 * ```
 *
 *
 * @see {@link @alloy-js/core#SourceDirectory}
 * @see {@link SourceFile}
 */
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

    return [...sourceFiles, ...nestedBarrels];
  });

  const exportNameConflicts = memo(() => {
    const modules = exports();
    const nameOwners = new Map<string, TSModuleScope[]>();

    for (const mod of modules) {
      const publicSymbols = mod.getPublicSymbols();
      for (const sym of publicSymbols) {
        if (!nameOwners.has(sym.name)) {
          nameOwners.set(sym.name, []);
        }
        const owners = nameOwners.get(sym.name)!;
        if (!owners.includes(mod)) {
          owners.push(mod);
        }
      }
    }

    const moduleConflicts = new Map<TSModuleScope, Map<string, string>>();

    for (const [name, owners] of nameOwners) {
      if (owners.length <= 1) continue;

      for (let i = 1; i < owners.length; i++) {
        if (!moduleConflicts.has(owners[i])) {
          moduleConflicts.set(owners[i], new Map());
        }
        moduleConflicts.get(owners[i])!.set(name, `${name}_${i}`);
      }
    }

    return moduleConflicts;
  });

  return (
    <SourceFile path={path} export={props.export}>
      <For each={exports}>
        {(mod) => {
          const conflicts = exportNameConflicts().get(mod);
          return <ExportStatement star from={mod} nameConflicts={conflicts} />;
        }}
      </For>
    </SourceFile>
  );
}
