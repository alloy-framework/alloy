import { ComponentContext, createNamedContext } from "@alloy-js/core";
import { TSPackageScope } from "../symbols/ts-package-scope.js";

export interface PackageMetadataContext {
  versionSpecifiers: Map<TSPackageScope, string>;
  dependencyType: Map<
    TSPackageScope,
    "dependencies" | "peerDependencies" | "devDependencies"
  >;
}

export const PackageMetadataContext: ComponentContext<PackageMetadataContext> =
  createNamedContext<PackageMetadataContext>("PackageMetadataContext");
