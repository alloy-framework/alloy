import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type ObjectiveCLibrary = LibrarySymbolReference & {
  ObjectiveCMarshal: LibrarySymbolReference & {
    MessageSendFunction: LibrarySymbolReference & {
      MsgSend: LibrarySymbolReference;
      MsgSendFpret: LibrarySymbolReference;
      MsgSendStret: LibrarySymbolReference;
      MsgSendSuper: LibrarySymbolReference;
      MsgSendSuperStret: LibrarySymbolReference
    };
    UnhandledExceptionPropagationHandler: LibrarySymbolReference & {
      UnhandledExceptionPropagationHandler: LibrarySymbolReference;
      Invoke: LibrarySymbolReference;
      BeginInvoke: LibrarySymbolReference;
      EndInvoke: LibrarySymbolReference
    }
  };
  ObjectiveCTrackedTypeAttribute: LibrarySymbolReference & {
    ObjectiveCTrackedTypeAttribute: LibrarySymbolReference
  }
};
const ObjectiveC: ObjectiveCLibrary = createLibrary("System.Runtime.InteropServices.ObjectiveC", {
  ObjectiveCMarshal: {
    kind: "class",
    members: {
      MessageSendFunction: {
        kind: "enum",
        members: {
          MsgSend: {
            kind: "field",
            type: () => {
              return ObjectiveC.ObjectiveCMarshal.MessageSendFunction;
            },
          },
          MsgSendFpret: {
            kind: "field",
            type: () => {
              return ObjectiveC.ObjectiveCMarshal.MessageSendFunction;
            },
          },
          MsgSendStret: {
            kind: "field",
            type: () => {
              return ObjectiveC.ObjectiveCMarshal.MessageSendFunction;
            },
          },
          MsgSendSuper: {
            kind: "field",
            type: () => {
              return ObjectiveC.ObjectiveCMarshal.MessageSendFunction;
            },
          },
          MsgSendSuperStret: {
            kind: "field",
            type: () => {
              return ObjectiveC.ObjectiveCMarshal.MessageSendFunction;
            },
          },
        },
      },
      UnhandledExceptionPropagationHandler: {
        kind: "generic",
        members: {
          UnhandledExceptionPropagationHandler: {
            kind: "method",
            methodKind: "constructor",
          },
          Invoke: {
            kind: "method",
            methodKind: "ordinary",
            isVirtual: true,
          },
          BeginInvoke: {
            kind: "method",
            methodKind: "ordinary",
            isVirtual: true,
          },
          EndInvoke: {
            kind: "method",
            methodKind: "ordinary",
            isVirtual: true,
          },
        },
      },
    },
  },
  ObjectiveCTrackedTypeAttribute: {
    kind: "class",
    members: {
      ObjectiveCTrackedTypeAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
});
export default ObjectiveC
