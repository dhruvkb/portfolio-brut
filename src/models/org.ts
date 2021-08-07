import type { IRole } from '@/models/role'
import type { IResumeItem } from '@/models/resume'

import { Role } from '@/models/role'
import { ResumeItem } from '@/models/resume'

import { FsNodeType } from 'seeelaye'

/**
 * The interface of the `Org` class, used when representing POJO instances of
 * `Org` that have been parsed from JSON.
 */
export interface IOrg extends IResumeItem {
  name: string
  url: string
  icon: string

  children: IRole[]
}

/**
 * A class that represents an organisation. Each organisation can be associated
 * with a number of roles.
 */
export class Org extends ResumeItem {
  name: string
  url: string
  icon: string

  childMap: Record<string, Role>

  /**
   * Create a new object of class `Org`.
   *
   * @param org - a POJO containing the `Org` attributes
   */
  constructor(org: IOrg) {
    const {
      slug,
      name,
      url,
      icon,
      node: {
        name: nodeName,
        aliases: nodeAliases,
      },
    } = org

    super(slug, FsNodeType.FOLDER, nodeName, nodeAliases)
    this.childMap = {}

    this.name = name
    this.url = url
    this.icon = icon
  }

  /**
   * Parse the given organisation as POJO to an instance of the `Org` class.
   * Also converts roles as POJOs to instances of the `Role` class, with the
   * bidirectional parent-child mapping.
   *
   * @param orgPojo - the POJO to parse
   * @returns the `Org` instance parsed from the POJO
   */
  static parse(orgPojo: IOrg): Org {
    const org = new Org(orgPojo)
    orgPojo.children.forEach((rolePojo) => {
      const role = new Role(org, rolePojo)
      org.childMap[role.slug] = role
    })
    return org
  }
}
