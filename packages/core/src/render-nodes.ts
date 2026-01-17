export type NodeType = string;

export abstract class RenderTreeNode {
  readonly type: NodeType;
  prev: RenderTreeNode | null = null;
  next: RenderTreeNode | null = null;
  parent: RenderTreeNode | null = null;

  // DOM-like child anchors: only meaningful for container-like nodes
  firstChild: RenderTreeNode | null = null;
  lastChild: RenderTreeNode | null = null;

  constructor(type: NodeType) {
    this.type = type;
  }

  detach() {
    if (this.prev) {
      this.prev.next = this.next;
    }
    if (this.next) {
      this.next.prev = this.prev;
    }
    // If this was a head or tail of its parent, update the parent's anchors
    if (this.parent) {
      if (this.parent.firstChild === this) this.parent.firstChild = this.next;
      if (this.parent.lastChild === this) this.parent.lastChild = this.prev;
    }
    this.prev = null;
    this.next = null;
    this.parent = null;
  }

  insertBefore(newNode: RenderTreeNode, referenceNode: RenderTreeNode | null) {
    // Fast path: if newNode is not a fragment, simply detach and insert it
    // before the reference. This is the common/cheap operation.
    if (!(newNode instanceof FragmentNode)) {
      // detach single node from previous location
      newNode.detach();

      if (referenceNode === null) {
        // append to tail
        const tail = this.lastChild;
        if (tail) {
          tail.next = newNode;
          newNode.prev = tail;
          this.lastChild = newNode;
        } else {
          // empty container
          this.firstChild = newNode;
          this.lastChild = newNode;
          newNode.prev = null;
        }
        newNode.next = null;
      } else {
        const prev = referenceNode.prev;
        if (prev) {
          prev.next = newNode;
          newNode.prev = prev;
        } else {
          this.firstChild = newNode;
          newNode.prev = null;
        }
        newNode.next = referenceNode;
        referenceNode.prev = newNode;
      }

      newNode.parent = this;
      return;
    }

    // Fragment path: splice the fragment's firstChild..lastChild into the
    // container.
    const first = newNode.firstChild;
    const last = newNode.lastChild;
    if (!first || !last) return; // nothing to insert

    // If referenceNode is null, append to tail
    if (referenceNode === null) {
      const tail = this.lastChild;
      if (tail) {
        tail.next = first;
        first.prev = tail;
        this.lastChild = last;
      } else {
        // empty container
        this.firstChild = first;
        this.lastChild = last;
        first.prev = null;
      }
      last.next = null;
    } else {
      const prev = referenceNode.prev;
      if (prev) {
        prev.next = first;
        first.prev = prev;
      } else {
        this.firstChild = first;
        first.prev = null;
      }
      last.next = referenceNode;
      referenceNode.prev = last;
    }

    // Assign parent for the entire spliced range
    let cur: RenderTreeNode | null = first;
    while (cur) {
      cur.parent = this;
      if (cur === last) break;
      cur = cur.next;
    }

    // Consume fragment
    newNode.firstChild = null;
    newNode.lastChild = null;
  }

  insertAfter(newNode: RenderTreeNode, referenceNode: RenderTreeNode | null) {
    const refNext = referenceNode ? referenceNode.next : null;
    this.insertBefore(newNode, refNext);
  }

  appendChild(node: RenderTreeNode) {
    this.insertBefore(node, null);
  }
}

export class TextNode extends RenderTreeNode {
  contents: string;

  constructor(contents: string) {
    super("text");
    this.contents = contents;
  }

  toString() {
    return this.contents;
  }
}

export class ComponentNode extends RenderTreeNode {}

export class IntrinsicElementNode extends RenderTreeNode {}

/**
 * FragmentNode acts like a DOM DocumentFragment or a slot anchor. It owns a
 * contiguous internal chain of child nodes (firstChild..lastChild). Those
 * children can be spliced into a host list via insertBefore/insertAfter on a
 * host sibling node.
 */
export class FragmentNode extends RenderTreeNode {
  constructor(children?: RenderTreeNode[] | Iterable<RenderTreeNode>) {
    super("fragment");
    if (children) {
      for (const c of children) super.appendChild(c);
    }
  }

  // Remove this fragment's children from their current parent list (if any)
  // and leave them owned by the fragment (parent === this). If children aren't
  // attached, this is a no-op.
  removeChildrenFromParent() {
    if (!this.firstChild || !this.lastChild) return;

    const first = this.firstChild;
    const last = this.lastChild;

    const before = first.prev;
    const after = last.next;

    if (before) before.next = after;
    if (after) after.prev = before;

    // Clear outer prev/next to isolate the chain, keep internal links
    first.prev = null;
    last.next = null;

    // Ensure each child points to this fragment as parent
    let cur: RenderTreeNode | null = first;
    while (cur) {
      cur.parent = this;
      if (cur === last) break;
      cur = cur.next;
    }
  }

  toString() {
    const parts: string[] = [];
    let cur = this.firstChild;
    while (cur) {
      parts.push(String(cur));
      if (cur === this.lastChild) break;
      cur = cur.next;
    }
    return parts.join("");
  }
}
