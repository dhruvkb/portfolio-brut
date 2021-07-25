import type { Epic } from '@/models/epic'
import type { IResumeNode } from '@/models/resume'

import { ResumeNode } from '@/models/resume'

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

export interface IProject extends IResumeNode {
  title: string
  url: string
  technologies: ITechnology[]
}

/**
 * Each project represents a quantum of work done under an epic.
 */
export class Project extends ResumeNode implements IProject {
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
      title,
      url,
      technologies,
      slug,
      aliases,
    } = project

    super(slug, aliases)
    this.children = undefined

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
   * Get the path to the node from the 'work/' directory.
   * @returns the path to the node from the 'work/' directory
   */
  get nodePath(): string {
    return ['/work', this.epic.slug, this.slug].join('/')
  }
}
