import type { IProject } from '@/models/project'
import type { IResumeItem } from '@/models/resume'

import { Project } from '@/models/project'
import { ResumeItem } from '@/models/resume'

import { FsNodeType } from 'seeelaye'

/**
 * The interface for the `Epic` class, used when representing POJO instances of
 * `Epic` that have been parsed from JSON.
 */
export interface IEpic extends IResumeItem {
  name: string

  children: IProject[]
}

/**
 * A class that represents an epic. Each epic can be associated with a number
 * of projects.
 */
export class Epic extends ResumeItem<Project> {
  name: string

  childMap: Record<string, Project>

  /**
   * Create a new object of class `Epic`.
   *
   * @param epic - a POJO containing the `Epic` attributes
   */
  constructor(epic: IEpic) {
    const {
      slug,
      name,
      node: {
        name: nodeName,
        aliases: nodeAliases,
      },
    } = epic

    super(slug, FsNodeType.FOLDER, nodeName, nodeAliases)
    this.childMap = {}

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
    epicPojo.children.forEach((projectPojo) => {
      const project = new Project(epic, projectPojo)
      epic.childMap[project.slug] = project
    })
    return epic
  }
}
