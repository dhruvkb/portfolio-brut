export const nodeType = Object.freeze({
  FOLDER: 'folder',
  FILE: 'file',
})

export const specialNames = Object.freeze({
  CURRENT_DIR: ['.', './'],
  PARENT_DIR: ['..', '../'],
})

export const extensionLang = Object.freeze({
  java: 'java',
  js: 'javascript',
  md: 'markdown',
  py: 'python',
  rb: 'ruby',
  rst: 'markdown', // TODO: Use a proper language parser
  tex: 'latex',
  vue: ['xml', 'javascript'],
  yml: 'yaml',
})

const nameAndExtension = (fullName) => {
  if (!fullName.includes('.')) {
    return [fullName, null]
  }
  const [extension] = fullName
    .split('.')
    .slice(-1)
  const regex = new RegExp(`.${extension}$`)
  const name = fullName.replace(regex, '')
  return [name, extension]
}

/**
 * A class that implements one node in a file-system tree. Each node may either
 * be a file or a folder and may have children if it is a folder.
 */
export class Tree {
  /**
   * Create a new object of class Tree.
   *
   * @constructor
   * @constructs {Tree}
   *
   * @param {string} type - whether the node represents a file or a folder
   * @param {string} name - the name of the node
   * @param {Array} aliases - the list of alternative names of the node
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
   * Get all forms of the name for this node. This includes the primary name
   * and all aliases, with and without the extension.
   *
   * In addition to the name and all aliases, for
   * - files, the name without the extension
   * - folders, the name with the trailing slash
   * - the root node, a single slash
   * is also accepted.
   *
   * Duplicates names are removed.
   *
   * @returns {Array} the list of all valid names for the node
   */
  get allNames() {
    const allNames = [this.name, ...this.aliases]
    if (this.isFile) {
      allNames.forEach((name) => {
        const [nameMinusExtension] = nameAndExtension(name)
        allNames.push(nameMinusExtension)
      })
    }
    if (this.isFolder) {
      allNames.forEach((name) => {
        allNames.push(`${name}/`)
      })
    }
    if (this.isRoot) {
      allNames.push('/')
    }
    return Array.from(new Set(allNames))
  }

  /**
   * Get the language of the file based on the extension.
   *
   * @return {Array} the language of the file based on the extension
   */
  get languages() {
    if (this.isFolder) {
      return []
    }

    const [, extension] = nameAndExtension(this.name)
    const language = extensionLang[extension]
    if (Array.isArray(language)) {
      return language
    }
    return [language]
  }

  /**
   * Get the name of the node to use for autocompletion.
   *
   * During autocompletion,
   * - folders are completed with a trailing slash
   *     Subsequent suggestions consider children of the folder.
   * - files are completed with a trailing space
   *     Indicates that the argument is completed.
   *
   * @returns {string} the name of the node to use for autocompletion
   */
  get autocompleteName() {
    if (this.isFolder) {
      return `${this.name}/`
    }
    return `${this.name} `
  }

  /**
   * Check if the given name is either the primary name of the current node or
   * one of its aliases.
   *
   * @param {string} givenName - the name which is to be checked for a match
   * @returns {boolean} whether the given name is one of the node's valid names
   */
  hasName(givenName) {
    return this.allNames
      .map(name => name.toLowerCase())
      .includes(givenName.toLowerCase())
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
   * {@link Tree#setParent}.
   *
   * @param {Tree} node - the node to add as a child of the current node
   */
  appendChild(node) {
    this.children.push(node)
  }

  /**
   * Set the given node as the parent of the current node. To add the current
   * node to the set containing its siblings, use the function
   * {@link Tree#appendChild}.
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

    Array.from(this.children.values())
      .every((child) => {
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

  /**
   * Bind two nodes in a parent-child relationship. This is a convenience method
   * that invokes {@link Tree#appendChild} on the parent and
   * {@link Tree#setParent} on the child.
   *
   * @param {Tree} parent - the node that should be set as the parent
   * @param {Tree} child - the node that should be appended as a child
   */
  static makeParentChild(parent, child) {
    parent.appendChild(child)
    child.setParent(parent)
  }

  static parse(pojo) {
    const type = (pojo.children && pojo.children instanceof Array)
      ? nodeType.FOLDER
      : nodeType.FILE
    const node = new Tree(
      type,
      pojo.slug,
      pojo.aliases,
    )
    if (pojo.isRoot) {
      node.makeRoot()
    }
    if (node.isFolder) {
      pojo.children.forEach((childPojo) => {
        const child = Tree.parse(childPojo)
        Tree.makeParentChild(node, child)
      })
    }
    return node
  }
}
