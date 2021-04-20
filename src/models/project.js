/**
 * Each project represents a quantum of work done under an epic.
 */
export class Project {
  /**
   * Create an object of the class Project.
   *
   * @constructor
   * @constructs {Project}
   *
   * @param {Epic} epic - the Epic instance representing the parent epic
   * @param {Object} project - a plain object containing the project attributes
   */
  constructor(epic, project) {
    this.epic = epic

    const {
      title,
      url,
      technologies,
      node,
    } = project
    this.title = title
    this.url = url
    this.technologies = technologies
    this.node = node
  }

  /**
   * Get the technologies used in the project, separated by commas.
   *
   * @returns {string} the technologies used in the project, separated by commas
   */
  get technologiesText() {
    return this.technologies.join(', ')
  }

  /**
   * Get the name of the parent epic of the project.
   *
   * @returns {String} the name of the parent epic of the project
   */
  get epicName() {
    return this.epic.name
  }

  /**
   * Get the path to the node from the work/ directory.
   *
   * @returns {string} the path to the node from the work/ directory
   */
  get nodePath() {
    return ['/work', this.epic.node, this.node].join('/')
  }
}
