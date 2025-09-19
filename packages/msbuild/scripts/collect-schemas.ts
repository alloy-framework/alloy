import { XMLParser } from "fast-xml-parser";

export interface XmlSchema {
  tagName: string;
  description?: string;
  attributes: Record<string, XmlAttribute>;
}

export interface XmlAttribute {
  name: string;
  type?: string;
  description?: string;
  use?: "optional" | "required" | "prohibited";
}

const RAW_BASE =
  "https://raw.githubusercontent.com/dotnet/msbuild/main/src/MSBuild/MSBuild/";
const ENTRY_URL = RAW_BASE + "Microsoft.Build.CommonTypes.xsd";

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

/** Load all the XML schemas */
async function collectSchemas(entryUrl: string): Promise<Map<string, any>> {
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
  elementName?: string,
) {
  if (!ct) return;

  // helper to gather attributes from a complexType, following extensions/base types
  function gatherAttributesFromCT(
    curr: any,
    seen = new Set(),
  ): Record<string, XmlAttribute> {
    const res: Record<string, XmlAttribute> = {};
    if (!curr || seen.has(curr)) return res;
    seen.add(curr);
    // direct attributes
    for (const a of toArray(curr.attribute)) {
      const name = getAttr(a, "name");
      if (!name) continue;
      res[name] = {
        name,
        type: getAttr(a, "type"),
        description: extractDocumentation(a),
        use: getAttr(a, "use"),
      };
    }
    // attributes on extension if present
    const complexContent =
      curr.complexContent || curr.ComplexContent || curr.complexcontent;
    const extension =
      complexContent &&
      (complexContent.extension ||
        complexContent.Extension ||
        complexContent.Extension);
    const extNode = extension || curr.extension || curr.Extension;
    if (extNode) {
      for (const a of toArray(extNode.attribute)) {
        const name = getAttr(a, "name");
        if (!name) continue;
        res[name] = {
          name,
          type: getAttr(a, "type"),
          description: extractDocumentation(a),
          use: getAttr(a, "use"),
        };
      }
      // if extension declares a base, try to resolve attributes from base type
      const base = getAttr(extNode, "base");
      if (base) {
        // base may be namespaced like msb:SimpleItemType, take last segment
        const baseName = String(base).split(":").pop() as string;
        if (baseName && types[baseName]) {
          const fromBase = gatherAttributesFromCT(types[baseName], seen);
          Object.assign(res, fromBase);
        }
      }
    }

    // also consider if this complexType itself references a named base directly via 'base' (rare)
    const directBase = getAttr(curr, "base");
    if (directBase) {
      const baseName = String(directBase).split(":").pop() as string;
      if (baseName && types[baseName]) {
        const fromBase = gatherAttributesFromCT(types[baseName], seen);
        Object.assign(res, fromBase);
      }
    }

    return res;
  }

  // attach attributes to the element entry if an elementName was provided
  if (elementName) {
    const elEntry = out.get(elementName);
    if (elEntry) {
      const gathered = gatherAttributesFromCT(ct);
      elEntry.attributes = Object.assign(
        {},
        elEntry.attributes || {},
        gathered,
      );
      out.set(elementName, elEntry);
    }
  }

  // find child elements in sequences/choices, including those nested inside extensions
  const complexContent =
    ct.complexContent || ct.ComplexContent || ct.complexcontent;
  const extension =
    complexContent && (complexContent.extension || complexContent.Extension);
  const extNode = extension || ct.extension || ct.Extension;

  const seqCandidate = extNode || ct;
  const seq =
    seqCandidate.sequence ||
    seqCandidate.choice ||
    seqCandidate.Sequence ||
    seqCandidate.Choice ||
    seqCandidate.sequence;
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
      if (childType) {
        const tName = String(childType).split(":").pop() as string;
        if (tName && !tName.startsWith("xs:") && types[tName]) {
          collectFromComplexType(types[tName], types, out, childName);
        }
      }
      // if child has anonymous complexType
      if ((child as any).complexType) {
        collectFromComplexType(
          (child as any).complexType,
          types,
          out,
          childName,
        );
      }
    }
  }
}

function extractAttributesFromElement(
  el: any,
  types: Record<string, any>,
): Record<string, XmlAttribute> {
  const attrs: Record<string, XmlAttribute> = {};

  // helper re-used from collectFromComplexType to gather attributes
  function gatherFrom(ct: any) {
    if (!ct) return {};
    // reuse logic by creating a temporary map and calling collectFromComplexType to attach to a temp element
    // but to avoid duplication, replicate the essential gatherAttributesFromCT logic here
    const res: Record<string, XmlAttribute> = {};
    // direct attributes on anonymous complexType
    for (const a of toArray(ct.attribute)) {
      const name = getAttr(a, "name");
      if (!name) continue;
      res[name] = {
        name,
        type: getAttr(a, "type"),
        description: extractDocumentation(a),
        use: getAttr(a, "use"),
      };
    }

    const complexContent =
      ct.complexContent || ct.ComplexContent || ct.complexcontent;
    const extension =
      complexContent && (complexContent.extension || complexContent.Extension);
    const extNode = extension || ct.extension || ct.Extension;
    if (extNode) {
      for (const a of toArray(extNode.attribute)) {
        const name = getAttr(a, "name");
        if (!name) continue;
        res[name] = {
          name,
          type: getAttr(a, "type"),
          description: extractDocumentation(a),
          use: getAttr(a, "use"),
        };
      }
      const base = getAttr(extNode, "base");
      if (base) {
        const baseName = String(base).split(":").pop() as string;
        if (baseName && types[baseName]) {
          // add attributes from base type
          for (const a of toArray(types[baseName].attribute)) {
            const name = getAttr(a, "name");
            if (!name) continue;
            res[name] = {
              name,
              type: getAttr(a, "type"),
              description: extractDocumentation(a),
              use: getAttr(a, "use"),
            };
          }
        }
      }
    }

    return res;
  }

  // attributes directly on element's anonymous complexType
  if (el.complexType) {
    Object.assign(attrs, gatherFrom(el.complexType));
  }

  // attributes coming from a referenced type (named complexType)
  const typeName = getAttr(el, "type");
  if (typeName) {
    const tName = String(typeName).split(":").pop() as string;
    if (tName && !tName.startsWith("xs:") && types[tName]) {
      Object.assign(attrs, gatherFrom(types[tName]));
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

    if (name === "PackageReference") {
      console.log(
        "Found PackageReference",
        el,
        extractAttributesFromElement(el, types),
      );
    }
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
