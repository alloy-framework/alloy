export interface AlloyHostInterface {
  read(source: string): AlloyFileInterface;
  write(
    destination: string,
    content: string | ArrayBuffer | Uint8Array | ReadableStream<Uint8Array>,
  ): Promise<void>;
  exists(source: string): Promise<boolean>;
  mkdir(path: string): Promise<void>;
}

export interface AlloyFileInterface {
  text(): Promise<string>;
  arrayBuffer(): Promise<ArrayBuffer>;
  bytes(): Promise<Uint8Array>;
  stream(): ReadableStream<Uint8Array>;
}
