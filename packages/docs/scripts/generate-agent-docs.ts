/**
 * Generates per-page agent-friendly markdown files from the starlight-llms-txt
 * plugin output. Run after `astro build`.
 *
 * Reads:
 *   - src/content/docs/reference/<pkg>/<category>/<Item>.mdx  (for title→path mapping)
 *   - dist/_llms-txt/<pkg>.txt  (rendered markdown from starlight-llms-txt)
 *
 * Writes:
 *   - ../../<pkg>/docs/api/index.md
 *   - ../../<pkg>/docs/api/<category>/index.md
 *   - ../../<pkg>/docs/api/<category>/<Item>.md
 */
import {
  mkdirSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { join, resolve } from "node:path";

const PAGE_SEPARATOR = "\n\n---PAGE_BREAK---\n\n";

const docsRoot = resolve(import.meta.dirname, "..");
const referenceDir = resolve(docsRoot, "src/content/docs/reference");
const distDir = resolve(docsRoot, "dist");
const packagesDir = resolve(docsRoot, "..");

// Step 1: Build title → { package, category, filename } manifest from MDX structure
interface PageInfo {
  pkg: string;
  /** Subpath within the package (e.g. "testing") or undefined for main entry */
  subpath?: string;
  category: string;
  filename: string;
  title: string;
}

function scanCategoryDir(
  catDir: string,
  pkg: string,
  category: string,
  byTitle: Map<string, PageInfo[]>,
  subpath?: string,
) {
  for (const file of readdirSync(catDir)) {
    if (!file.endsWith(".mdx")) continue;
    const content = readFileSync(join(catDir, file), "utf-8");
    const titleMatch = content.match(/^title:\s*(.+)$/m);
    if (!titleMatch) continue;

    const title = titleMatch[1].trim();
    const filename = file.replace(".mdx", "");

    const info: PageInfo = { pkg, subpath, category, filename, title };
    const existing = byTitle.get(title);
    if (existing) {
      existing.push(info);
    } else {
      byTitle.set(title, [info]);
    }
  }
}

function buildManifest(): Map<string, PageInfo[]> {
  const byTitle = new Map<string, PageInfo[]>();

  for (const pkg of readdirSync(referenceDir)) {
    const pkgDir = join(referenceDir, pkg);
    if (!statSync(pkgDir).isDirectory()) continue;

    for (const entry of readdirSync(pkgDir)) {
      const entryDir = join(pkgDir, entry);
      if (!statSync(entryDir).isDirectory()) continue;

      // Check if this is a category dir (contains .mdx files) or a subpath dir (contains category dirs)
      const children = readdirSync(entryDir);
      const hasMdx = children.some((f) => f.endsWith(".mdx"));

      if (hasMdx) {
        // Direct category dir (e.g. core/functions/)
        scanCategoryDir(entryDir, pkg, entry, byTitle);
      } else {
        // Subpath dir (e.g. core/testing/) — scan its category subdirs
        for (const subCategory of children) {
          const subCatDir = join(entryDir, subCategory);
          if (statSync(subCatDir).isDirectory()) {
            scanCategoryDir(subCatDir, pkg, subCategory, byTitle, entry);
          }
        }
      }
    }
  }

  return byTitle;
}

// Clean up starlight-llms-txt conversion artifacts in markdown content
function cleanMarkdown(text: string): string {
  // Strip Starlight's auto-generated heading anchor links and the extra blank line they leave
  let result = text.replace(/\n\n\[Section titled .+?\]\(#[^)]*\)\n/g, "\n");

  return result;
}

// Step 2: Split a per-package customSet file into individual pages
function splitPages(content: string): { title: string; body: string }[] {
  const pages: { title: string; body: string }[] = [];

  // Remove the <SYSTEM> header
  const cleaned = content.replace(/^<SYSTEM>.*?<\/SYSTEM>\s*/s, "");

  const segments = cleaned.split(PAGE_SEPARATOR).filter((s) => s.trim());

  for (const segment of segments) {
    const titleMatch = segment.match(/^#\s+(.+)/);
    if (!titleMatch) continue;

    const body = cleanMarkdown(segment.trim());

    pages.push({
      title: titleMatch[1].trim(),
      body,
    });
  }

  return pages;
}

// Step 3: Write individual files and generate indexes
/**
 * Build a lookup from type/item title to its category and filename within a package.
 * Used to cross-reference backtick type names into markdown links.
 */
function buildTypeLookup(
  bySubpath: Map<
    string | undefined,
    Map<string, { title: string; filename: string }[]>
  >,
): Map<
  string,
  { subpath: string | undefined; category: string; filename: string }
> {
  const lookup = new Map<
    string,
    { subpath: string | undefined; category: string; filename: string }
  >();
  for (const [subpath, categorized] of bySubpath) {
    for (const [category, items] of categorized) {
      for (const item of items) {
        lookup.set(item.title, { subpath, category, filename: item.filename });
      }
    }
  }
  return lookup;
}

/**
 * Replace backtick-wrapped known type names with markdown links in a page body.
 * Only matches exact type names (e.g., `OutputSymbol`) not compound expressions.
 */
function crossReferenceTypes(
  body: string,
  pageCategory: string,
  pageSubpath: string | undefined,
  typeLookup: Map<
    string,
    { subpath: string | undefined; category: string; filename: string }
  >,
): string {
  return body.replace(/`([A-Z][A-Za-z0-9]*)`/g, (match, typeName) => {
    const target = typeLookup.get(typeName);
    if (!target) return match;

    // Build relative path from the current page's category dir to the target
    let relativePath: string;
    if (pageSubpath === target.subpath && pageCategory === target.category) {
      relativePath = `${target.filename}.md`;
    } else if (pageSubpath === target.subpath) {
      relativePath = `../${target.category}/${target.filename}.md`;
    } else {
      const prefix = pageSubpath ? "../../" : "../";
      const targetBase = target.subpath ? `${target.subpath}/` : "";
      relativePath = `${prefix}${targetBase}${target.category}/${target.filename}.md`;
    }

    return `[\`${typeName}\`](${relativePath})`;
  });
}

function generatePackageDocs(
  pkg: string,
  pages: { title: string; body: string }[],
  manifest: Map<string, PageInfo[]>,
) {
  const apiDir = resolve(packagesDir, pkg, "docs", "api");

  // Group by subpath, then by category
  type ItemInfo = {
    title: string;
    filename: string;
    body: string;
    firstLine: string;
  };
  const bySubpath = new Map<string | undefined, Map<string, ItemInfo[]>>();

  for (const page of pages) {
    // Look up category from manifest
    const entries = manifest.get(page.title);
    const entry = entries?.find((e) => e.pkg === pkg);
    if (!entry) {
      console.warn(
        `  warn: no manifest entry for "${page.title}" in ${pkg}, skipping`,
      );
      continue;
    }

    if (!bySubpath.has(entry.subpath)) {
      bySubpath.set(entry.subpath, new Map());
    }
    const categorized = bySubpath.get(entry.subpath)!;

    const category = entry.category;
    if (!categorized.has(category)) {
      categorized.set(category, []);
    }

    // Extract first meaningful line as description (handle minified single-line content)
    const lines = page.body.split("\n");
    let firstLine = "";
    for (let i = 1; i < lines.length; i++) {
      const l = lines[i].trim();
      if (
        !l ||
        l.startsWith("#") ||
        l.startsWith(">") ||
        l.startsWith("```") ||
        l.startsWith("|") ||
        l.startsWith("*")
      )
        continue;
      // For minified content, take only the first sentence
      const sentenceEnd = l.search(/[.!?]\s/);
      firstLine =
        sentenceEnd > 0 ? l.slice(0, sentenceEnd + 1) : l.slice(0, 120);
      break;
    }

    categorized.get(category)!.push({
      title: page.title,
      filename: entry.filename,
      body: page.body,
      firstLine: firstLine.trim(),
    });
  }

  let totalItems = 0;
  const allCategories: [string, ItemInfo[]][] = [];
  const typeLookup = buildTypeLookup(bySubpath);

  for (const [subpath, categorized] of bySubpath) {
    const baseDir = subpath ? resolve(apiDir, subpath) : apiDir;

    // Write individual page files
    for (const [category, items] of categorized) {
      const catDir = resolve(baseDir, category);
      mkdirSync(catDir, { recursive: true });

      for (const item of items) {
        const body = crossReferenceTypes(
          item.body,
          category,
          subpath,
          typeLookup,
        );
        writeFileSync(resolve(catDir, `${item.filename}.md`), body + "\n");
      }

      // Write category index
      items.sort((a, b) => a.title.localeCompare(b.title));
      const label = subpath ? `${pkg}/${subpath}` : pkg;
      const catIndex = [
        `# ${label} — ${category}`,
        "",
        ...items.map((item) => {
          const desc = item.firstLine ? ` — ${item.firstLine}` : "";
          return `- [${item.title}](${item.filename}.md)${desc}`;
        }),
        "",
      ].join("\n");

      writeFileSync(resolve(catDir, "index.md"), catIndex);
      totalItems += items.length;
    }

    // Write subpath-level index
    mkdirSync(baseDir, { recursive: true });
    const categories = [...categorized.entries()].sort(([a], [b]) =>
      a.localeCompare(b),
    );
    const label = subpath ? `@alloy-js/${pkg}/${subpath}` : `@alloy-js/${pkg}`;
    const subpathIndex = [
      `# ${label} API Reference`,
      "",
      ...categories.map(
        ([cat, items]) => `- [${cat}](${cat}/index.md) (${items.length} items)`,
      ),
      "",
    ].join("\n");

    writeFileSync(resolve(baseDir, "index.md"), subpathIndex);

    for (const [cat, items] of categorized) {
      const catLabel = subpath ? `${subpath}/${cat}` : cat;
      allCategories.push([catLabel, items]);
    }
  }

  // Write top-level package API index (includes all subpaths)
  mkdirSync(apiDir, { recursive: true });
  const pkgIndex = [
    `# @alloy-js/${pkg} API Reference`,
    "",
    ...allCategories
      .sort(([a], [b]) => a.localeCompare(b))
      .map(
        ([cat, items]) => `- [${cat}](${cat}/index.md) (${items.length} items)`,
      ),
    "",
  ].join("\n");

  writeFileSync(resolve(apiDir, "index.md"), pkgIndex);

  return { totalItems, bySubpath };
}

// Main
console.time("generate-agent-docs");

const manifest = buildManifest();
console.log(`Manifest: ${manifest.size} unique titles`);

const packages = [
  "core",
  "typescript",
  "python",
  "csharp",
  "go",
  "java",
  "json",
];
const llmsTxtDir = resolve(distDir, "_llms-txt");

// Read directly from per-package files in _llms-txt/. These are already
// correctly split by starlight-llms-txt — no disambiguation needed.
let totalPages = 0;
for (const pkg of packages) {
  const pkgFile = resolve(llmsTxtDir, `${pkg}.txt`);
  let content: string;
  try {
    content = readFileSync(pkgFile, "utf-8");
  } catch {
    console.warn(`Skipping ${pkg}: no ${pkg}.txt found`);
    continue;
  }

  const pages = splitPages(content);
  if (pages.length === 0) {
    console.warn(`Skipping ${pkg}: no pages found`);
    continue;
  }

  console.log(`${pkg}: ${pages.length} pages`);
  const { totalItems, bySubpath } = generatePackageDocs(pkg, pages, manifest);
  totalPages += totalItems;
  for (const [subpath, categorized] of bySubpath) {
    for (const [cat, items] of categorized) {
      const label = subpath ? `${subpath}/${cat}` : cat;
      console.log(`  ${label}: ${items.length} items`);
    }
  }
}

console.log(`Total: ${totalPages} agent doc files generated`);

// Post-process llms*.txt and custom set files with cleanMarkdown fixes
const llmsFiles = ["llms.txt", "llms-full.txt", "llms-small.txt"];
for (const file of llmsFiles) {
  const filePath = resolve(distDir, file);
  try {
    const content = readFileSync(filePath, "utf-8");
    writeFileSync(filePath, cleanMarkdown(content));
    console.log(`Cleaned ${file}`);
  } catch {
    // File may not exist
  }
}
try {
  for (const file of readdirSync(llmsTxtDir)) {
    if (file.endsWith(".txt")) {
      const filePath = resolve(llmsTxtDir, file);
      const content = readFileSync(filePath, "utf-8");
      writeFileSync(filePath, cleanMarkdown(content));
      console.log(`Cleaned _llms-txt/${file}`);
    }
  }
} catch {
  // Directory may not exist
}

console.timeEnd("generate-agent-docs");
