import { XMLParser } from "fast-xml-parser";

interface XmlAttribute {
  name: string;
  type?: string;
  description?: string;
  use?: "optional" | "required" | "prohibited";
}

interface XmlSchema {
  tagName: string;
  description?: string;
  attributes: Record<string, XmlAttribute>;
}

const RAW_BASE =
  "https://raw.githubusercontent.com/dotnet/msbuild/main/src/MSBuild/MSBuild/";
const ENTRY_URL = RAW_BASE + "Microsoft.Build.Core.xsd";

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  removeNSPrefix: true,
  parseTagValue: false,
  trimValues: true,
});

function toArray<T>(v: any): T[] {
  if (v == null) return [];
  return Array.isArray(v) ? v : [v];
}

function getAttr(obj: any, name: string): any {
  return obj ? obj[`@_${name}`] : undefined;
}

function extractDocumentation(node: any): string | undefined {
  if (!node) return undefined;
  const ann = node.annotation || node.Annotation;
  if (!ann) return undefined;
  const docs = ann.documentation || ann.Documentation;
  if (!docs) return undefined;
  if (typeof docs === "string") return docs.trim();
  // documentation can be object with '#text' or value
  if (docs["#text"]) return String(docs["#text"]).trim();
  if (docs["@_source"]) return String(docs["@_source"]).trim();
  return JSON.stringify(docs);
}

async function fetchText(url: string): Promise<string> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  return await res.text();
}

async function collectSchemas(entryUrl: string) {
  const visited = new Map<string, any>();
  async function fetchAndParse(url: string) {
    if (visited.has(url)) return visited.get(url);
    const xml = await fetchText(url);
    const parsed = parser.parse(xml);
    visited.set(url, parsed);
    // handle includes/imports
    const schema = parsed.schema || parsed.Schema;
    if (!schema) return parsed;
    const includes = toArray(schema.include).concat(toArray(schema.import));
    for (const inc of includes) {
      const loc =
        getAttr(inc, "schemaLocation") ||
        getAttr(inc, "schemaLocation".toString());
      if (!loc) continue;
      const normalized = loc.replace(/\\/g, "/");
      const resolved = new URL(normalized, url).href;
      try {
        await fetchAndParse(resolved);
      } catch (e) {
        // try relative to RAW_BASE as fallback
        try {
          const fallback = new URL(normalized, RAW_BASE).href;
          await fetchAndParse(fallback);
        } catch (e2) {
          // ignore
        }
      }
    }
    return parsed;
  }

  await fetchAndParse(entryUrl);
  return visited;
}

function buildMaps(visited: Map<string, any>) {
  const elements: any[] = [];
  const types: Record<string, any> = {};

  for (const parsed of visited.values()) {
    const schema = parsed.schema || parsed.Schema;
    if (!schema) continue;
    for (const el of toArray(schema.element)) elements.push(el);
    for (const ct of toArray(schema.complexType)) {
      const name = getAttr(ct, "name");
      if (name) types[name] = ct;
    }
    // global attribute groups or attributes could be handled here if needed
  }
  return { elements, types };
}

function collectFromComplexType(
  ct: any,
  types: Record<string, any>,
  out: Map<string, XmlSchema>,
) {
  if (!ct) return;
  // attributes on this complexType
  for (const attr of toArray(ct.attribute)) {
    const name = getAttr(attr, "name");
    if (!name) continue;
    const t: XmlAttribute = {
      name,
      type: getAttr(attr, "type"),
      description: extractDocumentation(attr),
      use: getAttr(attr, "use"),
    };
    // attributes belong to current element; handled by caller
  }
  // child elements in sequences/choices
  const seq = ct.sequence || ct.choice || ct.Sequence || ct.Choice;
  if (seq) {
    const children = toArray(seq.element) as any[];
    for (const child of children) {
      const childName = getAttr(child, "name") || getAttr(child, "ref");
      if (!childName) continue;
      if (!out.has(childName)) {
        out.set(childName, {
          tagName: childName,
          description: extractDocumentation(child),
          attributes: {},
        });
      }
      // recursively if child references a type
      const childType = getAttr(child, "type");
      if (childType && !childType.startsWith("xs:") && types[childType]) {
        collectFromComplexType(types[childType], types, out);
      }
      // if child has anonymous complexType
      if ((child as any).complexType) {
        collectFromComplexType((child as any).complexType, types, out);
      }
    }
  }
}

function extractAttributesFromElement(
  el: any,
  types: Record<string, any>,
): Record<string, XmlAttribute> {
  const attrs: Record<string, XmlAttribute> = {};
  // attributes directly on element's complexType
  if (el.complexType) {
    for (const a of toArray(el.complexType.attribute)) {
      const name = getAttr(a, "name");
      if (!name) continue;
      attrs[name] = {
        name,
        type: getAttr(a, "type"),
        description: extractDocumentation(a),
        use: getAttr(a, "use"),
      };
    }
  }
  // attributes coming from a referenced type
  const typeName = getAttr(el, "type");
  if (typeName && !typeName.startsWith("xs:") && types[typeName]) {
    const ct = types[typeName];
    for (const a of toArray(ct.attribute)) {
      const name = getAttr(a, "name");
      if (!name) continue;
      attrs[name] = {
        name,
        type: getAttr(a, "type"),
        description: extractDocumentation(a),
        use: getAttr(a, "use"),
      };
    }
  }
  return attrs;
}

export async function resolveSchemas(
  entryUrl = ENTRY_URL,
): Promise<XmlSchema[]> {
  const visited = await collectSchemas(entryUrl);
  const { elements, types } = buildMaps(visited);

  const out = new Map<string, XmlSchema>();

  // add global elements
  for (const el of elements) {
    const name = getAttr(el, "name");
    if (!name) continue;
    const schema: XmlSchema = {
      tagName: name,
      description: extractDocumentation(el),
      attributes: extractAttributesFromElement(el, types),
    };
    out.set(name, schema);
    // if element references a type, traverse to find nested elements
    const typeName = getAttr(el, "type");
    if (typeName && !typeName.startsWith("xs:") && types[typeName]) {
      collectFromComplexType(types[typeName], types, out);
    }
    if (el.complexType) {
      collectFromComplexType(el.complexType, types, out);
    }
  }

  // also include elements discovered as children
  const result = Array.from(out.values()).sort((a, b) =>
    a.tagName.localeCompare(b.tagName),
  );
  return result;
}
