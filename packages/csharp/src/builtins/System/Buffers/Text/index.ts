import { createLibrary } from "#createLibrary";


const Text = createLibrary("System.Buffers.Text", {
  Base64: {
    kind: "class",
    members: {
      DecodeFromUtf8: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      DecodeFromUtf8InPlace: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      EncodeToUtf8: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      EncodeToUtf8InPlace: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetMaxDecodedFromUtf8Length: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetMaxEncodedToUtf8Length: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsValid: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  Base64Url: {
    kind: "class",
    members: {
      DecodeFromChars: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      DecodeFromUtf8: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      DecodeFromUtf8InPlace: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      EncodeToChars: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      EncodeToString: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      EncodeToUtf8: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetEncodedLength: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetMaxDecodedLength: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsValid: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryDecodeFromChars: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryDecodeFromUtf8: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryEncodeToChars: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryEncodeToUtf8: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryEncodeToUtf8InPlace: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
});
export default Text
