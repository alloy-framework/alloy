import {
  SourceDirectory as CoreSourceDirectory,
  SourceDirectoryProps as CoreSourceDirectoryProps,
  Scope,
  SourceDirectoryContext,
  useContext,
} from "@alloy-js/core";
import { basename, join } from "pathe";
import { useModule } from "../scopes/module.js";
import { createGoPackageScope } from "../scopes/package.js";
import { createPackageSymbol } from "../symbols/factories.js";

export interface SourceDirectoryProps extends CoreSourceDirectoryProps {
  name?: string;
}

export function SourceDirectory(props: SourceDirectoryProps) {
  const mod = useModule();
  const directoryContext = useContext(SourceDirectoryContext)!;
  const currentDir = join(directoryContext.path, props.path);
  const dname = basename(currentDir);
  const modName = mod ? basename(mod.name) : "main";
  const packageName = props.name ?? (dname === "." ? modName : dname);
  const packageSymbol = createPackageSymbol(packageName, props.path);
  const packageScope = createGoPackageScope(packageSymbol);

  return (
    <CoreSourceDirectory path={props.path}>
      <Scope value={packageScope}>{props.children}</Scope>;
    </CoreSourceDirectory>
  );
}
