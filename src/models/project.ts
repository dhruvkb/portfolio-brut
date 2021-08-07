import type { RouteLocation } from 'vue-router'

import type { Epic } from '@/models/epic'
import type { IResumeItem } from '@/models/resume'

import { FsNodeType } from 'seeelaye'

import { ResumeItem } from '@/models/resume'

import router from '@/router'

export interface ITechnology {
  /**
   * the name of the icon for the technology as defined in Simple Icons
   */
  icon: string
  /**
   * the stylised display name of the technology
   */
  name: string
}

export interface IProject extends IResumeItem {
  title: string
  url: string
  technologies: ITechnology[]
}

/**
 * Each project represents a quantum of work done under an epic.
 */
export class Project extends ResumeItem implements IProject {
  epic: Epic

  title: string
  url: string
  technologies: ITechnology[]

  /**
   * Create an object of the class `Project`.
   *
   * @param epic - the `Epic` instance representing the parent epic
   * @param project - - a POJO containing the `Project` attributes
   */
  constructor(epic: Epic, project: IProject) {
    const {
      slug,
      title,
      url,
      technologies,
      node: {
        name: nodeName,
        aliases: nodeAliases,
      },
    } = project

    super(slug, FsNodeType.FILE, nodeName, nodeAliases)
    this.childMap = undefined

    this.title = title
    this.url = url
    this.technologies = technologies

    this.epic = epic
  }

  /**
   * Get the technologies used in the project, separated by commas.
   * @returns the technologies used in the project, separated by commas
   */
  get technologiesText(): string {
    return this.technologies.map((tech) => tech.name).join(', ')
  }

  /**
   * Get the icon of the first technology listed, assumed to be the primary
   * icon for the project.
   *
   * @returns the name of the icon of the first listed technology
   */
  get technologyIcon(): string {
    return this.technologies[0].icon
  }

  /**
   * Get the name of the parent epic of the project.
   * @returns the name of the parent epic of the project
   */
  get epicName(): string {
    return this.epic.name
  }

  /**
   * Get whether this project is the last child of the parent epic.
   * @returns whether this project is the last child of the parent epic
   */
  get isLast(): boolean {
    const siblings = this.epic.children
    return siblings.indexOf(this) === siblings.length - 1
  }

  /**
   * Get the router location for this item.
   * @returns the URL route location for the work
   */
  get itemUrl(): RouteLocation {
    return router.resolve({
      name: 'work',
      params: {
        projectPath: [this.epic.slug, this.slug].join('/'),
      },
    })
  }
}
