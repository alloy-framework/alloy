import { Children } from "@alloy-js/core/jsx-runtime";

/** Render with a trailing hard line break if children are present */
export function withBbr(children: Children | undefined) {
  return (
    children && (
      <>
        {children}
        <hbr />
      </>
    )
  );
}
