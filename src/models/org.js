/**
 * A class that represents an organisation. Each organisation can be associated
 * with a number of roles.
 */
export class Org {
  /**
   * Create a new object of class Org.
   *
   * @constructor
   * @constructs {Org}
   *
   * @param {Object} org - a plain object containing the org attributes
   */
  constructor(org) {
    const {
      name,
      url,
      node,
    } = org
    this.name = name
    this.url = url
    this.node = node
  }
}
