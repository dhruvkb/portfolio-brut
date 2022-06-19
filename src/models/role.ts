import type { RouteLocation } from 'vue-router'

import type { Org } from '@/models/org'
import type { IResumeItem } from '@/models/resume'
import { ResumeItem } from '@/models/resume'

import { FsNodeType } from 'seeelaye'

import router from '@/router'

export const rangeIndicator = '\u2013'

export interface IPeriod {
  /**
   * the start date of the role, represented as a string pair with the month and
   * the year
   */
  start: string[]
  /**
   * the end date of the role, represented as a string pair with the month and
   * the year; can be undefined if the role is still active
   */
  end?: string[]
}

export interface IRole extends IResumeItem {
  period: IPeriod
  type: string
  title: string
}

/**
 * Each role represents a quantum of experience gained from an organisation.
 */
export class Role extends ResumeItem<never> implements IRole {
  org: Org

  period: IPeriod
  type: string
  title: string

  /**
   * Create an object of the class `Role`.
   *
   * @param org - the `Org` instance representing the parent organisation
   * @param role - - a POJO containing the `Role` attributes
   */
  constructor(org: Org, role: IRole) {
    const {
      slug,
      period,
      type,
      title,
      node: {
        name: nodeName,
        aliases: nodeAliases,
      },
    } = role

    super(slug, FsNodeType.FILE, nodeName, nodeAliases)

    this.period = period
    this.type = type
    this.title = title

    this.org = org
  }

  /**
   * Get whether I am currently working in this role.
   * @returns whether I am currently working in this role
   */
  get isActive(): boolean {
    return this.period.end === undefined
  }

  /**
   * Get the text representing the period when the role began.
   * @returns the text representing the period when the role began
   */
  get periodStart(): string {
    return this.period.start.join(' ')
  }

  /**
   * Get the text representing the period when the role ended. Returns a blank
   * string if the role is active.
   *
   * @returns the text representing the period when the role ended
   */
  get periodEnd(): string {
    if (!this.period.end) {
      return ''
    }
    return this.period.end.join(' ')
  }

  /**
   * Get the name of the parent organisation of the role.
   * @returns the name of the parent organisation of the role
   */
  get orgName(): string {
    return this.org.name
  }

  /**
   * Get the name of the icon of the parent organisation of the role as defined
   * in Simple Icons.
   *
   * @returns the name of the icon of the parent organisation of the role
   */
  get orgIcon(): string {
    return this.org.icon
  }

  /**
   * Get whether this role is the last child of the parent organisation.
   * @returns whether this role is the last child of the parent organisation
   */
  get isLast(): boolean {
    const siblings = this.org.children
    return siblings.indexOf(this) === siblings.length - 1
  }

  /**
   * Get the router location for this item.
   * @returns the URL route location for the role
   */
  get itemUrl(): RouteLocation {
    return router.resolve({
      name: 'experience',
      params: {
        rolePath: [this.org.slug, this.slug].join('/'),
      },
    })
  }
}
