import * as t from "@babel/types";
import { addNamed } from "@babel/helper-module-imports";

export const reservedNameSpaces = new Set([
  "class",
  "on",
  "oncapture",
  "style",
  "use",
  "prop",
  "attr"
]);

export const nonSpreadNameSpaces = new Set(["class", "style", "use", "prop", "attr"]);

export function getConfig(path) {
  return path.hub.file.metadata.config;
}

export const getRendererConfig = (path, renderer) => {
  const config = getConfig(path);
  return config?.renderers?.find(r => r.name === renderer) ?? config;
};

export function registerImportMethod(path, name, moduleName) {
  const imports =
    path.scope.getProgramParent().data.imports ||
    (path.scope.getProgramParent().data.imports = new Map());
  moduleName = moduleName || getConfig(path).moduleName;
  if (!imports.has(`${moduleName}:${name}`)) {
    let id = addNamed(path, name, moduleName, {
      nameHint: `_$${name}`
    });
    imports.set(`${moduleName}:${name}`, id);
    return id;
  } else {
    let iden = imports.get(`${moduleName}:${name}`);
    // the cloning is required to play well with babel-preset-env which is
    // transpiling import as we add them and using the same identifier causes
    // problems with the multiple identifiers of the same thing
    return t.cloneNode(iden);
  }
}

function jsxElementNameToString(node) {
  if (t.isJSXMemberExpression(node)) {
    return `${jsxElementNameToString(node.object)}.${node.property.name}`;
  }
  if (t.isJSXIdentifier(node) || t.isIdentifier(node)) {
    return node.name;
  }
  return `${node.namespace.name}:${node.name.name}`;
}

export function tagNameToIdentifier(name) {
  const parts = name.split(".");
  if (parts.length === 1) return t.identifier(name);
  let part;
  let base = t.identifier(parts.shift());
  while ((part = parts.shift())) {
    base = t.memberExpression(base, t.identifier(part));
  }
  return base;
}

export function getTagName(tag) {
  const jsxName = tag.openingElement.name;
  return jsxElementNameToString(jsxName);
}

export function isComponent(tagName) {
  return (
    (tagName[0] && tagName[0].toLowerCase() !== tagName[0]) ||
    tagName.includes(".") ||
    /[^a-zA-Z]/.test(tagName[0])
  );
}

export function isDynamic(path, { checkMember, checkTags, checkCallExpressions = true, native }) {
  const config = getConfig(path);
  if (config.generate === "ssr" && native) {
    checkMember = false;
    checkCallExpressions = false;
  }
  const expr = path.node;
  if (t.isFunction(expr)) return false;
  if (
    expr.leadingComments &&
    expr.leadingComments[0] &&
    expr.leadingComments[0].value.trim() === config.staticMarker
  ) {
    expr.leadingComments.shift();
    return false;
  }

  if (
    checkCallExpressions &&
    (t.isCallExpression(expr) || t.isOptionalCallExpression(expr))
  ) {
    return true;
  }

  if (checkMember && t.isMemberExpression(expr)) {
    // Do not assume property access on namespaced imports as dynamic.
    const object = path.get("object").node;

    if (
      t.isIdentifier(object) &&
      (!expr.computed ||
        !isDynamic(path.get("property"), {
          checkMember,
          checkTags,
          checkCallExpressions,
          native,
        }))
    ) {
      const binding = path.scope.getBinding(object.name);

      if (binding && binding.path.isImportNamespaceSpecifier()) {
        return false;
      }
    }

    return true;
  }

  if (
    checkMember &&
    (t.isOptionalMemberExpression(expr) ||
      t.isSpreadElement(expr) ||
      (t.isBinaryExpression(expr) && expr.operator === "in"))
  ) {
    return true;
  }

  if (checkTags && (t.isJSXElement(expr) || (t.isJSXFragment(expr) && expr.children.length))) {
    return true;
  }

  let dynamic;
  path.traverse({
    Function(p) {
      if (t.isObjectMethod(p.node) && p.node.computed) {
        dynamic = isDynamic(p.get("key"), { checkMember, checkTags, checkCallExpressions, native });
      }
      p.skip();
    },
    CallExpression(p) {
      checkCallExpressions && (dynamic = true) && p.stop();
    },
    OptionalCallExpression(p) {
      checkCallExpressions && (dynamic = true) && p.stop();
    },
    MemberExpression(p) {
      checkMember && (dynamic = true) && p.stop();
    },
    OptionalMemberExpression(p) {
      checkMember && (dynamic = true) && p.stop();
    },
    SpreadElement(p) {
      checkMember && (dynamic = true) && p.stop();
    },
    BinaryExpression(p) {
      checkMember && p.node.operator === "in" && (dynamic = true) && p.stop();
    },
    JSXElement(p) {
      checkTags ? (dynamic = true) && p.stop() : p.skip();
    },
    JSXFragment(p) {
      checkTags && p.node.children.length ? (dynamic = true) && p.stop() : p.skip();
    }
  });
  return dynamic;
}

