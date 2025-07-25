/**
 * Interface for the Alloy host file system operations.
 *
 * This interface abstracts file system operations to allow different
 * implementations across different environments (Node.js, browser, etc.).
 */
export interface AlloyHostInterface {
  /**
   * Read a file from the file system.
   *
   * @param source - The path to the file to read
   * @returns An AlloyFileInterface for accessing the file content in different formats
   *
   * @example
   * ```typescript
   * const file = AlloyHost.read('./config.json');
   * const content = await file.text();
   * ```
   */
  read(source: string): AlloyFileInterface;

  /**
   * Write content to a file in the file system.
   *
   * Supports writing different types of content including strings, binary data,
   * and streams. For strings, content is written with UTF-8 encoding.
   *
   * @param destination - The path where the file should be written
   * @param content - The content to write (string, ArrayBuffer, Uint8Array, or ReadableStream)
   * @returns A Promise that resolves when the write operation is complete
   *
   * @example
   * ```typescript
   * // Write a string
   * await AlloyHost.write('./output.txt', 'Hello, world!');
   *
   * // Write binary data
   * const data = new Uint8Array([72, 101, 108, 108, 111]);
   * await AlloyHost.write('./binary.dat', data);
   * ```
   */
  write(
    destination: string,
    content: string | ArrayBuffer | Uint8Array | ReadableStream<Uint8Array>,
  ): Promise<void>;

  /**
   * Check if a file or directory exists at the given path.
   *
   * @param source - The path to check for existence
   * @returns A Promise that resolves to true if the path exists, false otherwise
   *
   * @example
   * ```typescript
   * const fileExists = await AlloyHost.exists('./config.json');
   * if (fileExists) {
   *   // File exists, safe to read
   * }
   * ```
   */
  exists(source: string): Promise<boolean>;

  /**
   * Create a directory at the specified path.
   *
   * Creates the directory and any necessary parent directories recursively.
   * If the directory already exists, this operation succeeds without error.
   *
   * @param path - The path of the directory to create
   * @returns A Promise that resolves when the directory creation is complete
   *
   * @example
   * ```typescript
   * await AlloyHost.mkdir('./output/nested/directory');
   * ```
   */
  mkdir(path: string): Promise<void>;
}

/**
 * Interface for reading file content in different formats.
 *
 * This interface provides multiple ways to access the same file content,
 * allowing consumers to choose the most appropriate format for their use case.
 */
export interface AlloyFileInterface {
  /**
   * Read the file content as a UTF-8 encoded string.
   *
   * @returns A Promise that resolves to the file content as a string
   *
   * @example
   * ```typescript
   * const file = AlloyHost.read('./config.json');
   * const jsonString = await file.text();
   * const config = JSON.parse(jsonString);
   * ```
   */
  text(): Promise<string>;

  /**
   * Read the file content as an ArrayBuffer.
   *
   * Useful for working with binary data or when you need a raw buffer
   * that can be used with various JavaScript APIs.
   *
   * @returns A Promise that resolves to the file content as an ArrayBuffer
   *
   * @example
   * ```typescript
   * const file = AlloyHost.read('./image.png');
   * const buffer = await file.arrayBuffer();
   * const view = new DataView(buffer);
   * ```
   */
  arrayBuffer(): Promise<ArrayBuffer>;

  /**
   * Read the file content as a Uint8Array.
   *
   * Convenient for working with binary data when you need direct access
   * to individual bytes.
   *
   * @returns A Promise that resolves to the file content as a Uint8Array
   *
   * @example
   * ```typescript
   * const file = AlloyHost.read('./binary.dat');
   * const bytes = await file.bytes();
   * console.log('First byte:', bytes[0]);
   * ```
   */
  bytes(): Promise<Uint8Array>;

  /**
   * Get a readable stream of the file content.
   *
   * Useful for processing large files without loading the entire content
   * into memory at once, or for piping data to other streams.
   *
   * @returns A ReadableStream that yields Uint8Array chunks of the file content
   *
   * @example
   * ```typescript
   * const file = AlloyHost.read('./large-file.dat');
   * const stream = file.stream();
   *
   * const reader = stream.getReader();
   * try {
   *   while (true) {
   *     const { done, value } = await reader.read();
   *     if (done) break;
   *     console.log('Received chunk of', value.length, 'bytes');
   *   }
   * } finally {
   *   reader.releaseLock();
   * }
   * ```
   */
  stream(): ReadableStream<Uint8Array>;
}
