import { createLibrary } from "#createLibrary";


const Remoting = createLibrary("System.Runtime.Remoting", {
  ObjectHandle: {
    kind: "class",
    members: {
      ObjectHandle: {
        kind: "method",
        methodKind: "constructor",
      },
      Unwrap: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
});
export default Remoting
