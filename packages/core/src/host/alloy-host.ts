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
      await writeFile(destination, content, "utf8");
    } else if (content instanceof ArrayBuffer) {
      await writeFile(destination, new Uint8Array(content));
    } else if (content instanceof Uint8Array) {
      await writeFile(destination, content);
    } else {
      // content is ReadableStream<Uint8Array>
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
    await mkdir(path, { recursive: true });
  },
};

export class AlloyFile implements AlloyFileInterface {
  constructor(private source: string) {}

  async text(): Promise<string> {
    return await readFile(this.source, "utf8");
  }

  async arrayBuffer(): Promise<ArrayBuffer> {
    const buffer = await readFile(this.source);
    return buffer.buffer.slice(
      buffer.byteOffset,
      buffer.byteOffset + buffer.byteLength,
    );
  }

  async bytes(): Promise<Uint8Array> {
    const buffer = await readFile(this.source);
    return new Uint8Array(buffer);
  }

  stream(): ReadableStream<Uint8Array> {
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
  }
}
