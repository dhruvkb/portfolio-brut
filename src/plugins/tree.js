export const nodeType = Object.freeze({
  FOLDER: 'folder',
  FILE: 'file',
})

/**
 * A class that implements one node in a file-system tree. Each node may either
 * be a file or a folder and may have children if it is a folder.
 */
export class Tree {
  /**
   * Create a new object of class Node.
   *
   * @constructor
   * @constructs {Node}
   *
   * @param {string} type - whether the node represents a file or a folder
   * @param {string} name - the name of the Node
   * @param {Array} aliases - the list of alternative names of the Node
   */
  constructor(type, name, aliases = []) {
    this.type = type

    this.name = name
    this.aliases = aliases

    this.parent = null
    this.children = []
  }

  /**
   * Determine whether this node represents a file system folder.
   *
   * @return {boolean} whether this node represents a file system folder
   */
  get isFolder() {
    return this.isType(nodeType.FOLDER)
  }

  /**
   * Determine whether this node represents a file system file.
   *
   * @return {boolean} whether this node represents a file system file
   */
  get isFile() {
    return this.isType(nodeType.FILE)
  }

  /**
   * Determine whether this node is the root of the file system.
   *
   * @return {boolean} whether this node is the root of the file system
   */
  get isRoot() {
    return this.parent === this
  }

  /**
   * Check if the given name is either the primary name of the current node or
   * one of its aliases.
   *
   * @param {string} givenName - the name which is to be checked for a match
   * @returns {boolean} whether the given name is one of the Node's valid names
   */
  hasName(givenName) {
    const name = givenName.toLowerCase()
    return this.name.toLowerCase() === name
      || this.aliases
        .map(x => x.toLowerCase())
        .includes(name)
  }

  /**
   * Make the current node the root node of the tree. The property of a root
   * node is to be its own parent, essentially allowing infinite upward
   * traversal.
   */
  makeRoot() {
    this.setParent(this)
  }

  /**
   * Add the given node to the as a child of the current node. To update the
   * reference to the parent node in the child object, use the function
   * {@link Node#setParent}.
   *
   * @param {Tree} node - the node to add as a child of the current node
   */
  appendChild(node) {
    this.children.push(node)
  }

  /**
   * Set the given node as the parent of the current node. To add the current
   * node to the set containing its siblings, use the function
   * {@link Node#appendChild}.
   *
   * @param {Tree} node - the node to set as a parent of the current node
   */
  setParent(node) {
    this.parent = node
  }

  /**
   * Traverse the tree using the DFT algorithm. This may contribute to a loss
   * in performance but it requires less code.
   *
   * The argument to the function is a function that accepts a node and returns
   * a Boolean value, which if falsy, stops further traversal.
   *
   * @param {function} func - the function to execute on each node
   */
  traverse(func) {
    let shouldContinue = func(this)
    if (!shouldContinue) {
      return shouldContinue
    }

    Array.from(this.children.values()).every((child) => {
      shouldContinue = child.traverse(func)
      return shouldContinue
    })
    return shouldContinue
  }

  /**
   * Determine whether this node is of the given type.
   *
   * @param {string} type - the type to compare the node against
   * @return {boolean} whether this node represents a file system folder
   */
  isType(type) {
    return this.type === type
  }
}

export const parse = (pojo) => {
  const node = new Tree(
    pojo.type,
    pojo.name,
    pojo.aliases,
  )
  if (pojo.children && pojo.children instanceof Array) {
    pojo.children.forEach((childPojo) => {
      const child = parse(childPojo)
      node.appendChild(child)
      child.setParent(node)
    })
  }
  if (pojo.isRoot) {
    node.makeRoot()
  }
  return node
}
