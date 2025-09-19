import { Children, For, Indent, splitProps } from "@alloy-js/core";

interface Conditionable {
  Condition?: string;
}
export const ItemGroup = makeTag<{ Label?: string } & Conditionable>(
  "ItemGroup",
);
export const PropertyGroup = makeTag<{ Label?: string } & Conditionable>(
  "PropertyGroup",
);
export const PackageReference = makeTag<
  {
    Include: string;
    Version?: string;
    GeneratePathProperty?: boolean;
  } & Conditionable
>("PackageReference");

function makeTag<T>(tag: string) {
  return (props: { children: Children } & T) => {
    const [children, rest] = splitProps(props, ["children"]);
    return (
      <group>
        <>
          {`<`}
          {tag}
          <Attributes attributes={rest} />
          {`>`}
        </>
        <Indent softline>
          {children.children}
          {`</${tag}>`}
        </Indent>
        <softline />
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
