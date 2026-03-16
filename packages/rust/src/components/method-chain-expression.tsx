import {
  BasePartProps,
  Children,
  createAccessExpression,
  For,
  Indent,
  Wrap,
} from "@alloy-js/core";

export interface MethodChainExpressionProps {
  receiver: Children;
  children: Children;
}

export interface MethodChainCallProps {
  name: string;
  args?: Children[];
  typeArgs?: Children[];
  await?: boolean;
  try?: boolean;
}

interface MethodChainPartProps extends BasePartProps {
  receiver?: Children;
  name?: string;
  args?: Children[];
  typeArgs?: Children[];
  await?: boolean;
  try?: boolean;
}

interface MethodChainPartDescriptor {
  receiver?: Children;
  name?: string;
  args: Children[];
  typeArgs: Children[];
  await: boolean;
  try: boolean;
  call: boolean;
  [key: string]: unknown;
}

const { Expression, Part, registerOuterComponent } = createAccessExpression<
  MethodChainPartProps,
  MethodChainPartDescriptor
>({
  createDescriptor(partProps, _symbol, first) {
    if (first) {
      if (partProps.receiver === undefined) {
        throw new Error(
          "MethodChainExpression requires a receiver before method calls.",
        );
      }

      return {
        receiver: partProps.receiver,
        args: [],
        typeArgs: [],
        await: false,
        try: false,
        call: false,
      };
    }

    if (!partProps.name) {
      throw new Error(
        "MethodChainExpression.Call requires a method name for each chain step.",
      );
    }

    return {
      name: partProps.name,
      args: partProps.args ?? [],
      typeArgs: partProps.typeArgs ?? [],
      await: !!partProps.await,
      try: !!partProps.try,
      call: true,
    };
  },

  getBase(part) {
    return part.receiver ?? "";
  },

  formatPart(part, _prevPart, inCallChain) {
    if (!part.name) {
      throw new Error(
        "MethodChainExpression call part is missing a method name.",
      );
    }

    const content = (
      <>
        {"."}
        {part.name}
        {part.typeArgs.length > 0 ?
          <>
            {"::<"}
            <For each={part.typeArgs} joiner={", "}>
              {(typeArg) => typeArg}
            </For>
            {">"}
          </>
        : null}
        {"("}
        <Wrap
          when={part.args.length > 1}
          with={Indent}
          props={{ softline: true, trailingBreak: true }}
        >
          <For each={part.args} comma line>
            {(arg) => arg}
          </For>
        </Wrap>
        {")"}
        {part.await ? ".await" : ""}
        {part.try ? "?" : ""}
      </>
    );

    if (inCallChain) {
      return (
        <group>
          <sbr />
          {content}
        </group>
      );
    }

    return (
      <group>
        <indent>
          <sbr />
          {content}
        </indent>
      </group>
    );
  },

  isCallPart(part) {
    return part.call;
  },
});

export function MethodChainExpression(
  props: MethodChainExpressionProps,
): Children {
  return (
    <Expression>
      <Part receiver={props.receiver} />
      {props.children}
    </Expression>
  );
}

export const MethodChainCall = Part as (
  props: MethodChainCallProps,
) => Children;

MethodChainExpression.Call = MethodChainCall;
registerOuterComponent(MethodChainExpression);
