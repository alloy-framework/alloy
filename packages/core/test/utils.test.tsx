import { computed, ref, triggerRef } from "@vue/reactivity";
import { describe, expect, it } from "vitest";
import { join, mapJoin } from "../src/utils.js";
import "../testing/extend-expect.js";

describe("mapJoin", () => {
  it("can map a map", () => {
    const map = new Map([
      ["a", 1],
      ["b", 2],
    ]);

    function Foo(props: { key: string; value: number }) {
      return <>Key: {props.key}, Value: {props.value}</>;
    }

    const joined = mapJoin(
      () => map,
      (key, value) => <Foo key={key} value={value} />,
    );

    expect(joined()).toRenderTo(`
      Key: a, Value: 1
      Key: b, Value: 2
    `);
  });

  it("can map an array", () => {
    const arr = [1, 2];

    function Foo(props: { value: number }) {
      return <>Value: {props.value}</>;
    }

    const joined = mapJoin(
      () => arr,
      (value) => <Foo value={value} />,
    );

    console.log(joined());

    expect(joined()).toRenderTo(`
      Value: 1
      Value: 2
    `);
  });

  it("can map an array reactively (without render)", () => {
    let callCount = 0;
    const arr = ref([1, 2]);

    function Foo(props: { value: number }) {
      return <>Value: {props.value}</>;
    }

    const joined = mapJoin(
      () => arr.value,
      (value) => {
        callCount++;
        return <Foo value={value} />;
      },
    );

    const len = computed(() => {
      return joined().length;
    });
    expect(len.value).toBe(4);
    expect(callCount).toBe(2);
    arr.value.push(3);
    triggerRef(arr);
    expect(len.value).toBe(6);
    expect(callCount).toBe(3);
  });

  it("can map an array reactively (with render)", () => {
    let callCount = 0;
    const arr = ref([1, 2]);

    function Foo(props: { value: number }) {
      callCount++;
      return <>Value: {props.value}</>;
    }

    const joined = mapJoin(
      () => arr.value,
      (value) => {
        return <Foo value={value} />;
      },
    );

    expect(callCount).toBe(2);
    arr.value.push(3);
    triggerRef(arr);
    expect(len.value).toBe(6);
    expect(callCount).toBe(3);
  });
  it("can map a joiner", () => {
    const arr = [1, 2];

    function Foo(props: { value: number }) {
      return <>Value: {props.value}</>;
    }

    const joined = mapJoin(arr, (value) => <Foo value={value} />, {
      joiner: "-",
    });

    expect(joined).toRenderTo(`
      Value: 1-Value: 2
    `);
  });

  it("can map an ender", () => {
    const arr = [1, 2];

    function Foo(props: { value: number }) {
      return <>Value: {props.value}</>;
    }

    const joined = mapJoin(arr, (value) => <Foo value={value} />, {
      joiner: "-",
      ender: ";",
    });

    expect(joined).toRenderTo(`
      Value: 1-Value: 2;
    `);
  });

  it("can map using an iterator", () => {
    const arr = [1, 2].values();

    function Foo(props: { value: number }) {
      return <>Value: {props.value}</>;
    }

    const joined = mapJoin(arr, (value) => <Foo value={value} />, {
      joiner: "-",
      ender: ";",
    });

    expect(joined).toRenderTo(`
      Value: 1-Value: 2;
    `);
  });
});

describe("join", () => {
  it("can join an array", () => {
    const arr = [<Foo value={1} />, <Foo value={2} />];

    function Foo(props: { value: number }) {
      return <>Value: {props.value}</>;
    }

    const joined = join(arr);

    expect(joined).toRenderTo(`
      Value: 1
      Value: 2
    `);
  });

  it("can join an array with a joiner", () => {
    const arr = [<Foo value={1} />, <Foo value={2} />];

    function Foo(props: { value: number }) {
      return <>Value: {props.value}</>;
    }

    const joined = join(arr, { joiner: "-" });

    expect(joined).toRenderTo(`
      Value: 1-Value: 2
    `);
  });

  it("can join an array with an ender", () => {
    const arr = [<Foo value={1} />, <Foo value={2} />];

    function Foo(props: { value: number }) {
      return <>Value: {props.value}</>;
    }

    const joined = join(arr, { joiner: "-", ender: ";" });

    expect(joined).toRenderTo(`
      Value: 1-Value: 2;
    `);
  });

  it("can join using an iterator", () => {
    const arrIter = [<Foo value={1} />, <Foo value={2} />].values();

    function Foo(props: { value: number }) {
      return <>Value: {props.value}</>;
    }

    const joined = join(arrIter, { joiner: "-", ender: ";" });

    expect(joined).toRenderTo(`
      Value: 1-Value: 2;
    `);
  });
});
