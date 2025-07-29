import { isRef, reactive, Ref } from "@vue/reactivity";
import { AlloyHost } from "./host/alloy-host.js";
import { effect } from "./reactivity.js";
import { trackPromise } from "./scheduler.js";

/**
 * Represents an external resource fetched asynchronously.
 */
export interface Resource<T> {
  /**
   * The data if it's been loaded successfully. Null when not yet loaded or
   * there was an error.
   */
  data: T | null;

  /**
   * Whether the resource is still being fetched.
   */
  loading: boolean;

  /**
   * The error loading the resource, if any.
   */
  error: null | Error;
}

/**
 * Create a resource that fetches data asynchronously.
 *
 * This function has two overloads:
 * 1. Simple fetcher - fetches data once when the resource is created
 * 2. Reactive fetcher - fetches data when a reactive source changes
 *
 * @example
 * ```typescript
 * // Simple usage - fetches data once when created
 * const userResource = createResource(async () => {
 *   const response = await fetch('/api/user');
 *   return response.json();
 * });
 *
 * // Access the resource state
 * console.log(userResource.loading); // true initially
 * console.log(userResource.data);    // null initially
 * console.log(userResource.error);   // null initially
 * ```
 *
 * @example
 * ```typescript
 * // Reactive usage - fetches data when the ref changes
 * const userId = ref(1);
 *
 * const userResource = createResource(userId, async (id) => {
 *   const response = await fetch(`/api/user/${id}`);
 *   return response.json();
 * });
 *
 * // The fetcher will be called automatically when userId changes
 * userId.value = 2; // This triggers a new fetch with id=2
 * ```
 */
export function createResource<U>(fetcher: () => Promise<U>): Resource<U>;
/**
 * Create a resource that fetches data asynchronously based on a reactive source.
 */
export function createResource<T, U>(
  refSource: Ref<T> | (() => T),
  fetcher: (input: T) => Promise<U>,
): Resource<U>;
export function createResource<T, U>(
  fetcherOrSource: (() => Promise<U>) | Ref<T> | (() => T),
  maybeFetcher?: (input: T) => Promise<U>,
): Resource<U> {
  let getter: Ref<T> | (() => T) | null = null;
  let fetcher: (() => Promise<U>) | ((input: T) => Promise<U>);

  if (arguments.length === 1) {
    fetcher = fetcherOrSource as () => Promise<U>;
  } else {
    getter = fetcherOrSource as Ref<T> | (() => T);
    fetcher = maybeFetcher!;
  }

  const resource: Resource<U> = reactive({
    data: null,
    loading: true,
    error: null,
  });

  if (!getter) {
    const promise = (fetcher as () => Promise<U>)();
    trackPromise(
      promise
        .then((result) => {
          resource.data = result;
          resource.loading = false;
        })
        .catch((error) => {
          resource.error = error;
          resource.loading = false;
        }),
    );
  } else {
    effect(() => {
      let input: T;
      if (isRef(getter)) {
        input = getter.value;
      } else {
        input = getter();
      }
      const promise = (fetcher as (input: T) => Promise<U>)(input);
      trackPromise(promise);
      promise.then(
        (result) => {
          resource.data = result;
          resource.loading = false;
        },
        (error) => {
          resource.error = error;
          resource.loading = false;
        },
      );
    });
  }

  return resource;
}

/**
 * Create a resource that reads a file from the file system.
 *
 * This is a convenience function that creates a resource for reading file content
 * using the AlloyHost file system API. The file is read as text when the resource
 * is created.
 *
 * @example
 * ```typescript
 * // Read a configuration file
 * const configResource = createFileResource('./config.json');
 *
 * // Access the file content
 * if (!configResource.loading && !configResource.error) {
 *   const configText = configResource.data; // string content of the file
 *   const config = JSON.parse(configText);
 * }
 * ```
 */
export function createFileResource(path: string) {
  return createResource(() => {
    return AlloyHost.read(path).text();
  });
}
