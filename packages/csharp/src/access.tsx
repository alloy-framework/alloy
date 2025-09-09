import {
  AccessExpression,
  AccessExpressionPartProps,
} from "#components/access-expression/access-expression.jsx";
import { Children, isRefkeyable, Refkeyable, RENDERABLE } from "@alloy-js/core";
import { CSharpSymbol } from "./symbols/csharp.js";

export class AccessExpressionBuilder {
  private _parts: AccessExpressionPartProps[] = [];

  member(
    member: Refkeyable | string | CSharpSymbol,
    options: AccessExpressionPartProps = {},
  ) {
    if (typeof member === "string") {
      this._parts.push({
        id: member,
        ...options,
      });
    } else if (isRefkeyable(member)) {
      this._parts.push({ refkey: member, ...options });
    } else {
      this._parts.push({ symbol: member, ...options });
    }

    return this;
  }

  index(indexerArgs: Children[], options: AccessExpressionPartProps = {}) {
    this._parts.push({ indexerArgs, ...options });

    return this;
  }

  call(
    member: Refkeyable | string,
    args?: Children[],
    options?: AccessExpressionPartProps,
  ): this;
  call(args?: Children[], options?: AccessExpressionPartProps): this;
  call(...params: any[]): this {
    if (params.length === 0 || Array.isArray(params[0])) {
      // Signature: call(args?, options?)
      const args: Children[] = (params[0] ?? []) as Children[];
      const options: AccessExpressionPartProps = params[1] ?? {};
      this._parts.push({ args, ...options });
      return this;
    } else {
      const member = params[0] as Refkeyable | string;
      const args: Children[] = (params[1] ?? []) as Children[];
      const options: AccessExpressionPartProps = params[2] ?? {};
      this.member(member);
      this._parts.push({ args, ...options });
      return this;
    }
  }

  [RENDERABLE]() {
    const parts = this._parts.map((p) => <AccessExpression.Part {...p} />);
    return <AccessExpression children={parts} />;
  }
}

export function access(
  base: Refkeyable | string,
  options: AccessExpressionPartProps = {},
) {
  const builder = new AccessExpressionBuilder();
  return builder.member(base, options);
}
