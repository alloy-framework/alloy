import {
  Namekey,
  OutputSpace,
  track,
  TrackOpTypes,
  trigger,
  TriggerOpTypes,
} from "@alloy-js/core";
import { GoSymbol, GoSymbolOptions } from "./go.js";
import { NamedTypeSymbol } from "./named-type.js";

/**
 * A symbol for a function in Go, including receivers.
 */
export class FunctionSymbol extends GoSymbol {
  public readonly symbolKind = "function";

  constructor(
    name: string | Namekey,
    spaces: OutputSpace | undefined,
    options: GoSymbolOptions = {},
  ) {
    super(name, spaces, options);
  }

  #receiverSymbol?: NamedTypeSymbol = undefined;

  get receiverSymbol(): NamedTypeSymbol | undefined {
    track(this, TrackOpTypes.GET, "receiverSymbol");
    return this.#receiverSymbol;
  }

  set receiverSymbol(value: NamedTypeSymbol | undefined) {
    if (this.#receiverSymbol === value) {
      return;
    }
    trigger(
      this,
      TriggerOpTypes.SET,
      "receiverSymbol",
      value,
      this.#receiverSymbol,
    );
    this.#receiverSymbol = value;
  }
}
