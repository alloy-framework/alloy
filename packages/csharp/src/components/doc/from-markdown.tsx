import { marked, Tokens, type Token } from "marked";
import { DocC, DocCode, DocList, DocSee } from "./comment.jsx";

export interface DocFromMarkdownProps {
  markdown: string;
}

/** Convert markdown to a Csharp doc comment */
export function DocFromMarkdown(props: DocFromMarkdownProps) {
  const tokens = marked.lexer(props.markdown);
  return renderTokens(tokens);
}

function renderTokens(tokens: Token[]) {
  return (
    <>
      {tokens.map((token, index) => (
        <>
          <DocFromMarkedToken token={token} />
          {token.type === "paragraph" && index !== tokens.length - 1 && <br />}
        </>
      ))}
    </>
  );
}

function DocFromMarkedToken(props: { token: Token }) {
  const { token } = props;
  switch (token.type) {
    case "paragraph":
      return token.tokens ? renderTokens(token.tokens) : null;
    case "code":
      return <DocCode>{token.text}</DocCode>;
    case "codespan":
      return <DocC>{token.text}</DocC>;
    case "list":
      return (
        <DocList
          type={token.ordered ? "number" : "bullet"}
          items={token.items.map((x: Tokens.ListItem) => (
            <>{renderTokens(x.tokens)}</>
          ))}
        />
      );
    case "link":
      return (
        <DocSee href={token.href}>
          {token.tokens && renderTokens(token.tokens)}
        </DocSee>
      );
    case "strong":
    case "em":
      return token.text;
    case "text":
    default:
      return token.raw;
  }
}
