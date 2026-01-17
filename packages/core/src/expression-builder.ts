import { Children } from "./runtime/component.js";
import { mapJoin } from "./utils.jsx";

export class ExpressionBuilder {
  #expression: Children = "";
  #context: Children[] = [];

  constructor(startExpression: Children) {
    this.#expression = startExpression;
  }

  build(): { context: Children; expression: Children } {
    return {
      context: mapJoin(
        () => this.#context,
        (c) => c,
        { joiner: "\n" },
      ),
      expression: this.#expression,
    };
  }

  replace(cb: (current: Children) => Children): ExpressionBuilder {
    this.#expression = cb(this.#expression);
    return this;
  }

  pushContext(cb: (current: Children) => Children): ExpressionBuilder {
    this.#context.push(cb(this.#expression));
    return this;
  }
}