export function getStaticExpression(path) {
  const node = path.node;
  let value, type;
  return (
    t.isJSXExpressionContainer(node) &&
    t.isJSXElement(path.parent) &&
    !isComponent(getTagName(path.parent)) &&
    !t.isSequenceExpression(node.expression) &&
    (value = path.get("expression").evaluate().value) !== undefined &&
    ((type = typeof value) === "string" || type === "number") &&
    value
  );
}

// remove unnecessary JSX Text nodes
export function filterChildren(children, preserve = false) {
  if (preserve) return children;

  return children.filter(
    ({ node: child }) =>
      !(t.isJSXExpressionContainer(child) && t.isJSXEmptyExpression(child.expression)) &&
      (!t.isJSXText(child) || !/^[\r\n]\s*$/.test(child.extra.raw))
  );
}

export function checkLength(children) {
  let i = 0;
  children.forEach(path => {
    const child = path.node;
    !(t.isJSXExpressionContainer(child) && t.isJSXEmptyExpression(child.expression)) &&
      (!t.isJSXText(child) || !/^\s*$/.test(child.extra.raw) || /^ *$/.test(child.extra.raw)) &&
      i++;
  });
  return i > 1;
}

export function trimWhitespace(text, preserve = false) {
  if (preserve) return text;
  text = text.replace(/\r/g, "");
  if (/\n/g.test(text)) {
    text = text
      .split("\n")
      .map((t, i) => (i ? t.replace(/^\s*/g, "") : t))
      .filter(s => !/^\s*$/.test(s))
      .join(" ");
  }
  return text.replace(/\s+/g, " ");
}

export function toEventName(name) {
  return name.slice(2).toLowerCase();
}

