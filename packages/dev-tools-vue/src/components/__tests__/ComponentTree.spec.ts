import { describe, it, expect, beforeEach } from 'vitest'
import { reactive } from 'vue'
import type { SerializedNode } from '@/lib/types'

// Mock the store
const mockState = reactive({
  nodes: new Map<number, SerializedNode>(),
})

const mockVisibleNodes = {
  value: [] as SerializedNode[],
}

// Mock the store module
vi.mock('@/lib/store', () => ({
  visibleNodes: mockVisibleNodes,
}))

// Import the functions we want to test after mocking
import ComponentTree from '../ComponentTree.vue'
import { mount } from '@vue/test-utils'

describe('ComponentTree fragment handling', () => {
  beforeEach(() => {
    mockVisibleNodes.value = []
  })

  it('should skip fragments and promote their children to parent level', () => {
    // Create test data with fragments
    const nodes: SerializedNode[] = [
      {
        id: 1,
        kind: 'component',
        component: 'App',
        parentId: null,
        children: [2], // references fragment
        props: {},
      },
      {
        id: 2,
        kind: 'fragment',
        parentId: 1,
        children: [3, 4], // fragment contains two children
      },
      {
        id: 3,
        kind: 'component',
        component: 'Child1',
        parentId: 2,
        children: [],
        props: {},
      },
      {
        id: 4,
        kind: 'component',
        component: 'Child2',
        parentId: 2,
        children: [],
        props: {},
      },
    ]

    mockVisibleNodes.value = nodes

    const wrapper = mount(ComponentTree)
    const vm = wrapper.vm as any

    // Test that getAllChildren skips the fragment and returns its children directly
    const appChildren = vm.getAllChildren(1)

    // Should contain Child1 and Child2, but not the fragment
    expect(appChildren).toHaveLength(2)
    expect(appChildren.map((child: any) => child.component)).toEqual(['Child1', 'Child2'])
    expect(appChildren.every((child: any) => child.kind !== 'fragment')).toBe(true)
  })

  it('should handle root level fragments by promoting their children', () => {
    const nodes: SerializedNode[] = [
      {
        id: 1,
        kind: 'fragment',
        parentId: null,
        children: [2, 3],
      },
      {
        id: 2,
        kind: 'component',
        component: 'Root1',
        parentId: 1,
        children: [],
        props: {},
      },
      {
        id: 3,
        kind: 'component',
        component: 'Root2',
        parentId: 1,
        children: [],
        props: {},
      },
    ]

    mockVisibleNodes.value = nodes

    const wrapper = mount(ComponentTree)
    const vm = wrapper.vm as any

    // Test that rootNodes skips the fragment and shows its children as roots
    expect(vm.rootNodes).toHaveLength(2)
    expect(vm.rootNodes.map((node: any) => node.component)).toEqual(['Root1', 'Root2'])
    expect(vm.rootNodes.every((node: any) => node.kind !== 'fragment')).toBe(true)
  })

  it('should handle nested fragments correctly', () => {
    const nodes: SerializedNode[] = [
      {
        id: 1,
        kind: 'component',
        component: 'App',
        parentId: null,
        children: [2],
        props: {},
      },
      {
        id: 2,
        kind: 'fragment',
        parentId: 1,
        children: [3],
      },
      {
        id: 3,
        kind: 'fragment',
        parentId: 2,
        children: [4, 5],
      },
      {
        id: 4,
        kind: 'component',
        component: 'DeepChild1',
        parentId: 3,
        children: [],
        props: {},
      },
      {
        id: 5,
        kind: 'component',
        component: 'DeepChild2',
        parentId: 3,
        children: [],
        props: {},
      },
    ]

    mockVisibleNodes.value = nodes

    const wrapper = mount(ComponentTree)
    const vm = wrapper.vm as any

    // Test that nested fragments are both skipped
    const appChildren = vm.getAllChildren(1)

    expect(appChildren).toHaveLength(2)
    expect(appChildren.map((child: any) => child.component)).toEqual(['DeepChild1', 'DeepChild2'])
    expect(appChildren.every((child: any) => child.kind !== 'fragment')).toBe(true)
  })

  it('should handle fragments mixed with regular children', () => {
    const nodes: SerializedNode[] = [
      {
        id: 1,
        kind: 'component',
        component: 'App',
        parentId: null,
        children: [2, 3, 4],
        props: {},
      },
      {
        id: 2,
        kind: 'component',
        component: 'RegularChild',
        parentId: 1,
        children: [],
        props: {},
      },
      {
        id: 3,
        kind: 'fragment',
        parentId: 1,
        children: [5, 6],
      },
      {
        id: 4,
        kind: 'intrinsic',
        tag: 'div',
        parentId: 1,
        children: [],
        props: {},
      },
      {
        id: 5,
        kind: 'component',
        component: 'FragmentChild1',
        parentId: 3,
        children: [],
        props: {},
      },
      {
        id: 6,
        kind: 'component',
        component: 'FragmentChild2',
        parentId: 3,
        children: [],
        props: {},
      },
    ]

    mockVisibleNodes.value = nodes

    const wrapper = mount(ComponentTree)
    const vm = wrapper.vm as any

    const appChildren = vm.getAllChildren(1)

    // Should have RegularChild, FragmentChild1, FragmentChild2, and div (4 total)
    expect(appChildren).toHaveLength(4)

    const childNames = appChildren.map((child: any) => child.component || child.tag || child.kind)

    expect(childNames).toEqual(['RegularChild', 'FragmentChild1', 'FragmentChild2', 'div'])
    expect(appChildren.every((child: any) => child.kind !== 'fragment')).toBe(true)
  })

  it('should filter out empty text nodes', () => {
    // Setup test data with empty text nodes
    mockVisibleNodes.value = [
      {
        id: 1,
        kind: 'component',
        component: 'TestComponent',
        parentId: null,
        children: ['', '   ', 'Hello World', '\n\t  ', 'Valid Text'],
        props: {},
      },
    ]

    const wrapper = mount(ComponentTree)
    const vm = wrapper.vm as any

    // Get children of the component node
    const children = vm.getAllChildren(1)

    // Should only have non-empty text nodes
    expect(children).toHaveLength(2)
    expect(children[0]).toEqual({
      id: '1-text-2',
      kind: 'text',
      text: 'Hello World',
    })
    expect(children[1]).toEqual({
      id: '1-text-4',
      kind: 'text',
      text: 'Valid Text',
    })
  })

  it('should filter out empty text nodes from fragment children', () => {
    // Setup test data with fragments containing empty text
    mockVisibleNodes.value = [
      {
        id: 1,
        kind: 'component',
        component: 'TestComponent',
        parentId: null,
        children: [2],
        props: {},
      },
      {
        id: 2,
        kind: 'fragment',
        parentId: 1,
        children: ['', 'Valid Text', '   ', 3],
      },
      {
        id: 3,
        kind: 'intrinsic',
        tag: 'span',
        parentId: 2,
        children: [],
        props: {},
      },
    ]

    const wrapper = mount(ComponentTree)
    const vm = wrapper.vm as any

    // Get children of the component node
    const children = vm.getAllChildren(1)

    // Should skip the fragment and only include non-empty text and the span
    expect(children).toHaveLength(2)
    expect(children[0]).toEqual({
      id: '2-text-1',
      kind: 'text',
      text: 'Valid Text',
    })
    expect(children[1]).toEqual({
      id: 3,
      kind: 'intrinsic',
      tag: 'span',
      parentId: 2,
      children: [],
      props: {},
    })
  })

  it('should format props correctly', () => {
    // Setup test data with various prop types
    mockVisibleNodes.value = [
      {
        id: 1,
        kind: 'component',
        component: 'TestComponent',
        parentId: null,
        children: [],
        props: {
          stringProp: 'hello',
          numberProp: 42,
          booleanProp: true,
          nullProp: null,
          undefinedProp: undefined,
          objectProp: { key: 'value', nested: { count: 3 } },
          arrayProp: [1, 2, 'three'],
          children: 'This should be filtered out',
        },
      },
      {
        id: 2,
        kind: 'intrinsic',
        tag: 'div',
        parentId: null,
        children: [],
        props: {
          className: 'my-class',
          disabled: false,
          count: 0,
          children: ['child1', 'child2'],
        },
      },
    ]

    const wrapper = mount(ComponentTree)
    const vm = wrapper.vm as any

    // Test component props formatting (should exclude children)
    const componentPropsDesc = vm.getPropsDescription(mockVisibleNodes.value[0])
    expect(componentPropsDesc).toBe(
      'stringProp="hello" numberProp=42 booleanProp=true nullProp=null undefinedProp=undefined objectProp={object} arrayProp=[array]',
    )

    // Test intrinsic element props formatting (should exclude children)
    const intrinsicPropsDesc = vm.getPropsDescription(mockVisibleNodes.value[1])
    expect(intrinsicPropsDesc).toBe('className="my-class" disabled=false count=0')
  })

  it('should return empty string for nodes without props', () => {
    mockVisibleNodes.value = [
      {
        id: 1,
        kind: 'component',
        component: 'TestComponent',
        parentId: null,
        children: [],
        props: {},
      },
    ]

    const wrapper = mount(ComponentTree)
    const vm = wrapper.vm as any

    const propsDesc = vm.getPropsDescription(mockVisibleNodes.value[0])
    expect(propsDesc).toBe('')
  })
})
