import { createReadStream, createWriteStream } from "fs";
import { access, mkdir, readFile, writeFile } from "fs/promises";
import { AlloyFileInterface, AlloyHostInterface } from "./interface.js";

export const AlloyHost: AlloyHostInterface = {
  read(source: string): AlloyFileInterface {
    return new AlloyFile(source);
  },

  async write(
    destination: string,
    content: string | ArrayBuffer | Uint8Array | ReadableStream<Uint8Array>,
  ): Promise<void> {
    if (typeof content === "string") {
      //eslint-disable-next-line no-useless-catch
      try {
        await writeFile(destination, content, "utf8");
      } catch (e) {
        // get good callstacks
        throw e;
      }
    } else if (content instanceof ArrayBuffer) {
      //eslint-disable-next-line no-useless-catch
      try {
        await writeFile(destination, new Uint8Array(content));
      } catch (e) {
        // get good callstacks
        throw e;
      }
    } else if (content instanceof Uint8Array) {
      //eslint-disable-next-line no-useless-catch
      try {
        await writeFile(destination, content);
      } catch (e) {
        // get good callstacks
        throw e;
      }
    } else {
      // content is ReadableStream<Uint8Array>
      //eslint-disable-next-line no-useless-catch
      try {
        const writeStream = createWriteStream(destination);
        const reader = content.getReader();

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            await new Promise<void>((resolve, reject) => {
              writeStream.write(value, (err) => {
                if (err) reject(err);
                else resolve();
              });
            });
          }
        } finally {
          reader.releaseLock();
          await new Promise<void>((resolve, reject) => {
            writeStream.end((err?: Error) => {
              if (err) reject(err);
              else resolve();
            });
          });
        }
      } catch (e) {
        // get good callstacks
        throw e;
      }
    }
  },

  async exists(source: string): Promise<boolean> {
    try {
      await access(source);
      return true;
    } catch {
      return false;
    }
  },

  async mkdir(path: string): Promise<void> {
    //eslint-disable-next-line no-useless-catch
    try {
      await mkdir(path, { recursive: true });
    } catch (e) {
      // get good callstacks
      throw e;
    }
  },
};

export class AlloyFile implements AlloyFileInterface {
  constructor(private source: string) {}

  async text(): Promise<string> {
    //eslint-disable-next-line no-useless-catch
    try {
      return await readFile(this.source, "utf8");
    } catch (e) {
      // get good callstacks
      throw e;
    }
  }

  async arrayBuffer(): Promise<ArrayBuffer> {
    //eslint-disable-next-line no-useless-catch
    try {
      const buffer = await readFile(this.source);
      return buffer.buffer.slice(
        buffer.byteOffset,
        buffer.byteOffset + buffer.byteLength,
      );
    } catch (e) {
      // get good callstacks
      throw e;
    }
  }

  async bytes(): Promise<Uint8Array> {
    //eslint-disable-next-line no-useless-catch
    try {
      const buffer = await readFile(this.source);
      return new Uint8Array(buffer);
    } catch (e) {
      // get good callstacks
      throw e;
    }
  }

  stream(): ReadableStream<Uint8Array> {
    //eslint-disable-next-line no-useless-catch
    try {
      const nodeStream = createReadStream(this.source);

      return new ReadableStream<Uint8Array>({
        start(controller) {
          nodeStream.on("data", (chunk) => {
            controller.enqueue(new Uint8Array(chunk as Buffer));
          });

          nodeStream.on("end", () => {
            controller.close();
          });

          nodeStream.on("error", (err) => {
            controller.error(err);
          });
        },

        cancel() {
          nodeStream.destroy();
        },
      });
    } catch (e) {
      // get good callstacks
      throw e;
    }
  }
}
