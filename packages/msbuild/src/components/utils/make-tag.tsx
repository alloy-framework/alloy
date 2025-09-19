import { Children, For, Indent, List, splitProps } from "@alloy-js/core";

export function makeTag<T>(tag: string) {
  return (props: { children?: Children } & T) => {
    const [children, rest] = splitProps(props, ["children"]);
    return (
      <group>
        {`<`}
        {tag}
        <Attributes attributes={rest} />
        {children.children ?
          <>
            {`>`}
            <Indent softline trailingBreak>
              <List children={children.children} />
            </Indent>
            {`</${tag}>`}
          </>
        : ` />`}
      </group>
    );
  };
}

function Attributes(props: { attributes: Record<string, unknown> }) {
  return (
    <>
      {Object.entries(props.attributes).length === 0 ? "" : " "}
      <For each={Object.entries(props.attributes)} line>
        {([key, value]) => `${key}="${value}"`}
      </For>
    </>
  );
}
