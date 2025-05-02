import fs from "fs/promises";
import yaml from "js-yaml";
import path from "path";

async function generateDepsVersions() {
  // Get current directory (assuming script is run from package root)
  const packageDir = process.cwd();

  // Load package.json
  const packageJsonPath = path.join(packageDir, "package.json");
  const packageJson = JSON.parse(await fs.readFile(packageJsonPath, "utf8"));
  const packageVersion = packageJson.version;

  // Load deps.json
  const depsJsonPath = path.join(packageDir, "deps.json");
  const depsJson = JSON.parse(await fs.readFile(depsJsonPath, "utf8"));

  // Load workspace yaml for catalog
  const workspaceYamlPath = path.join(packageDir, "../../pnpm-workspace.yaml");
  const workspaceYaml = yaml.load(await fs.readFile(workspaceYamlPath, "utf8"));
  const catalog = workspaceYaml.catalog || {};

  // Generate versions object
  const versions = {};

  // Process dependencies
  const allDeps = [
    ...(depsJson.dependencies || []),
    ...(depsJson.devDependencies || []),
  ];

  for (const dep of allDeps) {
    const packageName = dep.package;

    if (packageName === "@alloy-js/babel-plugin") {
      // Special case for @alloy-js/babel-plugin
      const babelPluginPath = path.join(
        packageDir,
        "../babel-plugin-alloy/package.json",
      );
      const babelPluginJson = JSON.parse(
        await fs.readFile(babelPluginPath, "utf8"),
      );
      versions[packageName] = babelPluginJson.version;
    } else if (packageName.startsWith("@alloy-js")) {
      // remove the scope from the package name
      const scopedPackageName = packageName.replace("@alloy-js/", "");
      const scopedPackagePath = path.join(
        packageDir,
        `../${scopedPackageName}/package.json`,
      );
      const scopedPackageJson = JSON.parse(
        await fs.readFile(scopedPackagePath, "utf8"),
      );
      versions[packageName] = scopedPackageJson.version;
    } else if (catalog[packageName]) {
      versions[packageName] = catalog[packageName];
    } else {
      console.warn(`Warning: No catalog entry found for ${packageName}`);
    }
  }

  // Write to deps-versions.json
  const outputPath = path.join(packageDir, "deps-versions.json");
  await fs.writeFile(outputPath, JSON.stringify(versions, null, 2), "utf8");

  console.log(`Dependencies versions written to ${outputPath}`);
}

// Execute the function
generateDepsVersions().catch((err) => {
  console.error("Error generating dependencies versions:", err);
  process.exit(1);
});
