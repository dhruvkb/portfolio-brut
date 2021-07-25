import type { Org } from '@/models/org'
import type { IResumeNode } from '@/models/resume'

import { ResumeNode } from '@/models/resume'

export const rangeIndicator = '\u2013'

export interface IPeriod {
  /**
   * the end date of the role, represented as a string pair with the month and
   * the year
   */
  start: [string, string]
  /**
   * the end date of the role, represented as a string pair with the month and
   * the year; can be undefined if the role is still active
   */
  end?: [string, string]
}

export interface IRole extends IResumeNode {
  period: IPeriod
  type: string
  title: string
}

/**
 * Each role represents a quantum of experience gained from an organisation.
 */
export class Role extends ResumeNode implements IRole {
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
      period,
      type,
      title,
      slug,
      aliases,
    } = role

    super(slug, aliases)
    this.children = undefined

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
   * Get the text representing the period when the role was active.
   * @returns the text representing the period when the role was active
   */
  get periodText(): string {
    const parts = []
    if (this.period.end) {
      const [startMonth, startYear] = this.period.start
      const [endMonth, endYear] = this.period.end
      if (startYear === endYear) {
        parts.push(startMonth)
      } else {
        parts.push(startMonth, startYear)
      }
      parts.push(rangeIndicator, endMonth, endYear)
    } else {
      parts.push(...this.period.start, rangeIndicator)
    }

    return parts.join(' ')
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
   * Get the path to the node from the 'experience/' directory.
   * @returns the path to the node from the 'experience/' directory
   */
  get nodePath(): string {
    return ['/experience', this.org.slug, this.slug].join('/')
  }
}
