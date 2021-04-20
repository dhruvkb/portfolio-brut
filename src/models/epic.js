import { Project } from '@/models/project'

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
    const {
      name,
      slug,
      aliases,
    } = epic
    this.name = name

    this.slug = slug
    this.aliases = aliases

    this.projects = []
  }

  /**
   * Store the given project as a child of this epic.
   *
   * @param {Project} project - the project to register as a child of this epic
   */
  addProject(project) {
    this.projects.push(project)
  }

  static parse(epicsPojo) {
    const epics = []
    epicsPojo.forEach((epicPojo) => {
      const epic = new Epic(epicPojo)
      epicPojo.projects.forEach((projectPojo) => {
        const project = new Project(epic, projectPojo)
        epic.addProject(project)
      })
      epics.push(epic)
    })
    return epics
  }
}
