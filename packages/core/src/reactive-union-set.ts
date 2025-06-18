import {
  ITERATE_KEY,
  ReactiveFlags,
  shallowReactive,
  shallowReadonly,
  track,
  TrackOpTypes,
  trigger,
  TriggerOpTypes,
} from "@vue/reactivity";
import { effect, untrack } from "./reactivity.js";

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

    effect(() => {
      for (const [prevSourceValue, prevTargetValue] of prevValues) {
        if (!subset.has(prevSourceValue)) {
          untrack(() => onDelete?.(prevSourceValue));
          prevValues.delete(prevSourceValue);
          this.delete(prevTargetValue);
        }
      }

      for (const value of subset) {
        if (!prevValues.has(value)) {
          if (onAdd) {
            const added = untrack(() => onAdd(value));
            prevValues.set(value, added);
          } else {
            this.add(value);
            prevValues.set(value, value);
          }
        }
      }
    });
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
        effect((prev: U[] | U | undefined) => {
          for (const id of [prev].flat()) {
            unref(id as any);
          }

          const mappedValue = mapper(value);
          for (const id of [mappedValue].flat()) {
            ref(id as any);
          }

          return mappedValue;
        });
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
  createIndex<U>(mapper: (value: T) => U | U[]): ReadonlyMap<U, T> {
    const index = shallowReactive(new Map<U, T>());
    this._indexes.push({
      add: (value: T) => {
        effect((oldValue) => {
          for (const id of [oldValue].flat()) {
            index.delete(id as U);
          }

          const mappedValue = mapper(value);

          for (const id of [mappedValue].flat()) {
            index.set(id as U, value as any);
          }

          return mappedValue;
        });
      },
      delete: (value: T) => {
        const mappedValue = mapper(value);
        for (const id of [mappedValue].flat()) {
          index.delete(id as U);
        }
      },
    });

    return shallowReadonly(index);
  }
}
