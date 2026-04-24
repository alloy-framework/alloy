import {
  ITERATE_KEY,
  ReactiveEffect,
  ReactiveFlags,
  shallowReadonly,
  track,
  TrackOpTypes,
  trigger,
  TriggerOpTypes,
} from "@vue/reactivity";
import { effect, onCleanup, root, shallowReactive, untrack } from "./reactivity.js";
import { queueJob } from "./scheduler.js";

export interface ReactiveUnionSetOptions<T> {
  onAdd?: OnReactiveSetAddCallback<T>;
  onDelete?: OnReactiveSetDeleteCallback<T>;
}

export type OnReactiveSetDeleteCallback<T> = (value: T) => void;
export type OnReactiveSetAddCallback<T> = (value: T) => T;

export class ReactiveUnionSet<T> extends Set<T> {
  private _subsets: Set<Set<T>>;
  private _onAdd?: OnReactiveSetAddCallback<T>;
  private _onDelete?: OnReactiveSetDeleteCallback<T>;
  private _refcounts: Map<T, number> = new Map();
  private _indexes: { add: (arg: T) => void; delete: (arg: T) => void }[] = [];

  [ReactiveFlags.IS_REACTIVE] = true;

  private _handleAdd(value: T) {
    value = this._onAdd ? this._onAdd(value) : value;

    for (const index of this._indexes) {
      index.add(value);
    }

    return value;
  }

  private _handleDelete(value: T) {
    if (this._onDelete) {
      this._onDelete(value);
    }

    for (const index of this._indexes) {
      index.delete(value);
    }

    return value;
  }

  constructor(options: ReactiveUnionSetOptions<T> = {}) {
    super();

    this._subsets = new Set();
    this._onAdd = options.onAdd;
    this._onDelete = options.onDelete;

    return this;
  }

  get size() {
    track(this, TrackOpTypes.ITERATE, ITERATE_KEY);
    return super.size;
  }

  [Symbol.iterator](): SetIterator<T> {
    track(this, TrackOpTypes.ITERATE, ITERATE_KEY);
    return super[Symbol.iterator]();
  }

  keys(): SetIterator<T> {
    track(this, TrackOpTypes.ITERATE, ITERATE_KEY);
    return super.keys();
  }

  values(): SetIterator<T> {
    track(this, TrackOpTypes.ITERATE, ITERATE_KEY);
    return super.values();
  }

  entries(): SetIterator<[T, T]> {
    track(this, TrackOpTypes.ITERATE, ITERATE_KEY);
    return super.entries();
  }

  add(item: T) {
    if (this._refcounts.has(item)) {
      this._refcounts.set(item, this._refcounts.get(item)! + 1);
    } else {
      this._refcounts.set(item, 1);
      super.add(item);
      this._handleAdd(item);
      trigger(this, TriggerOpTypes.ADD, item, item);
    }

    return this;
  }

  delete(item: T) {
    const count = this._refcounts.get(item);
    if (count === undefined) {
      return false;
    }

    if (count > 1) {
      this._refcounts.set(item, count - 1);
    } else {
      this._refcounts.delete(item);
      super.delete(item);
      this._handleDelete(item);
      trigger(this, TriggerOpTypes.DELETE, undefined, item);
    }

    return true;
  }

  addSubset(subset: Set<T>, options: ReactiveUnionSetOptions<T> = {}) {
    if (this._subsets.has(subset)) {
      return;
    }

    const { onAdd, onDelete } = options;

    this._subsets.add(subset);

    /**
     * Contains a map of the previous values and their mapped values
     * that were added to the parent set.
     */
    const prevValues = new Map<T, T>();
    const itemDisposers = new Map<T, () => void>();

    effect(
      () => {
        for (const [prevSourceValue, prevTargetValue] of prevValues) {
          if (!subset.has(prevSourceValue)) {
            untrack(() => onDelete?.(prevSourceValue));
            prevValues.delete(prevSourceValue);
            this.delete(prevTargetValue);
            const disposer = itemDisposers.get(prevSourceValue);
            if (disposer) {
              disposer();
              itemDisposers.delete(prevSourceValue);
            }
          }
        }

        for (const value of subset) {
          if (!prevValues.has(value)) {
            if (onAdd) {
              const added = untrack(() =>
                root((disposer) => {
                  const result = onAdd(value);
                  itemDisposers.set(value, disposer);
                  return result;
                }),
              );
              prevValues.set(value, added);
            } else {
              this.add(value);
              prevValues.set(value, value);
            }
          }
        }
      },
      undefined,
      {
        debug: {
          name: "reactiveUnionSet:subsetSync",
          type: "collection",
        },
      },
    );
  }

