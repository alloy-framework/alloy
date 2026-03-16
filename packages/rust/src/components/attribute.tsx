import { Children, For, Refkey } from "@alloy-js/core";
import { Reference } from "./reference.js";

export interface AttributeProps {
  name: string | Refkey;
  args?: Children;
}

export interface InnerAttributeProps {
  name: string | Refkey;
  args?: Children;
}

export interface DeriveAttributeProps {
  traits: (string | Refkey)[];
}

export function Attribute(props: AttributeProps) {
  return <AttributeBase marker="#[" name={props.name} args={props.args} />;
}

export function InnerAttribute(props: InnerAttributeProps) {
  return <AttributeBase marker="#![" name={props.name} args={props.args} />;
}

interface AttributeBaseProps {
  marker: "#[" | "#![";
  name: string | Refkey;
  args?: Children;
}

function AttributeBase(props: AttributeBaseProps) {
  return (
    <>
      {props.marker}
      {typeof props.name === "string" ?
        props.name
      : <Reference refkey={props.name} />}
      {props.args !== undefined ?
        <>
          {"("}
          {props.args}
          {")"}
        </>
      : null}
      {"]"}
    </>
  );
}

export function DeriveAttribute(props: DeriveAttributeProps) {
  return (
    <Attribute
      name="derive"
      args={
        <For each={props.traits} joiner={", "}>
          {(item) =>
            typeof item === "string" ? item : <Reference refkey={item} />
          }
        </For>
      }
    />
  );
}
