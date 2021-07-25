import type { IProject } from '@/models/project'
import type { IResumeNode } from '@/models/resume'

import { Project } from '@/models/project'
import { ResumeNode } from '@/models/resume'

/**
 * The interface for the `Epic` class, used when representing POJO instances of
 * `Epic` that have been parsed from JSON.
 */
export interface IEpic extends IResumeNode {
  name: string

  children: IProject[]
}

/**
 * A class that represents an epic. Each epic can be associated with a number
 * of projects.
 */
export class Epic extends ResumeNode implements IEpic {
  name: string

  children: Project[]

  /**
   * Create a new object of class `Epic`.
   *
   * @param epic - a POJO containing the `Epic` attributes
   */
  constructor(epic: IEpic) {
    const {
      name,
      slug,
      aliases,
    } = epic

    super(slug, aliases)
    this.children = []

    this.name = name
  }

  /**
   * Parse the given epic as POJO to an instance of the `Epic` class. Also
   * converts projects as POJOs to instances of the `Project` class, with the
   * bidirectional parent-child mapping.
   *
   * @param epicPojo - the POJO to parse
   * @returns the `Epic` instance parsed from the POJO
   */
  static parse(epicPojo: IEpic): Epic {
    const epic = new Epic(epicPojo)

    epicPojo.children?.forEach((projectPojo) => {
      const project = new Project(epic, projectPojo)
      epic.children.push(project)
    })

    return epic
  }
}
