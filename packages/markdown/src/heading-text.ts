import { decodeHTML } from "entities";
import { Lexer, Parser, Renderer, type Token } from "marked";

/** Extract visible text, excluding Markdown syntax and raw HTML tags. */
export function headingText(markdown: string): string {
  const renderer = new Renderer();
  const parser = new Parser({ renderer });
  const inline = ({ tokens }: { tokens: Token[] }) =>
    parser.parseInline(tokens);
  renderer.strong = renderer.em = renderer.del = renderer.link = inline;
  renderer.image = ({ tokens }) => parser.parseInline(tokens);
  renderer.codespan = ({ text }) => text;
  renderer.text = (token) =>
    "tokens" in token && token.tokens
      ? parser.parseInline(token.tokens)
      : decodeHTML(token.text);
  renderer.html = () => "";
  renderer.br = () => " ";
  return parser.parseInline(Lexer.lexInline(markdown));
}
