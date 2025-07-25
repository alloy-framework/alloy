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

export function createResource<U>(fetcher: () => Promise<U>): Resource<U>;
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

export function createFileResource(path: string) {
  return createResource(() => {
    return AlloyHost.read(path).text();
  });
}
