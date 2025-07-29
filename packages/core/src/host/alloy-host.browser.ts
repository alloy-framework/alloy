import { AlloyFileInterface, AlloyHostInterface } from "./interface.js";

export const AlloyHost: AlloyHostInterface = {
  read(source: string): AlloyFileInterface {
    return new AlloyFile(source);
  },

  async write(
    destination: string,
    content: string | ArrayBuffer | Uint8Array | ReadableStream<Uint8Array>,
  ): Promise<void> {
    throw new Error(
      "File system write operations are not supported in the browser",
    );
  },

  async exists(source: string): Promise<boolean> {
    throw new Error(
      "File system exists operations are not supported in the browser",
    );
  },

  async mkdir(path: string): Promise<void> {
    throw new Error(
      "File system mkdir operations are not supported in the browser",
    );
  },
};

export class AlloyFile implements AlloyFileInterface {
  constructor(private source: string) {}

  async text(): Promise<string> {
    throw new Error(
      "File system read operations are not supported in the browser",
    );
  }

  async arrayBuffer(): Promise<ArrayBuffer> {
    throw new Error(
      "File system read operations are not supported in the browser",
    );
  }

  async bytes(): Promise<Uint8Array> {
    throw new Error(
      "File system read operations are not supported in the browser",
    );
  }

  stream(): ReadableStream<Uint8Array> {
    throw new Error(
      "File system read operations are not supported in the browser",
    );
  }
}
