import { LibrarySymbolReference } from "@alloy-js/core";
import { createLibrary } from "../../../index.js";
import decorators, { LibraryDecorators } from "./decorators.js";

type EventsLibrary = LibrarySymbolReference & LibraryDecorators;

const Events: EventsLibrary = createLibrary("TypeSpec.Events", decorators, {
  packageImport: "@typespec/events",
});

export default Events;
