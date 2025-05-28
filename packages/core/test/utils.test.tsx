import { computed, ref, triggerRef } from "@vue/reactivity";
import { describe, expect, it } from "vitest";
import { Children } from "../src/index.js";
import { renderTree } from "../src/render.js";
import { flushJobs } from "../src/scheduler.js";
import { children, join, mapJoin } from "../src/utils.js";
import "../testing/extend-expect.js";

describe("mapJoin", () => {
  it("can map a map", () => {
    const map = new Map([
      ["a", 1],
      ["b", 2],
    ]);

    function Foo(props: { key: string; value: number }) {
      return (
        <>
          Key: {props.key}, Value: {props.value}
        </>
      );
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

    expect(joined()).toRenderTo(`
      Value: 1
      Value: 2
    `);
  });

  it("can map an array reactively (without render)", () => {
    const arr = ref([1, 2]);

    function Foo(props: { value: number }) {
      return <>Value: {props.value}</>;
    }

    const joined = mapJoin(
      () => arr.value,
      (value) => {
        return <Foo value={value} />;
      },
    );

    const len = computed(() => {
      return joined().length;
    });
    expect(len.value).toBe(4);
    arr.value.push(3);
    triggerRef(arr);
    expect(len.value).toBe(6);
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

    renderTree(joined);

    expect(callCount).toBe(2);
    arr.value.push(3);
    triggerRef(arr);
    flushJobs();
    expect(callCount).toBe(3);
  });
  it("can map a joiner", () => {
    const arr = [1, 2];

    function Foo(props: { value: number }) {
      return <>Value: {props.value}</>;
    }

    const joined = mapJoin(
      () => arr,
      (value) => <Foo value={value} />,
      {
        joiner: "-",
      },
    );

    expect(joined).toRenderTo(`
      Value: 1-Value: 2
    `);
  });

  it("can map an ender", () => {
    const arr = [1, 2];

    function Foo(props: { value: number }) {
      return <>Value: {props.value}</>;
    }

    const joined = mapJoin(
      () => arr,
      (value) => <Foo value={value} />,
      {
        joiner: "-",
        ender: ";",
      },
    );

    expect(joined).toRenderTo(`
      Value: 1-Value: 2;
    `);
  });

  it("can map using an iterator", () => {
    const arr = [1, 2].values();

    function Foo(props: { value: number }) {
      return <>Value: {props.value}</>;
    }

    const joined = mapJoin(
      () => arr,
      (value) => <Foo value={value} />,
      {
        joiner: "-",
        ender: ";",
      },
    );

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

describe("children", () => {
  let resolvedChildren: Children;
  function ResolveChildren(props: any) {
    resolvedChildren = children(() => props.children, {
      preserveFragments: props.preserveFragments,
    })();
  }

  it("resolves a single child", () => {
    renderTree(<ResolveChildren>1</ResolveChildren>);
    expect(resolvedChildren).toEqual("1");
  });

  it("resolves multiple children", () => {
    renderTree(<ResolveChildren>1{"2"}3</ResolveChildren>);
    expect(resolvedChildren).toEqual(["1", "2", "3"]);
  });

  it("resolves fragments by default", () => {
    renderTree(
      <ResolveChildren>
        <>1</>
        <>2</>
        <>3</>
      </ResolveChildren>,
    );
    expect(resolvedChildren).toEqual(["1", "2", "3"]);
  });

  it("preserves fragments if asked", () => {
    renderTree(
      <ResolveChildren preserveFragments>
        <>1</>
        <>2</>
        <>3</>
      </ResolveChildren>,
    );
    expect(resolvedChildren).toEqual([["1"], ["2"], ["3"]]);
  });
});
