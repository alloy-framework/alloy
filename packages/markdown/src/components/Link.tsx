import { Refkey } from "@alloy-js/core";

export interface LinkPropsWithRefkey {
  refkey: Refkey;
}

export interface LinkPropsWithHref {
  href: string;
  title: string;
}

export type LinkProps = LinkPropsWithRefkey | LinkPropsWithHref;

export function Link(props: LinkProps) {
  if ("refkey" in props) {
    return "refkey";
  }

  return (
    <>
      [{props.title}]({props.href})
    </>
  );
}
