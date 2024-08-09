import "vitest";
import { pluginTester } from "babel-plugin-tester";
import { join } from "node:path";
import plugin from "../src/index.js";

pluginTester({
  plugin,
  title: "Convert JSX",
  fixtures: join(import.meta.dirname, "fixtures"),
  snapshot: true,
  formatResult: (r) => r,
});
