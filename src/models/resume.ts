import { FsNode, FsNodeType } from 'seeelaye'

export type IResumeNode = Pick<FsNode, 'name' | 'aliases'>

export interface IResumeItem {
  slug: string
  node: IResumeNode
}

/**
 * Since experience and work is parsed from JSON data files, this model handles
 * the conversion of `Epic`, `Project`, `Org` and `Role` instances to the
 * appropriate `FsNode` instance.
 */
export class ResumeItem implements IResumeItem {
  slug: string
  node: FsNode

  childMap?: Record<string, ResumeItem>

  /**
   * Create a new object of class `ResumeNode`.
   *
   * @param slug - a part of the URL path that refers to this resume item
   * @param nodeType - the type of the FS node associated with this resume item
   * @param nodeName - the name of the FS node associated with this resume item
   * @param nodeAliases - a list of alternative names of this node
   */
  constructor(
    slug: string,
    nodeType: FsNodeType,
    nodeName: string,
    nodeAliases: string[] = [],
  ) {
    this.slug = slug
    this.node = new FsNode(nodeType, nodeName, nodeAliases)
  }

  get children(): ResumeItem[] {
    if (!this.childMap) {
      return []
    }
    return Object.values(this.childMap)
  }
}
