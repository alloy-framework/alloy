import { effect, memo, SourceFile } from "@alloy-js/core";
import { dirname, join, relative, sep } from "pathe";
import { usePackage } from "./PackageDirectory.js";

export interface TSConfigJsonProps {
  outDir?: string;
}

export function TSConfigJson(props: TSConfigJsonProps) {
  const pkg = usePackage();
  if (!pkg) {
    throw new Error(
      "TSConfigJson component needs to be inside a PackageDirectory",
    );
  }
  const outDir = props.outDir ?? "dist";
  const includeDirs = memo(() => {
    const rootDirs = new Set<string>();
    for (const mod of pkg.scope.modules) {
      const rootDir = dirname(mod.name).split(sep)[0];
      rootDirs.add(rootDir);
    }

    if (rootDirs.has(".")) {
      return ["."];
    } else {
      return Array.from(rootDirs);
    }
  });

  effect(() => {
    const dirs = includeDirs();
    if (dirs.length === 1) {
      pkg.outFileMapper.value = (path: string) =>
        join(outDir, relative(dirs[0], path));
    } else {
      pkg.outFileMapper.value = (path: string) => join(outDir, path);
    }
  });

  const jsonContent = memo(() => {
    const jsonContent = {
      compilerOptions: {
        target: "esnext",
        module: "nodenext",
        strict: true,
        declaration: true,
        sourceMap: true,
        declarationMap: true,
        outDir: "dist",
      },
      include: includeDirs().map((d) => `${d}/**/*.ts`),
      exclude: ["node_modules", "dist"],
    };

    return JSON.stringify(jsonContent, null, 2);
  });

  return (
    <SourceFile path="tsconfig.json" filetype="json">
      {jsonContent}
    </SourceFile>
  );
}
