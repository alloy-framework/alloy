import { XMLParser } from "fast-xml-parser";

export interface XmlSchema {
  tagName: string;
  description?: string;
  attributes: Record<string, XmlAttribute>;
  base?: string;
  internal?: boolean; // mark schemas created from top-level complexTypes
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

// normalize a possibly-prefixed XML name (e.g. "msb:Foo" -> "Foo")
function localName(v: any): string | undefined {
  if (v == null) return undefined;
  return String(v).split(":").pop();
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
      const ln = localName(name);
      if (ln) types[ln] = ct;
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
  ): { attrs: Record<string, XmlAttribute>; base?: string } {
    const res: Record<string, XmlAttribute> = {};
    if (!curr || seen.has(curr)) return { attrs: res };
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
    let foundBase: string | undefined;
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
      // if extension declares a base, capture the base name but do NOT merge its attributes
      const base = getAttr(extNode, "base");
      if (base) {
        const baseName = String(base).split(":").pop() as string;
        if (baseName) foundBase = baseName;
      }
    }

    // also consider if this complexType itself references a named base directly via 'base' (rare)
    const directBase = getAttr(curr, "base");
    if (directBase) {
      const baseName = String(directBase).split(":").pop() as string;
      if (baseName) foundBase = foundBase || baseName;
    }

    return { attrs: res, base: foundBase };
  }

  // attach attributes to the element entry if an elementName was provided
  if (elementName) {
    const elEntry = out.get(elementName);
    if (elEntry) {
      const { attrs, base } = gatherAttributesFromCT(ct);
      elEntry.attributes = Object.assign({}, elEntry.attributes || {}, attrs);
      if (base) elEntry.base = base;
      out.set(elementName, elEntry);

      // also traverse base type for nested element discovery (but don't merge its attributes)
      if (base && types[base]) {
        collectFromComplexType(types[base], types, out, elementName);
      }
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
      const rawChildName = getAttr(child, "name") || getAttr(child, "ref");
      const childName = localName(rawChildName);
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

function extractAttributesAndBaseFromElement(
  el: any,
  types: Record<string, any>,
): { attributes: Record<string, XmlAttribute>; base?: string } {
  const attrs: Record<string, XmlAttribute> = {};
  let foundBase: string | undefined;

  // helper re-used from collectFromComplexType to gather attributes
  function gatherFrom(ct: any): {
    res: Record<string, XmlAttribute>;
    base?: string;
  } {
    if (!ct) return { res: {} };
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
        if (baseName) return { res, base: baseName };
      }
    }

    // also consider if this complexType itself references a named base directly via 'base' (rare)
    const directBase = getAttr(ct, "base");
    if (directBase) {
      const baseName = String(directBase).split(":").pop() as string;
      if (baseName) return { res, base: baseName };
    }

    return { res };
  }

  // attributes directly on element's anonymous complexType
  if (el.complexType) {
    const g = gatherFrom(el.complexType);
    Object.assign(attrs, g.res);
    if (g.base) foundBase = g.base;
  }

  // attributes coming from a referenced type (named complexType)
  const typeName = getAttr(el, "type");
  if (typeName) {
    const tName = String(typeName).split(":").pop() as string;
    if (tName && !tName.startsWith("xs:") && types[tName]) {
      const g = gatherFrom(types[tName]);
      Object.assign(attrs, g.res);
      if (g.base) foundBase = foundBase || g.base;
    }
  }
  return { attributes: attrs, base: foundBase };
}

export async function resolveSchemas(
  entryUrl = ENTRY_URL,
): Promise<XmlSchema[]> {
  const visited = await collectSchemas(entryUrl);
  const { elements, types } = buildMaps(visited);

  const usedComplexTypes = new Set<any>();

  const out = new Map<string, XmlSchema>();

  function collectFromComplexTypeInternal(ct: any, elementName?: string) {
    usedComplexTypes.add(ct);
    collectFromComplexType(ct, types, out, elementName);
  }

  // add global elements
  for (const el of elements) {
    const rawName = getAttr(el, "name");
    const name = localName(rawName);
    if (!name) continue;

    const attrRes = extractAttributesAndBaseFromElement(el, types);
    const schema: XmlSchema = {
      tagName: name,
      description: extractDocumentation(el),
      attributes: attrRes.attributes,
    };
    if (attrRes.base) {
      schema.base = attrRes.base;
      usedComplexTypes.add(types[attrRes.base]);
    }
    out.set(name, schema);
    // if element references a type, traverse to find nested elements
    const typeName = getAttr(el, "type");
    if (typeName) {
      const tName = String(typeName).split(":").pop() as string;
      if (tName && !tName.startsWith("xs:") && types[tName]) {
        collectFromComplexTypeInternal(types[tName]);
      }
    }
    if (el.complexType) {
      collectFromComplexTypeInternal(el.complexType);
    }
  }

  // also include elements discovered as children
  // collect top-level complexTypes as internal schemas when they are not exposed as global elements
  for (const [typeName, ct] of Object.entries(types)) {
    if (!usedComplexTypes.has(ct)) continue;
    if (out.has(typeName)) continue;
    out.set(typeName, {
      tagName: typeName,
      description: extractDocumentation(ct),
      attributes: {},
      internal: true,
    });
    // populate attributes and nested elements for this type
    collectFromComplexTypeInternal(ct, typeName);
  }

  const result = Array.from(out.values()).sort((a, b) =>
    a.tagName.localeCompare(b.tagName),
  );
  return result;
}
