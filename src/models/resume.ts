import { FsNode, FsNodeType } from 'seeelaye'

export interface IResumeNode {
  slug: string
  aliases?: string[]
}

/**
 * Since experience and work is parsed from JSON data files, this model handles
 * the conversion of `Epic`, `Project`, `Org` and `Role` instances to the
 * appropriate `FsNode` instance.
 */
export class ResumeNode implements IResumeNode {
  slug: string
  aliases: string[]

  children?: ResumeNode[]

  /**
   * Create a new object of class `ResumeNode`.
   *
   * @param slug - the primary name of the FS node associated with this node
   * @param aliases - a list of alternative names of this node
   */
  constructor(slug: string, aliases: string[] = []) {
    this.slug = slug
    this.aliases = aliases
  }

  /**
   * Get this resume node as an `FsNode` instance. This instance will be used
   * to build and populate see·el·aye's FS tree. Child nodes are automatically
   * converted as well.
   *
   * @returns this resume node as an `FsNode` instance
   */
  get asFsNode(): FsNode {
    const type = this.children ? FsNodeType.FOLDER : FsNodeType.FILE
    const node = new FsNode(type, this.slug, this.aliases)

    if (this.children) {
      this.children.forEach((child) => {
        const childNode = child.asFsNode
        childNode.parent = node
        node.children.push(childNode)
      })
    }

    return node
  }
}
