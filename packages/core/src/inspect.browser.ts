// inspection is not supported in browsers
export function inspect() {
  return "custom inspect";
}

inspect.custom = Symbol();
