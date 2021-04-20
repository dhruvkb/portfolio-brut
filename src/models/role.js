const rangeIndicator = '\u2013'

/**
 * Each role represents a quantum of experience gained from an organisation.
 */
export class Role {
  /**
   * Create an object of the class Role.
   *
   * @constructor
   * @constructs {Role}
   *
   * @param {Org} org - the Org instance representing the parent organisation
   * @param {Object} role - a plain object containing the role attributes
   */
  constructor(org, role) {
    this.org = org

    const {
      period,
      type,
      title,
      node,
    } = role
    this.period = period
    this.type = type
    this.title = title
    this.node = node
  }

  /**
   * Determine whether I am currently working in this role.
   *
   * @returns {boolean} whether I am currently working in this role
   */
  get isActive() {
    return this.period.end === undefined
  }

  /**
   * Get the text representing the period when the role was active.
   *
   * @returns {string} the text representing the period when the role was active
   */
  get periodText() {
    const parts = []
    if (this.isActive) {
      parts.push(...this.period.start, rangeIndicator)
    } else {
      const [startMonth, startYear] = this.period.start
      const [endMonth, endYear] = this.period.end
      if (startYear === endYear) {
        parts.push(startMonth)
      } else {
        parts.push(startMonth, startYear)
      }
      parts.push(rangeIndicator, endMonth, endYear)
    }

    return parts.join(' ')
  }

  /**
   * The name of the parent organisation of the role.
   *
   * @returns {String} the name of the parent organisation of the role
   */
  get orgName() {
    return this.org.name
  }

  /**
   * Get the path to the node from the experience/ directory.
   *
   * @returns {string} the path to the node from the experience/ directory
   */
  get nodePath() {
    return ['/experience', this.org.node, this.node].join('/')
  }
}
