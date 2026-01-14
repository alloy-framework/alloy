'use strict';

var SyntaxJSX = require('@babel/plugin-syntax-jsx');
var t = require('@babel/types');
var helperModuleImports = require('@babel/helper-module-imports');
var htmlEntities = require('html-entities');

function _interopNamespaceDefault(e) {
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var t__namespace = /*#__PURE__*/_interopNamespaceDefault(t);

const booleans = [
  "allowfullscreen",
  "async",
  "autofocus",
  "autoplay",
  "checked",
  "controls",
  "default",
  "disabled",
  "formnovalidate",
  "hidden",
  "indeterminate",
  "inert",
  "ismap",
  "loop",
  "multiple",
  "muted",
  "nomodule",
  "novalidate",
  "open",
  "playsinline",
  "readonly",
  "required",
  "reversed",
  "seamless",
  "selected"
];

const Properties = /*#__PURE__*/ new Set([
  "className",
  "value",
  "readOnly",
  "formNoValidate",
  "isMap",
  "noModule",
  "playsInline",
  ...booleans
]);

const ChildProperties = /*#__PURE__*/ new Set([
  "innerHTML",
  "textContent",
  "innerText",
  "children"
]);

// React Compat
const Aliases = /*#__PURE__*/ Object.assign(Object.create(null), {
  className: "class",
  htmlFor: "for"
});

const PropAliases = /*#__PURE__*/ Object.assign(Object.create(null), {
  class: "className",
  formnovalidate: {
    $: "formNoValidate",
    BUTTON: 1,
    INPUT: 1
  },
  ismap: {
    $: "isMap",
    IMG: 1
  },
  nomodule: {
    $: "noModule",
    SCRIPT: 1
  },
  playsinline: {
    $: "playsInline",
    VIDEO: 1
  },
  readonly: {
    $: "readOnly",
    INPUT: 1,
    TEXTAREA: 1
  }
});

function getPropAlias(prop, tagName) {
  const a = PropAliases[prop];
  return typeof a === "object" ? (a[tagName] ? a["$"] : undefined) : a;
}

const SVGNamespace = {
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace"
};

const reservedNameSpaces = new Set([
  "class",
  "on",
  "oncapture",
  "style",
  "use",
  "prop",
  "attr"
]);

function getConfig(path) {
  return path.hub.file.metadata.config;
}

const getRendererConfig = (path, renderer) => {
  const config = getConfig(path);
  return config?.renderers?.find(r => r.name === renderer) ?? config;
};

function registerImportMethod(path, name, moduleName) {
  const imports =
    path.scope.getProgramParent().data.imports ||
    (path.scope.getProgramParent().data.imports = new Map());
  moduleName = moduleName || getConfig(path).moduleName;
  if (!imports.has(`${moduleName}:${name}`)) {
    let id = helperModuleImports.addNamed(path, name, moduleName, {
      nameHint: `_$${name}`
    });
    imports.set(`${moduleName}:${name}`, id);
    return id;
  } else {
    let iden = imports.get(`${moduleName}:${name}`);
    // the cloning is required to play well with babel-preset-env which is
    // transpiling import as we add them and using the same identifier causes
    // problems with the multiple identifiers of the same thing
    return t__namespace.cloneNode(iden);
  }
}

function jsxElementNameToString(node) {
  if (t__namespace.isJSXMemberExpression(node)) {
    return `${jsxElementNameToString(node.object)}.${node.property.name}`;
  }
  if (t__namespace.isJSXIdentifier(node) || t__namespace.isIdentifier(node)) {
    return node.name;
  }
  return `${node.namespace.name}:${node.name.name}`;
}

function getTagName(tag) {
  const jsxName = tag.openingElement.name;
  return jsxElementNameToString(jsxName);
}

function isComponent(tagName) {
  return (
    (tagName[0] && tagName[0].toLowerCase() !== tagName[0]) ||
    tagName.includes(".") ||
    /[^a-zA-Z]/.test(tagName[0])
  );
}

function isDynamic(path, { checkMember, checkTags, checkCallExpressions = true, native }) {
  const config = getConfig(path);
  if (config.generate === "ssr" && native) {
    checkMember = false;
    checkCallExpressions = false;
  }
  const expr = path.node;
  if (t__namespace.isFunction(expr)) return false;
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
    (t__namespace.isCallExpression(expr) || t__namespace.isOptionalCallExpression(expr))
  ) {
    return true;
  }

  if (checkMember && t__namespace.isMemberExpression(expr)) {
    // Do not assume property access on namespaced imports as dynamic.
    const object = path.get("object").node;

    if (
      t__namespace.isIdentifier(object) &&
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
    (t__namespace.isOptionalMemberExpression(expr) ||
      t__namespace.isSpreadElement(expr) ||
      (t__namespace.isBinaryExpression(expr) && expr.operator === "in"))
  ) {
    return true;
  }

  if (checkTags && (t__namespace.isJSXElement(expr) || (t__namespace.isJSXFragment(expr) && expr.children.length))) {
    return true;
  }

  let dynamic;
  path.traverse({
    Function(p) {
      if (t__namespace.isObjectMethod(p.node) && p.node.computed) {
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

// remove unnecessary JSX Text nodes
function filterChildren(children, preserve = false) {
  if (preserve) return children;

  return children.filter(
    ({ node: child }) =>
      !(t__namespace.isJSXExpressionContainer(child) && t__namespace.isJSXEmptyExpression(child.expression)) &&
      (!t__namespace.isJSXText(child) || !/^[\r\n]\s*$/.test(child.extra.raw))
  );
}

function trimWhitespace(text, preserve = false) {
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

function toPropertyName(name) {
  return name.toLowerCase().replace(/-([a-z])/g, (_, w) => w.toUpperCase());
}

function transformCondition(path, inline, deep) {
  const config = getConfig(path);
  const expr = path.node;
  const memo = registerImportMethod(path, config.memoWrapper);
  let dTest, cond, id;
  if (
    t__namespace.isConditionalExpression(expr) &&
    (isDynamic(path.get("consequent"), {
      checkTags: true
    }) ||
      isDynamic(path.get("alternate"), { checkTags: true }))
  ) {
    dTest = isDynamic(path.get("test"), { checkMember: true });
    if (dTest) {
      cond = expr.test;
      if (!t__namespace.isBinaryExpression(cond))
        cond = t__namespace.unaryExpression("!", t__namespace.unaryExpression("!", cond, true), true);
      id = inline
        ? t__namespace.callExpression(memo, [t__namespace.arrowFunctionExpression([], cond)])
        : path.scope.generateUidIdentifier("_c$");
      expr.test = t__namespace.callExpression(id, []);
      if (t__namespace.isConditionalExpression(expr.consequent) || t__namespace.isLogicalExpression(expr.consequent)) {
        expr.consequent = transformCondition(path.get("consequent"), inline, true);
      }
      if (t__namespace.isConditionalExpression(expr.alternate) || t__namespace.isLogicalExpression(expr.alternate)) {
        expr.alternate = transformCondition(path.get("alternate"), inline, true);
      }
    }
  } else if (t__namespace.isLogicalExpression(expr)) {
    let nextPath = path;
    // handle top-level or, ie cond && <A/> || <B/>
    while (nextPath.node.operator !== "&&" && t__namespace.isLogicalExpression(nextPath.node.left)) {
      nextPath = nextPath.get("left");
    }
    nextPath.node.operator === "&&" &&
      isDynamic(nextPath.get("right"), { checkTags: true }) &&
      (dTest = isDynamic(nextPath.get("left"), {
        checkMember: true
      }));
    if (dTest) {
      cond = nextPath.node.left;
      if (!t__namespace.isBinaryExpression(cond))
        cond = t__namespace.unaryExpression("!", t__namespace.unaryExpression("!", cond, true), true);
      id = inline
        ? t__namespace.callExpression(memo, [t__namespace.arrowFunctionExpression([], cond)])
        : path.scope.generateUidIdentifier("_c$");
      nextPath.node.left = t__namespace.callExpression(id, []);
    }
  }
  if (dTest && !inline) {
    const statements = [
      t__namespace.variableDeclaration("var", [
        t__namespace.variableDeclarator(
          id,
          config.memoWrapper
            ? t__namespace.callExpression(memo, [t__namespace.arrowFunctionExpression([], cond)])
            : t__namespace.arrowFunctionExpression([], cond)
        )
      ]),
      t__namespace.arrowFunctionExpression([], expr)
    ];
    return deep
      ? t__namespace.callExpression(
          t__namespace.arrowFunctionExpression(
            [],
            t__namespace.blockStatement([statements[0], t__namespace.returnStatement(statements[1])])
          ),
          []
        )
      : statements;
  }
  return deep ? expr : t__namespace.arrowFunctionExpression([], expr);
}

function convertJSXIdentifier(node) {
  if (t__namespace.isJSXIdentifier(node)) {
    if (t__namespace.isValidIdentifier(node.name)) {
      node.type = "Identifier";
    } else {
      return t__namespace.stringLiteral(node.name);
    }
  } else if (t__namespace.isJSXMemberExpression(node)) {
    return t__namespace.memberExpression(
      convertJSXIdentifier(node.object),
      convertJSXIdentifier(node.property)
    );
  } else if (t__namespace.isJSXNamespacedName(node)) {
    return t__namespace.stringLiteral(`${node.namespace.name}:${node.name.name}`);
  }

  return node;
}

const chars = "etaoinshrdlucwmfygpbTAOISWCBvkxjqzPHFMDRELNGUKVYJQZX_$";
const base = chars.length;

function getNumberedId(num) {
  let out = "";

  do {
    const digit = num % base;

    num = Math.floor(num / base);
    out = chars[digit] + out;
  } while (num !== 0);

  return out;
}

function escapeStringForTemplate(str) {
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
]);

function setAttr$1(path, elem, name, value, { isSVG, dynamic, prevId, isCE, tagName }) {
  // pull out namespace
  const config = getConfig(path);
  let parts, namespace;
  if ((parts = name.split(":")) && parts[1] && reservedNameSpaces.has(parts[0])) {
    name = parts[1];
    namespace = parts[0];
  }

  // TODO: consider moving to a helper
  if (namespace === "style") {
    if (t__namespace.isStringLiteral(value)) {
      return t__namespace.callExpression(
        t__namespace.memberExpression(
          t__namespace.memberExpression(elem, t__namespace.identifier("style")),
          t__namespace.identifier("setProperty")
        ),
        [t__namespace.stringLiteral(name), value]
      );
    }
    if (t__namespace.isNullLiteral(value) || t__namespace.isIdentifier(value, { name: "undefined" })) {
      return t__namespace.callExpression(
        t__namespace.memberExpression(
          t__namespace.memberExpression(elem, t__namespace.identifier("style")),
          t__namespace.identifier("removeProperty")
        ),
        [t__namespace.stringLiteral(name)]
      );
    }
    return t__namespace.conditionalExpression(
      t__namespace.binaryExpression("!=", value, t__namespace.nullLiteral()),
      t__namespace.callExpression(
        t__namespace.memberExpression(
          t__namespace.memberExpression(elem, t__namespace.identifier("style")),
          t__namespace.identifier("setProperty")
        ),
        [t__namespace.stringLiteral(name), prevId ? prevId : value]
      ),
      t__namespace.callExpression(
        t__namespace.memberExpression(
          t__namespace.memberExpression(elem, t__namespace.identifier("style")),
          t__namespace.identifier("removeProperty")
        ),
        [t__namespace.stringLiteral(name)]
      )
    );
  }

  if (namespace === "class") {
    return t__namespace.callExpression(
      t__namespace.memberExpression(
        t__namespace.memberExpression(elem, t__namespace.identifier("classList")),
        t__namespace.identifier("toggle")
      ),
      [
        t__namespace.stringLiteral(name),
        value 
      ]
    );
  }

  if (name === "style") {
    return t__namespace.callExpression(
      registerImportMethod(path, "style", getRendererConfig(path, "dom").moduleName),
      prevId ? [elem, value, prevId] : [elem, value]
    );
  }

  if (!isSVG && name === "class") {
    return t__namespace.callExpression(
      registerImportMethod(path, "className", getRendererConfig(path, "dom").moduleName),
      [elem, value]
    );
  }

  if (name === "classList") {
    return t__namespace.callExpression(
      registerImportMethod(path, "classList", getRendererConfig(path, "dom").moduleName),
      prevId ? [elem, value, prevId] : [elem, value]
    );
  }

  if (name === "textContent") {
    if (config.hydratable) {
      return t__namespace.callExpression(registerImportMethod(path, "setProperty"), [elem, t__namespace.stringLiteral("data"), value]);
    }
    return t__namespace.assignmentExpression("=", t__namespace.memberExpression(elem, t__namespace.identifier("data")), value);
  }

  const isChildProp = ChildProperties.has(name);
  const isProp = Properties.has(name);
  const alias = getPropAlias(name, tagName.toUpperCase());
  if (namespace !== "attr" && (isChildProp || (!isSVG && isProp) || isCE || namespace === "prop")) {
    if (isCE && !isChildProp && !isProp && namespace !== "prop") name = toPropertyName(name);
    if (config.hydratable && namespace !== "prop") {
      return t__namespace.callExpression(registerImportMethod(path, "setProperty"), [elem, t__namespace.stringLiteral(name), value]);
    }
    return t__namespace.assignmentExpression(
      "=",
      t__namespace.memberExpression(elem, t__namespace.identifier(alias || name)),
      value
    );
  }

  let isNameSpaced = name.indexOf(":") > -1;
  name = Aliases[name] || name;
  !isSVG && (name = name.toLowerCase());
  const ns = isNameSpaced && SVGNamespace[name.split(":")[0]];
  if (ns) {
    return t__namespace.callExpression(
      registerImportMethod(path, "setAttributeNS", getRendererConfig(path, "dom").moduleName),
      [elem, t__namespace.stringLiteral(ns), t__namespace.stringLiteral(name), value]
    );
  } else {
    return t__namespace.callExpression(
      registerImportMethod(path, "setAttribute", getRendererConfig(path, "dom").moduleName),
      [elem, t__namespace.stringLiteral(name), value]
    );
  }
}

function createTemplate$2(path, result, wrap) {
  const config = getConfig(path);
  if (result.id) {
    registerTemplate(path, result);
    if (
      !(result.exprs.length || result.dynamics.length || result.postExprs.length) &&
      result.decl.declarations.length === 1
    ) {
      return result.decl.declarations[0].init;
    } else {
      return t__namespace.callExpression(
        t__namespace.arrowFunctionExpression(
          [],
          t__namespace.blockStatement([
            result.decl,
            ...result.exprs.concat(
              wrapDynamics$1(path, result.dynamics) || [],
              result.postExprs || []
            ),
            t__namespace.returnStatement(result.id)
          ])
        ),
        []
      );
    }
  }
  if (wrap && result.dynamic && config.memoWrapper) {
    return t__namespace.callExpression(registerImportMethod(path, config.memoWrapper), [result.exprs[0]]);
  }
  return result.exprs[0];
}

function appendTemplates$1(path, templates) {
  const declarators = templates.map(template => {
    const tmpl = {
      cooked: template.template,
      raw: escapeStringForTemplate(template.template)
    };
    return t__namespace.variableDeclarator(
      template.id,
      t__namespace.addComment(
        t__namespace.callExpression(
          registerImportMethod(path, "template", getRendererConfig(path, "dom").moduleName),
          [t__namespace.templateLiteral([t__namespace.templateElement(tmpl, true)], [])].concat(
            template.isSVG || template.isCE
              ? [t__namespace.booleanLiteral(template.isCE), t__namespace.booleanLiteral(template.isSVG)]
              : []
          )
        ),
        "leading",
        "#__PURE__"
      )
    );
  });
  path.node.body.unshift(t__namespace.variableDeclaration("var", declarators));
}

function registerTemplate(path, results) {
  const { hydratable } = getConfig(path);
  let decl;
  if (results.template.length) {
    let templateDef, templateId;
    if (!results.skipTemplate) {
      const templates =
        path.scope.getProgramParent().data.templates ||
        (path.scope.getProgramParent().data.templates = []);
      if ((templateDef = templates.find(t => t.template === results.template))) {
        templateId = templateDef.id;
      } else {
        templateId = path.scope.generateUidIdentifier("tmpl$");
        templates.push({
          id: templateId,
          template: results.template,
          isSVG: results.isSVG,
          isCE: results.hasCustomElement,
          renderer: "dom"
        });
      }
    }
    decl = t__namespace.variableDeclarator(
      results.id,
      hydratable
        ? t__namespace.callExpression(
            registerImportMethod(path, "getNextElement", getRendererConfig(path, "dom").moduleName),
            templateId ? [templateId] : []
          )
        : t__namespace.callExpression(templateId, [])
    );
  }
  results.declarations.unshift(decl);
  results.decl = t__namespace.variableDeclaration("var", results.declarations);
}

function wrapDynamics$1(path, dynamics) {
  if (!dynamics.length) return;
  const config = getConfig(path);

  const effectWrapperId = registerImportMethod(path, config.effectWrapper);

  if (dynamics.length === 1) {
    let dynamicStyle;
    const prevValue =
      dynamics[0].key === "classList" ||
      dynamics[0].key === "style" ||
      (dynamicStyle = dynamics[0].key.startsWith("style:"))
        ? t__namespace.identifier("_$p")
        : undefined;
    if (dynamicStyle) {
      dynamics[0].value = t__namespace.assignmentExpression("=", prevValue, dynamics[0].value);
    } else if (
      dynamics[0].key.startsWith("class:") &&
      !t__namespace.isBooleanLiteral(dynamics[0].value) &&
      !t__namespace.isUnaryExpression(dynamics[0].value)
    ) {
      dynamics[0].value = t__namespace.unaryExpression("!", t__namespace.unaryExpression("!", dynamics[0].value));
    }

    return t__namespace.expressionStatement(
      t__namespace.callExpression(effectWrapperId, [
        t__namespace.arrowFunctionExpression(
          prevValue ? [prevValue] : [],
          setAttr$1(path, dynamics[0].elem, dynamics[0].key, dynamics[0].value, {
            isSVG: dynamics[0].isSVG,
            isCE: dynamics[0].isCE,
            tagName: dynamics[0].tagName,
            dynamic: true,
            prevId: prevValue
          })
        )
      ])
    );
  }

  const prevId = t__namespace.identifier("_p$");

  /** @type {t.VariableDeclarator[]} */
  const declarations = [];
  /** @type {t.ExpressionStatement[]} */
  const statements = [];
  /** @type {t.Identifier[]} */
  const properties = [];

  dynamics.forEach(({ elem, key, value, isSVG, isCE, tagName }, index) => {
    const varIdent = path.scope.generateUidIdentifier("v$");

    const propIdent = t__namespace.identifier(getNumberedId(index));
    const propMember = t__namespace.memberExpression(prevId, propIdent);

    if (
      key.startsWith("class:") &&
      !t__namespace.isBooleanLiteral(value) &&
      !t__namespace.isUnaryExpression(value)
    ) {
      value = t__namespace.unaryExpression("!", t__namespace.unaryExpression("!", value));
    }

    properties.push(propIdent);
    declarations.push(t__namespace.variableDeclarator(varIdent, value));

    if (key === "classList" || key === "style") {
      statements.push(
        t__namespace.expressionStatement(
          t__namespace.assignmentExpression(
            "=",
            propMember,
            setAttr$1(path, elem, key, varIdent, {
              isSVG,
              isCE,
              tagName,
              dynamic: true,
              prevId: propMember,
            }),
          ),
        ),
      );
    } else {
      const prev = key.startsWith("style:") ? varIdent : undefined;
      statements.push(
        t__namespace.expressionStatement(
          t__namespace.logicalExpression(
            "&&",
            t__namespace.binaryExpression("!==", varIdent, propMember),
            setAttr$1(
              path,
              elem,
              key,
              t__namespace.assignmentExpression("=", propMember, varIdent),
              { isSVG, isCE, tagName, dynamic: true, prevId: prev },
            ),
          ),
        ),
      );
    }
  });

  return t__namespace.expressionStatement(
    t__namespace.callExpression(effectWrapperId, [
      t__namespace.arrowFunctionExpression(
        [prevId],
        t__namespace.blockStatement([
          t__namespace.variableDeclaration("var", declarations),
          ...statements,
          t__namespace.returnStatement(prevId),
        ]),
      ),
      t__namespace.objectExpression(
        properties.map((id) => t__namespace.objectProperty(id, t__namespace.identifier("undefined"))),
      ),
    ]),
  );
}

function createTemplate$1(path, result) {
  if (!result.template) {
    return result.exprs[0];
  }

  let template, id;

  if (!Array.isArray(result.template)) {
    template = t__namespace.stringLiteral(result.template);
  } else if (result.template.length === 1) {
    template = t__namespace.stringLiteral(result.template[0]);
  } else {
    const strings = result.template.map(tmpl => t__namespace.stringLiteral(tmpl));
    template = t__namespace.arrayExpression(strings);
  }

  const templates =
    path.scope.getProgramParent().data.templates ||
    (path.scope.getProgramParent().data.templates = []);
  const found = templates.find(tmp => {
    if (t__namespace.isArrayExpression(tmp.template) && t__namespace.isArrayExpression(template)) {
      return tmp.template.elements.every(
        (el, i) => template.elements[i] && el.value === template.elements[i].value
      );
    }
    return tmp.template.value === template.value;
  });
  if (!found) {
    id = path.scope.generateUidIdentifier("tmpl$");
    templates.push({
      id,
      template,
      renderer: "ssr"
    });
  } else id = found.id;

  if (result.wontEscape) {
    if (!Array.isArray(result.template) || result.template.length === 1) return id;
    else if (
      Array.isArray(result.template) &&
      result.template.length === 2 &&
      result.templateValues[0].type === "CallExpression" &&
      result.templateValues[0].callee.name === "_$ssrHydrationKey"
    ) {
      // remove unnecessary ssr call when only hydration key is used
      return t__namespace.binaryExpression(
        "+",
        t__namespace.binaryExpression(
          "+",
          t__namespace.memberExpression(id, t__namespace.numericLiteral(0), true),
          result.templateValues[0]
        ),
        t__namespace.memberExpression(id, t__namespace.numericLiteral(1), true)
      );
    }
  }
  return t__namespace.callExpression(
    registerImportMethod(path, "ssr"),
    Array.isArray(result.template) && result.template.length > 1
      ? [id, ...result.templateValues]
      : [id]
  );
}

function appendTemplates(path, templates) {
  const declarators = templates.map(template => {
    return t__namespace.variableDeclarator(template.id, template.template);
  });
  path.node.body.unshift(t__namespace.variableDeclaration("var", declarators));
}

function setAttr(path, elem, name, value, { prevId } = {}) {
  if (!value) value = t__namespace.booleanLiteral(true);
  return t__namespace.callExpression(
    registerImportMethod(path, "setProp", getRendererConfig(path, "universal").moduleName),
    prevId ? [elem, t__namespace.stringLiteral(name), value, prevId] : [elem, t__namespace.stringLiteral(name), value]
  );
}

function createTemplate(path, result, wrap) {
  const config = getConfig(path);
  if (result.id) {
    result.decl = t__namespace.variableDeclaration("var", result.declarations);
    if (
      !(result.exprs.length || result.dynamics.length || result.postExprs.length) &&
      result.decl.declarations.length === 1
    ) {
      return result.decl.declarations[0].init;
    } else {
      return t__namespace.callExpression(
        t__namespace.arrowFunctionExpression(
          [],
          t__namespace.blockStatement([
            result.decl,
            ...result.exprs.concat(
              wrapDynamics(path, result.dynamics) || [],
              result.postExprs || []
            ),
            t__namespace.returnStatement(result.id)
          ])
        ),
        []
      );
    }
  }
  if (wrap && result.dynamic && config.memoWrapper) {
    return t__namespace.callExpression(registerImportMethod(path, config.memoWrapper), [result.exprs[0]]);
  }
  return result.exprs[0];
}

function wrapDynamics(path, dynamics) {
  if (!dynamics.length) return;
  const config = getConfig(path);

  const effectWrapperId = registerImportMethod(path, config.effectWrapper);

  if (dynamics.length === 1) {
    const prevValue = t__namespace.identifier("_$p");

    return t__namespace.expressionStatement(
      t__namespace.callExpression(effectWrapperId, [
        t__namespace.arrowFunctionExpression(
          [prevValue],
          setAttr(path, dynamics[0].elem, dynamics[0].key, dynamics[0].value, {
            prevId: prevValue
          })
        )
      ])
    );
  }

  const prevId = t__namespace.identifier("_p$");

  /** @type {t.VariableDeclarator[]} */
  const declarations = [];
  /** @type {t.ExpressionStatement[]} */
  const statements = [];
  /** @type {t.Identifier[]} */
  const properties = [];

  dynamics.forEach(({ elem, key, value }, index) => {
    const varIdent = path.scope.generateUidIdentifier("v$");

    const propIdent = t__namespace.identifier(getNumberedId(index));
    const propMember = t__namespace.memberExpression(prevId, propIdent);

    properties.push(propIdent);
    declarations.push(t__namespace.variableDeclarator(varIdent, value));

    statements.push(
      t__namespace.expressionStatement(
        t__namespace.logicalExpression(
          "&&",
          t__namespace.binaryExpression("!==", varIdent, propMember),
          t__namespace.assignmentExpression(
            "=",
            propMember,
            setAttr(path, elem, key, varIdent, { prevId: propMember }),
          ),
        ),
      ),
    );
  });

  return t__namespace.expressionStatement(
    t__namespace.callExpression(effectWrapperId, [
      t__namespace.arrowFunctionExpression(
        [prevId],
        t__namespace.blockStatement([
          t__namespace.variableDeclaration("var", declarations),
          ...statements,
          t__namespace.returnStatement(prevId),
        ]),
      ),
      t__namespace.objectExpression(
        properties.map((id) => t__namespace.objectProperty(id, t__namespace.identifier("undefined"))),
      ),
    ]),
  );
}

function convertComponentIdentifier(node) {
  if (t__namespace.isJSXIdentifier(node)) {
    if (node.name === 'this') return t__namespace.thisExpression();
    if (t__namespace.isValidIdentifier(node.name)) node.type = "Identifier";
    else return t__namespace.stringLiteral(node.name);
  } else if (t__namespace.isJSXMemberExpression(node)) {
    const prop = convertComponentIdentifier(node.property);
    const computed = t__namespace.isStringLiteral(prop);
    return t__namespace.memberExpression(convertComponentIdentifier(node.object), prop, computed);
  }

  return node;
}

function transformComponent(path) {
  const node = path.node;
  let tagName = getTagName(node);
  const isComponentTag = isComponent(tagName);

  let exprs = [],
    config = getConfig(path),
    tagId = isComponentTag
      ? convertComponentIdentifier(path.node.openingElement.name)
      : t__namespace.stringLiteral(path.node.openingElement.name.name),
    props = [],
    runningObject = [],
    dynamicSpread = false,
    hasChildren = path.node.children.length > 0;

  
  
  

  if (config.builtIns.indexOf(tagId.name) > -1 && !path.scope.hasBinding(tagId.name)) {
    const newTagId = registerImportMethod(path, tagId.name);
    tagId.name = newTagId.name;
  }

  path
    .get("openingElement")
    .get("attributes")
    .forEach(attribute => {
      const node = attribute.node;
      if (t__namespace.isJSXSpreadAttribute(node)) {
        if (runningObject.length) {
          props.push(t__namespace.objectExpression(runningObject));
          runningObject = [];
        }
        props.push(
          isDynamic(attribute.get("argument"), {
            checkMember: true
          }) && (dynamicSpread = true)
            ? t__namespace.isCallExpression(node.argument) &&
              !node.argument.arguments.length &&
              !t__namespace.isCallExpression(node.argument.callee) &&
              !t__namespace.isMemberExpression(node.argument.callee)
              ? node.argument.callee
              : t__namespace.arrowFunctionExpression([], node.argument)
            : node.argument
        );
      } else {
        // handle weird babel bug around HTML entities
        const value = (t__namespace.isStringLiteral(node.value) ? t__namespace.stringLiteral(node.value.value): node.value) || t__namespace.booleanLiteral(true),
          id = convertJSXIdentifier(node.name),
          key = id.name;
        if (hasChildren && key === "children") return;
        if (t__namespace.isJSXExpressionContainer(value))
          if (key === "ref") {
            if (config.generate === "ssr") return;
            // Normalize expressions for non-null and type-as
            while (
              t__namespace.isTSNonNullExpression(value.expression) ||
              t__namespace.isTSAsExpression(value.expression) ||
              t__namespace.isTSSatisfiesExpression(value.expression)
            ) {
              value.expression = value.expression.expression;
            }
            let binding,
              isFunction =
                t__namespace.isIdentifier(value.expression) &&
                (binding = path.scope.getBinding(value.expression.name)) &&
                binding.kind === "const";
            if (!isFunction && t__namespace.isLVal(value.expression)) {
              const refIdentifier = path.scope.generateUidIdentifier("_ref$");
              runningObject.push(
                t__namespace.objectMethod(
                  "method",
                  t__namespace.identifier("ref"),
                  [t__namespace.identifier("r$")],
                  t__namespace.blockStatement([
                    t__namespace.variableDeclaration("var", [
                      t__namespace.variableDeclarator(refIdentifier, value.expression)
                    ]),
                    t__namespace.expressionStatement(
                      t__namespace.conditionalExpression(
                        t__namespace.binaryExpression(
                          "===",
                          t__namespace.unaryExpression("typeof", refIdentifier),
                          t__namespace.stringLiteral("function")
                        ),
                        t__namespace.callExpression(refIdentifier, [t__namespace.identifier("r$")]),
                        t__namespace.assignmentExpression("=", value.expression, t__namespace.identifier("r$"))
                      )
                    )
                  ])
                )
              );
            } else if (isFunction || t__namespace.isFunction(value.expression)) {
              runningObject.push(t__namespace.objectProperty(t__namespace.identifier("ref"), value.expression));
            } else if (t__namespace.isCallExpression(value.expression)) {
              const refIdentifier = path.scope.generateUidIdentifier("_ref$");
              runningObject.push(
                t__namespace.objectMethod(
                  "method",
                  t__namespace.identifier("ref"),
                  [t__namespace.identifier("r$")],
                  t__namespace.blockStatement([
                    t__namespace.variableDeclaration("var", [
                      t__namespace.variableDeclarator(refIdentifier, value.expression)
                    ]),
                    t__namespace.expressionStatement(
                      t__namespace.logicalExpression(
                        "&&",
                        t__namespace.binaryExpression(
                          "===",
                          t__namespace.unaryExpression("typeof", refIdentifier),
                          t__namespace.stringLiteral("function")
                        ),
                        t__namespace.callExpression(refIdentifier, [t__namespace.identifier("r$")])
                      )
                    )
                  ])
                )
              );
            }
          } else if (
            isDynamic(attribute.get("value").get("expression"), {
              checkMember: true,
              checkTags: true
            })
          ) {
            if (
              config.wrapConditionals &&
              config.generate !== "ssr" &&
              (t__namespace.isLogicalExpression(value.expression) ||
                t__namespace.isConditionalExpression(value.expression))
            ) {
              const expr = transformCondition(attribute.get("value").get("expression"), true);

              runningObject.push(
                t__namespace.objectMethod(
                  "get",
                  id,
                  [],
                  t__namespace.blockStatement([t__namespace.returnStatement(expr.body)]),
                  !t__namespace.isValidIdentifier(key)
                )
              );
            } else if (
              t__namespace.isCallExpression(value.expression) &&
              t__namespace.isArrowFunctionExpression(value.expression.callee)
            ) {
              const callee = value.expression.callee;
              const body = t__namespace.isBlockStatement(callee.body)
                ? callee.body
                : t__namespace.blockStatement([t__namespace.returnStatement(callee.body)]);

              runningObject.push(t__namespace.objectMethod("get", id, [], body, !t__namespace.isValidIdentifier(key)));
            } else {
              runningObject.push(
                t__namespace.objectMethod(
                  "get",
                  id,
                  [],
                  t__namespace.blockStatement([t__namespace.returnStatement(value.expression)]),
                  !t__namespace.isValidIdentifier(key)
                )
              );
            }
          } else runningObject.push(t__namespace.objectProperty(id, value.expression));
        else runningObject.push(t__namespace.objectProperty(id, value));
      }
    });

  const childResult = transformComponentChildren(path.get("children"), config);
  if (childResult && childResult[0]) {
    if (childResult[1]) {
      const body =
        t__namespace.isCallExpression(childResult[0]) && t__namespace.isFunction(childResult[0].arguments[0])
          ? childResult[0].arguments[0].body
          : childResult[0].body ? childResult[0].body : childResult[0];
      runningObject.push(
        t__namespace.objectMethod(
          "get",
          t__namespace.identifier("children"),
          [],
          t__namespace.isExpression(body) ? t__namespace.blockStatement([t__namespace.returnStatement(body)]) : body
        )
      );
    } else runningObject.push(t__namespace.objectProperty(t__namespace.identifier("children"), childResult[0]));
  }
  if (runningObject.length || !props.length) props.push(t__namespace.objectExpression(runningObject));

  if (props.length > 1 || dynamicSpread) {
    props = [t__namespace.callExpression(registerImportMethod(path, "mergeProps"), props)];
  }
  const componentArgs = [tagId, props[0]];
  
  // Add source location when enabled
  if (config.generate !== "ssr" && config.addSourceInfo) {
    const loc = path.node.loc;
    if (loc && loc.start) {
      const sourceInfo = t__namespace.objectExpression([
        t__namespace.objectProperty(t__namespace.identifier("fileName"), t__namespace.stringLiteral(path.hub.file.opts.filename || "unknown")),
        t__namespace.objectProperty(t__namespace.identifier("lineNumber"), t__namespace.numericLiteral(loc.start.line)),
        t__namespace.objectProperty(t__namespace.identifier("columnNumber"), t__namespace.numericLiteral(loc.start.column + 1))
      ]);
      componentArgs.push(sourceInfo);
    }
  }

  exprs.push(t__namespace.callExpression(registerImportMethod(path, isComponentTag ? "createComponent" : "createIntrinsic"), componentArgs));

  // handle hoisting conditionals
  if (exprs.length > 1) {
    const ret = exprs.pop();
    exprs = [
      t__namespace.callExpression(
        t__namespace.arrowFunctionExpression([], t__namespace.blockStatement([...exprs, t__namespace.returnStatement(ret)])),
        []
      )
    ];
  }
  return { exprs, template: "", component: true };
}

function transformComponentChildren(children, config) {
  const filteredChildren = filterChildren(children, config.preserveWhitespace);
  if (!filteredChildren.length) return;
  let dynamic = false;
  let pathNodes = [];

  let transformedChildren = filteredChildren.reduce((memo, path) => {
    if (t__namespace.isJSXText(path.node)) {
      const v = htmlEntities.decode(trimWhitespace(path.node.extra.raw, config.preserveWhitespace));
      if (v.length) {
        pathNodes.push(path.node);
        memo.push(t__namespace.stringLiteral(v));
      }
    } else {
      const child = transformNode(path, {
        componentChild: true});
      if (child) {
        dynamic = dynamic || child.dynamic;
        if (
          config.generate === "ssr" &&
          filteredChildren.length > 1 &&
          child.dynamic &&
          t__namespace.isFunction(child.exprs[0])
        ) {
          child.exprs[0] = child.exprs[0].body;
        }
        pathNodes.push(path.node);
        memo.push(getCreateTemplate(config, path, child)(path, child, filteredChildren.length > 1));
      }
    }
    return memo;
  }, []);

  if (transformedChildren.length === 1) {
    transformedChildren = transformedChildren[0];
    if (
      !t__namespace.isJSXExpressionContainer(pathNodes[0]) &&
      !t__namespace.isJSXSpreadChild(pathNodes[0]) &&
      !t__namespace.isJSXText(pathNodes[0])
    ) {
      transformedChildren =
        t__namespace.isCallExpression(transformedChildren) &&
        !transformedChildren.arguments.length &&
        !t__namespace.isIdentifier(transformedChildren.callee)
          ? transformedChildren.callee
          : t__namespace.arrowFunctionExpression([], transformedChildren);
      dynamic = true;
    }
  } else {
    transformedChildren = t__namespace.arrowFunctionExpression([], t__namespace.arrayExpression(transformedChildren));
    dynamic = true;
  }
  return [transformedChildren, dynamic];
}

function transformFragmentChildren(path, children, results, config) {
  const filteredChildren = filterChildren(children, config.preserveWhitespace),
    childNodes = filteredChildren.reduce((memo, path) => {
      if (t__namespace.isJSXText(path.node)) {
        const v = htmlEntities.decode(trimWhitespace(path.node.extra.raw, config.preserveWhitespace));
        if (v.length) memo.push(t__namespace.stringLiteral(v));
      } else {
        const child = transformNode(path, { fragmentChild: true});
        memo.push(getCreateTemplate(config, path, child)(path, child, true));
      }
      return memo;
    }, []);

  results.exprs.push(t__namespace.arrayExpression(childNodes));
}

function transformJSX(path) {
  if (path.node.alloyCreated) {
    return;
  }
  const config = getConfig(path);
  const replace = transformThis(path);
  const result = transformNode(
    path,
    t__namespace.isJSXFragment(path.node)
      ? {}
      : {
          }
  );

  const template = getCreateTemplate(config, path, result);
  path.replaceWith(replace(template(path, result, false)));
}

function getTargetFunctionParent(path, parent) {
  let current = path.scope.getFunctionParent();
  while (current !== parent && current.path.isArrowFunctionExpression()) {
    current = current.path.parentPath.scope.getFunctionParent();
  }
  return current;
}

function transformThis(path) {
  const parent = path.scope.getFunctionParent();
  let thisId;
  path.traverse({
    ThisExpression(path) {
      const current = getTargetFunctionParent(path, parent);
      if (current === parent) {
        thisId || (thisId = path.scope.generateUidIdentifier("self$"));
        path.replaceWith(thisId);
      }
    },
    JSXElement(path) {
      let source = path.get("openingElement").get("name");
      while (source.isJSXMemberExpression()) {
        source = source.get("object");
      }
      if (source.isJSXIdentifier() && source.node.name === "this") {
        const current = getTargetFunctionParent(path, parent);
        if (current === parent) {
          thisId || (thisId = path.scope.generateUidIdentifier("self$"));
          source.replaceWith(t__namespace.jsxIdentifier(thisId.name));

          if (path.node.closingElement) {
            path.node.closingElement.name = path.node.openingElement.name;
          }
        }
      }
    }
  });
  return node => {
    if (thisId) {
      if (!parent || parent.block.type === "ClassMethod") {
        const stmt = path.getStatementParent();
        const decl = t__namespace.variableDeclaration("const", [
          t__namespace.variableDeclarator(thisId, t__namespace.thisExpression())
        ]);
        stmt.insertBefore(decl);
      } else {
        parent.push({
          id: thisId,
          init: t__namespace.thisExpression(),
          kind: "const"
        });
      }
    }
    return node;
  };
}

function transformNode(path, info = {}) {
  
  const config = getConfig(path);
  const node = path.node;
  if (t__namespace.isJSXElement(node)) {
    return transformElement(config, path, info);
  } else if (t__namespace.isJSXFragment(node)) {
    let results = { template: "", declarations: [], exprs: [], dynamics: [] };
    // <><div /><Component /></>
    transformFragmentChildren(path, path.get("children"), results, config);
    return results;
  } else if (t__namespace.isJSXText(node)) {
    const text =
      trimWhitespace(node.extra.raw);
    if (!text.length) return null;
    const results = {
      template: text,
      declarations: [],
      exprs: [],
      dynamics: [],
      postExprs: [],
      text: true
    };
    if (!info.skipId && config.generate !== "ssr")
      results.id = path.scope.generateUidIdentifier("el$");
    return results;
  } else if (t__namespace.isJSXExpressionContainer(node)) {
    if (t__namespace.isJSXEmptyExpression(node.expression)) return null;
    if (
      !isDynamic(path.get("expression"), {
        checkMember: true,
        checkTags: !!info.componentChild,
        native: !info.componentChild
      })
    ) {
      return { exprs: [node.expression], template: "" };
    }
    const expr =
      config.wrapConditionals &&
      config.generate !== "ssr" &&
      (t__namespace.isLogicalExpression(node.expression) || t__namespace.isConditionalExpression(node.expression))
        ? transformCondition(path.get("expression"), info.componentChild || info.fragmentChild)
        : !info.componentChild &&
          (config.generate !== "ssr" || info.fragmentChild) &&
          t__namespace.isCallExpression(node.expression) &&
          !t__namespace.isCallExpression(node.expression.callee) &&
          !t__namespace.isMemberExpression(node.expression.callee) &&
          node.expression.arguments.length === 0
        ? node.expression.callee
        : t__namespace.arrowFunctionExpression([], node.expression);
    return {
      exprs:
        expr.length > 1
          ? [
              t__namespace.callExpression(
                t__namespace.arrowFunctionExpression(
                  [],
                  t__namespace.blockStatement([expr[0], t__namespace.returnStatement(expr[1])])
                ),
                []
              )
            ]
          : [expr],
      template: "",
      dynamic: true
    };
  } else if (t__namespace.isJSXSpreadChild(node)) {
    if (
      !isDynamic(path.get("expression"), {
        checkMember: true,
        native: !info.componentChild
      })
    )
      return { exprs: [node.expression], template: "" };
    const expr = t__namespace.arrowFunctionExpression([], node.expression);
    return {
      exprs: [expr],
      template: "",
      dynamic: true
    };
  }
}

function getCreateTemplate(config, path, result) {
  if ((result.tagName && result.renderer === "dom") || config.generate === "dom") {
    return createTemplate$2;
  }

  if (result.renderer === "ssr" || config.generate === "ssr") {
    return createTemplate$1;
  }

  return createTemplate;
}

function transformElement(config, path, info = {}) {
  return transformComponent(path);
}

// add to the top/bottom of the module.
var postprocess = path => {
  if (path.scope.data.events) {
    path.node.body.push(
      t__namespace.expressionStatement(
        t__namespace.callExpression(
          registerImportMethod(path, "delegateEvents", getRendererConfig(path, "dom").moduleName),
          [t__namespace.arrayExpression(Array.from(path.scope.data.events).map(e => t__namespace.stringLiteral(e)))]
        )
      )
    );
  }
  if (path.scope.data.templates?.length) {
    let domTemplates = path.scope.data.templates.filter(temp => temp.renderer === "dom");
    let ssrTemplates = path.scope.data.templates.filter(temp => temp.renderer === "ssr");
    domTemplates.length > 0 && appendTemplates$1(path, domTemplates);
    ssrTemplates.length > 0 && appendTemplates(path, ssrTemplates);
  }
};

const defaultAddSourceInfo = (() => {
  const envMode = process.env.BABEL_ENV ?? process.env.NODE_ENV;
  return envMode === undefined ? true : envMode !== "production";
})();

var config = {
  moduleName: "dom",
  generate: "dom",
  hydratable: false,
  delegateEvents: true,
  delegatedEvents: [],
  builtIns: [],
  requireImportSource: false,
  wrapConditionals: true,
  omitNestedClosingTags: false,
  contextToCustomElements: false,
  staticMarker: "@once",
  effectWrapper: "effect",
  memoWrapper: "memo",
  validate: true,
  preserveWhitespace: false,
  // Whether to include fileName/lineNumber/columnNumber debug info in JSX output
  addSourceInfo: defaultAddSourceInfo,
};

const { isValidHTMLNesting } = require("validate-html-nesting");

// From https://github.com/MananTank/babel-plugin-validate-jsx-nesting/blob/main/src/index.js
const JSXValidator = {
  JSXElement(path) {
    const elName = path.node.openingElement.name;
    const parent = path.parent;
    if (!t__namespace.isJSXElement(parent) || !t__namespace.isJSXIdentifier(elName)) return;
    const elTagName = elName.name;
    if (isComponent(elTagName)) return;
    const parentElName = parent.openingElement.name;
    if (!t__namespace.isJSXIdentifier(parentElName)) return;
    const parentElTagName = parentElName.name;
    if (!isComponent(parentElTagName)) {
      if (!isValidHTMLNesting(parentElTagName, elTagName)) {
        throw path.buildCodeFrameError(
          `Invalid JSX: <${elTagName}> cannot be child of <${parentElTagName}>`
        );
      }
    }
  }
};

var preprocess = (path, { opts }) => {
  const merged = (path.hub.file.metadata.config = Object.assign({}, config, opts));
  const lib = merged.requireImportSource;
  if (lib) {
    const comments = path.hub.file.ast.comments;
    let process = false;
    for (let i = 0; i < comments.length; i++) {
      const comment = comments[i];
      const index = comment.value.indexOf("@jsxImportSource");
      if (index > -1 && comment.value.slice(index).includes(lib)) {
        process = true;
        break;
      }
    }
    if (!process) {
      path.skip();
      return;
    }
  }
  if (merged.validate) path.traverse(JSXValidator);
};

var index = () => {
  return {
    name: "JSX DOM Expressions",
    inherits: SyntaxJSX.default,
    visitor: {
      JSXElement: transformJSX,
      JSXFragment: transformJSX,
      Program: {
        enter: preprocess,
        exit: postprocess
      }
    }
  };
};

module.exports = index;