export function toAttributeName(name) {
  return name.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`);
}

export function toPropertyName(name) {
  return name.toLowerCase().replace(/-([a-z])/g, (_, w) => w.toUpperCase());
}

export function wrappedByText(list, startIndex) {
  let index = startIndex,
    wrapped;
  while (--index >= 0) {
    const node = list[index];
    if (!node) continue;
    if (node.text) {
      wrapped = true;
      break;
    }
    if (node.id) return false;
  }
  if (!wrapped) return false;
  index = startIndex;
  while (++index < list.length) {
    const node = list[index];
    if (!node) continue;
    if (node.text) return true;
    if (node.id) return false;
  }
  return false;
}

const MAX_EXPR_NAME_LEN = 50;

/**
 * Generate a short human-readable description from an AST expression node,
 * used to name memoized expressions for debug tracing.
 */
export function describeExpression(node, depth = 0) {
  if (depth > 4) return "…";
  if (t.isIdentifier(node)) return node.name;
  if (t.isMemberExpression(node) || t.isOptionalMemberExpression(node)) {
    const obj = describeExpression(node.object, depth + 1);
    if (!obj) return null;
    if (node.computed) {
      const prop = t.isIdentifier(node.property) ? node.property.name :
        t.isStringLiteral(node.property) ? node.property.value :
        t.isNumericLiteral(node.property) ? String(node.property.value) : "…";
      return truncName(`${obj}[${prop}]`);
    }
    return truncName(`${obj}.${node.property.name || "?"}`);
  }
  if (t.isCallExpression(node) || t.isOptionalCallExpression(node)) {
    const callee = describeExpression(node.callee, depth + 1);
    return callee ? truncName(`${callee}(…)`) : null;
  }
  if (t.isConditionalExpression(node)) {
    const test = describeExpression(node.test, depth + 1);
    return test ? truncName(`${test} ? …`) : null;
  }
  if (t.isLogicalExpression(node)) {
    const left = describeExpression(node.left, depth + 1);
    return left ? truncName(`${left} ${node.operator} …`) : null;
  }
  if (t.isTemplateLiteral(node)) return "template";
  if (t.isArrowFunctionExpression(node) || t.isFunctionExpression(node)) {
    // Try to describe the body
    const body = t.isBlockStatement(node.body) ? null : describeExpression(node.body, depth + 1);
    return body ? truncName(`() => ${body}`) : null;
  }
  return null;
}

function truncName(s) {
  return s != null && s.length > MAX_EXPR_NAME_LEN ? s.slice(0, MAX_EXPR_NAME_LEN - 1) + "…" : s;
}

export function transformCondition(path, inline, deep) {
  const config = getConfig(path);
  const expr = path.node;
  const memo = registerImportMethod(path, config.memoWrapper);
  let dTest, cond, id;
  if (
    t.isConditionalExpression(expr) &&
    (isDynamic(path.get("consequent"), {
      checkTags: true
    }) ||
      isDynamic(path.get("alternate"), { checkTags: true }))
  ) {
    dTest = isDynamic(path.get("test"), { checkMember: true });
    if (dTest) {
      cond = expr.test;
      if (!t.isBinaryExpression(cond))
        cond = t.unaryExpression("!", t.unaryExpression("!", cond, true), true);
      if (inline) {
        // Inline: create and immediately invoke the condition memo as a boolean
        // gate. This prevents the outer memo/getter from re-running when the
        // signal changes between truthy values (e.g. 1→2), avoiding unnecessary
        // component recreation.
        id = t.callExpression(memo, [t.arrowFunctionExpression([], cond)]);
        expr.test = t.callExpression(id, []);
      } else {
        id = path.scope.generateUidIdentifier("_c$");
        expr.test = t.callExpression(id, []);
      }
      if (t.isConditionalExpression(expr.consequent) || t.isLogicalExpression(expr.consequent)) {
        expr.consequent = transformCondition(path.get("consequent"), inline, true);
      }
      if (t.isConditionalExpression(expr.alternate) || t.isLogicalExpression(expr.alternate)) {
        expr.alternate = transformCondition(path.get("alternate"), inline, true);
      }
    }
  } else if (t.isLogicalExpression(expr)) {
    let nextPath = path;
    // handle top-level or, ie cond && <A/> || <B/>
    while (nextPath.node.operator !== "&&" && t.isLogicalExpression(nextPath.node.left)) {
      nextPath = nextPath.get("left");
    }
    nextPath.node.operator === "&&" &&
      isDynamic(nextPath.get("right"), { checkTags: true }) &&
      (dTest = isDynamic(nextPath.get("left"), {
        checkMember: true
      }));
    // Same boolean gate optimization for logical expressions.
    if (dTest) {
      cond = nextPath.node.left;
      if (!t.isBinaryExpression(cond))
        cond = t.unaryExpression("!", t.unaryExpression("!", cond, true), true);
      if (inline) {
        id = t.callExpression(memo, [t.arrowFunctionExpression([], cond)]);
        nextPath.node.left = t.callExpression(id, []);
      } else {
        id = path.scope.generateUidIdentifier("_c$");
        nextPath.node.left = t.callExpression(id, []);
      }
    }
  }
  if (dTest && !inline) {
    const statements = [
      t.variableDeclaration("var", [
        t.variableDeclarator(
          id,
          config.memoWrapper
            ? t.callExpression(memo, [t.arrowFunctionExpression([], cond)])
            : t.arrowFunctionExpression([], cond)
        )
      ]),
      t.arrowFunctionExpression([], expr)
    ];
    return deep
      ? t.callExpression(
          t.arrowFunctionExpression(
            [],
            t.blockStatement([statements[0], t.returnStatement(statements[1])])
          ),
          []
        )
      : statements;
  }
  return deep ? expr : t.arrowFunctionExpression([], expr);
}

export function escapeHTML(s, attr) {
  if (typeof s !== "string") return s;
  const delim = attr ? '"' : "<";
  const escDelim = attr ? "&quot;" : "&lt;";
  let iDelim = s.indexOf(delim);
  let iAmp = s.indexOf("&");

  if (iDelim < 0 && iAmp < 0) return s;

  let left = 0,
    out = "";

  while (iDelim >= 0 && iAmp >= 0) {
    if (iDelim < iAmp) {
      if (left < iDelim) out += s.substring(left, iDelim);
      out += escDelim;
      left = iDelim + 1;
      iDelim = s.indexOf(delim, left);
    } else {
      if (left < iAmp) out += s.substring(left, iAmp);
      out += "&amp;";
      left = iAmp + 1;
      iAmp = s.indexOf("&", left);
    }
  }

  if (iDelim >= 0) {
    do {
      if (left < iDelim) out += s.substring(left, iDelim);
      out += escDelim;
      left = iDelim + 1;
      iDelim = s.indexOf(delim, left);
    } while (iDelim >= 0);
  } else {
    while (iAmp >= 0) {
      if (left < iAmp) out += s.substring(left, iAmp);
      out += "&amp;";
      left = iAmp + 1;
      iAmp = s.indexOf("&", left);
    }
  }

  return left < s.length ? out + s.substring(left) : out;
}

export function convertJSXIdentifier(node) {
  if (t.isJSXIdentifier(node)) {
    if (t.isValidIdentifier(node.name)) {
      node.type = "Identifier";
    } else {
      return t.stringLiteral(node.name);
    }
  } else if (t.isJSXMemberExpression(node)) {
    return t.memberExpression(
      convertJSXIdentifier(node.object),
      convertJSXIdentifier(node.property)
    );
  } else if (t.isJSXNamespacedName(node)) {
    return t.stringLiteral(`${node.namespace.name}:${node.name.name}`);
  }

  return node;
}

export function canNativeSpread(key, { checkNameSpaces } = {}) {
  if (checkNameSpaces && key.includes(":") && nonSpreadNameSpaces.has(key.split(":")[0]))
    return false;
  // TODO: figure out how to detect definitely function ref
  if (key === "ref") return false;
  return true;
}

const chars = "etaoinshrdlucwmfygpbTAOISWCBvkxjqzPHFMDRELNGUKVYJQZX_$";
const base = chars.length;

export function getNumberedId(num) {
  let out = "";

  do {
    const digit = num % base;

    num = Math.floor(num / base);
    out = chars[digit] + out;
  } while (num !== 0);

  return out;
}

export function escapeStringForTemplate(str) {
	return str.replace(/[{\\`\n\t\b\f\v\r\u2028\u2029]/g, ch => templateEscapes.get(ch))
}

const templateEscapes = new Map([
	['{', '\\{'],
	['`', '\\`'],
	['\\', '\\\\'],
	['\n', '\\n'],
	['\t', '\\t'],
	['\b', '\\b'],
	['\f', '\\f'],
	['\v', '\\v'],
	['\r', '\\r'],
	['\u2028', '\\u2028'],
	['\u2029', '\\u2029']
])
