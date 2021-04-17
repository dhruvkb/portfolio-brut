/**
 * A class that represents an epic. Each epic can be associated with a number
 * of projects.
 */
export class Epic {
  /**
   * Create a new object of class Epic.
   *
   * @constructor
   * @constructs {Epic}
   *
   * @param {Object} epic - a plain object containing the epic attributes
   */
  constructor(epic) {
    const { name } = epic
    this.name = name
  }
}
