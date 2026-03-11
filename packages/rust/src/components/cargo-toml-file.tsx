import { SourceFile, memo, useContext } from "@alloy-js/core";
import { CrateContext } from "../context/crate-context.js";
import type { CrateDependency } from "../scopes/rust-crate-scope.js";

export type { CrateDependency };

export interface CargoTomlFileProps {
  name: string;
  version?: string;
  edition?: string;
  dependencies?: Record<string, CrateDependency>;
}

function renderDependency(dependency: CrateDependency): string {
  if (typeof dependency === "string") {
    return `"${dependency}"`;
  }

  if (!dependency.features || dependency.features.length === 0) {
    return `{ version = "${dependency.version}" }`;
  }

  const sortedFeatures = [...dependency.features].sort((left, right) =>
    left.localeCompare(right),
  );
  return `{ version = "${dependency.version}", features = ["${sortedFeatures.join('", "')}"] }`;
}

export function CargoTomlFile(props: CargoTomlFileProps) {
  const crate = useContext(CrateContext);
  const cargoToml = memo(() => {
    const mergedDependencies = new Map<string, CrateDependency>();

    if (crate) {
      for (const [name, dependency] of crate.scope.dependencies) {
        mergedDependencies.set(name, dependency);
      }
    }

    for (const [name, dependency] of Object.entries(props.dependencies ?? {})) {
      mergedDependencies.set(name, dependency);
    }

    const sortedDependencies = [...mergedDependencies.entries()].sort(([left], [right]) =>
      left.localeCompare(right),
    );

    const lines = [
      "[package]",
      `name = "${props.name}"`,
      `version = "${props.version ?? "0.1.0"}"`,
      `edition = "${props.edition ?? "2021"}"`,
      "",
      "[dependencies]",
    ];

    for (const [name, dependency] of sortedDependencies) {
      lines.push(`${name} = ${renderDependency(dependency)}`);
    }

    return lines.join("\n");
  });

  return (
    <SourceFile path="Cargo.toml" filetype="toml">
      {cargoToml}
    </SourceFile>
  );
}
