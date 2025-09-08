import { createLibrary } from "#createLibrary";


const Cryptography = createLibrary("System.Security.Cryptography", {
  CryptographicException: {
    kind: "class",
    members: {
      CryptographicException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
});
export default Cryptography
