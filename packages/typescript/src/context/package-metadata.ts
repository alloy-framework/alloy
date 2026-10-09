import type { ComponentContext } from "@alloy-js/core";
import { createNamedContext } from "@alloy-js/core";

import type { TSPackageScope } from "../symbols/ts-package-scope.js";

export interface PackageMetadataContext {
  versionSpecifiers: Map<TSPackageScope, string>;
  dependencyType: Map<
    TSPackageScope,
    "dependencies" | "peerDependencies" | "devDependencies"
  >;
}

export const PackageMetadataContext: ComponentContext<PackageMetadataContext> =
  createNamedContext<PackageMetadataContext>("PackageMetadataContext");
