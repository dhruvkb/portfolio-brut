import type { IRole } from '@/models/role'
import type { IResumeNode } from '@/models/resume'

import { Role } from '@/models/role'
import { ResumeNode } from '@/models/resume'

/**
 * The interface of the `Org` class, used when representing POJO instances of
 * `Org` that have been parsed from JSON.
 */
export interface IOrg extends IResumeNode {
  name: string
  url: string
  icon: string

  children: IRole[]
}

/**
 * A class that represents an organisation. Each organisation can be associated
 * with a number of roles.
 */
export class Org extends ResumeNode implements IOrg {
  name: string
  url: string
  icon: string

  children: Role[]

  /**
   * Create a new object of class `Org`.
   *
   * @param org - a POJO containing the `Org` attributes
   */
  constructor(org: IOrg) {
    const {
      name,
      url,
      icon,
      slug,
      aliases,
    } = org

    super(slug, aliases)
    this.children = []

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

    orgPojo.children?.forEach((rolePojo) => {
      const role = new Role(org, rolePojo)
      org.children.push(role)
    })

    return org
  }
}
