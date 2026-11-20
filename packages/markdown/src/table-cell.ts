import { Marked } from "marked";

function escapeText(text: string, preserveEntities = false): string {
  return text.replace(
    /&(?:#[0-9]+|#x[0-9a-f]+|[a-z][a-z0-9]*);|[!-/:-@[-`{-~]|\r\n?|\n/gi,
    (match) => {
      if (preserveEntities && match.length > 1 && match.startsWith("&")) {
        return match;
      }
      if (match === "\n" || match.startsWith("\r")) {
        return "<br>";
      }
      return Array.from(
        match,
        (character) => `&#${character.charCodeAt(0)};`,
      ).join("");
    },
  );
}

const inlineMarkdown = new Marked({
  gfm: true,
  breaks: true,
  renderer: {
    text(token) {
      return "tokens" in token && token.tokens
        ? this.parser.parseInline(token.tokens)
        : escapeText(token.text, token.type !== "escape");
    },
    html(token) {
      return escapeText(token.text);
    },
    codespan(token) {
      // Inline HTML avoids GFM's special backslash handling before code pipes.
      return `<code>${escapeText(token.text)}</code>`;
    },
    br() {
      return "<br>";
    },
  },
});

export function renderTableCell(text: string, literal: boolean): string {
  if (literal) {
    return escapeText(text);
  }
  return inlineMarkdown
    .parseInline(text, { async: false })
    .replaceAll("|", "&#124;")
    .replace(/\r\n?|\n/g, "&#10;");
}
