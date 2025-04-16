import { childrenArray, For } from "@alloy-js/core";
import { Children, memo } from "@alloy-js/core/jsx-runtime";

export interface CommonListProps {
  children: Children;
  tasks?: boolean;
}

export interface OrderedListProps extends CommonListProps {
  ordered: true;
  start?: number;
}

export interface UnorderedListProps extends CommonListProps {
  ordered?: false | undefined;
  bullet?: "*" | "-" | "+";
}

export type ListProps = OrderedListProps | UnorderedListProps;

export function List(props: ListProps) {
  const children = memo(() => {
    return childrenArray(() => props.children, {
      preserveFragments: true,
    }).filter((c) => Boolean(c));
  });

  const start = (props as OrderedListProps).start ?? 1;

  return (
    <For each={children}>
      {(child, index) => {
        // sure would be great to align based on the number of digits for
        // ordered lists, but GitHub has issues parsing them sometimes. This is
        // much more reliable.
        const alignSize = props.ordered ? 3 : 2;

        return (
          <align width={alignSize}>
            {props.ordered ?
              <>{index + start}.</>
            : props.bullet}{" "}
            {props.tasks && "[ ] "}
            {child}
          </align>
        );
      }}
    </For>
  );
}