  createDerivedSet<U>(mapper: (value: T) => U | U[]) {
    const set = shallowReactive(new Set<U>());
    const refcounts = new Map<U, number>();

    function ref(value: U) {
      if (refcounts.has(value)) {
        const count = refcounts.get(value)! + 1;
        refcounts.set(value, count);
        return count;
      } else {
        refcounts.set(value, 1);
        set.add(value);
        return 1;
      }
    }

    function unref(value: U) {
      const count = refcounts.get(value)!;

      if (count > 1) {
        refcounts.set(value, count - 1);
        return count - 1;
      } else {
        refcounts.delete(value);
        set.delete(value);
        return 0;
      }
    }

    this._indexes.push({
      add: (value: T) => {
        effect(
          (prev: U[] | U | undefined) => {
            for (const id of [prev].flat()) {
              unref(id as any);
            }

            const mappedValue = mapper(value);
            for (const id of [mappedValue].flat()) {
              ref(id as any);
            }

            return mappedValue;
          },
          undefined,
          {
            debug: {
              name: `reactiveUnionSet:derived:${mapper.name || "mapper"}`,
              type: "collection",
            },
          },
        );
      },
      delete: (value: T) => {
        const mappedValue = mapper(value);
        for (const id of [mappedValue].flat()) {
          unref(id as any);
        }
      },
    });

    return shallowReadonly(set);
  }

  /**
   * Creates a reactive index map from element values to the elements themselves,
   * using the provided `mapper` to compute the index key(s) for each element.
   *
   * **Lifetime contract:** Each element added to this `ReactiveUnionSet` creates
   * bookkeeping state (and a reactive effect when `mapper` reads reactive deps).
   * That state is only released when:
   *   1. The element is explicitly removed via `delete()` on this set, or
   *   2. The owning reactive context (the scope in which `createIndex` is called)
   *      is disposed — at which point `onCleanup` stops all surviving effects.
   *
   * Callers must ensure one of these conditions is eventually met for every added
   * element; otherwise per-element effects will persist for the lifetime of the
   * application and continuously track reactive dependencies.
   */
  createIndex<U>(mapper: (value: T) => U | U[]): ReadonlyMap<U, T> {
    const index = shallowReactive(new Map<U, T>());

    interface IndexEntry {
      lastMapped: U[];
      eff?: ReactiveEffect;
    }
    const entries = new Map<T, IndexEntry>();

    onCleanup(() => {
      for (const entry of entries.values()) entry.eff?.stop();
      entries.clear();
    });

    this._indexes.push({
      add: (value: T) => {
        type MappedValue = U extends readonly (infer InnerArr)[] ? InnerArr : U;
        const entry: IndexEntry = { lastMapped: [] };
        entries.set(value, entry);

        let hasDeps = false;
        const eff = new ReactiveEffect<void>(() => {
          for (const id of entry.lastMapped as MappedValue[]) {
            index.delete(id as U);
          }
          // filter to avoid overwriting existing values (first wins)
          const mappedValues = [mapper(value)]
            .flat()
            .filter((v) => untrack(() => !index.has(v as U))) as MappedValue[];
          for (const id of mappedValues) {
            index.set(id as U, value as any);
          }
          entry.lastMapped = mappedValues as U[];
        });
        // Detect whether the mapper reads any reactive deps during its first run.
        // If onTrack fires, the mapper is "reactive" and we keep the effect alive
        // for future updates. If no deps are tracked, the mapper is "static" and
        // we stop the effect immediately — no ongoing bookkeeping needed.
        eff.onTrack = () => { hasDeps = true; };
        eff.run();

        if (hasDeps) {
          // Reactive mapper: integrate with Alloy scheduler for future updates
          eff.scheduler = () => queueJob(eff);
          entry.eff = eff;
        } else {
          // Static mapper: no reactive deps, no ongoing effect needed
          eff.stop();
        }
      },
      delete: (value: T) => {
        const entry = entries.get(value);
        if (entry) {
          entry.eff?.stop();
          for (const id of entry.lastMapped) {
            index.delete(id as U);
          }
          entries.delete(value);
        }
      },
    });

    return shallowReadonly(index);
  }
}
