import { FsNodeType } from 'seeelaye'

import { ResumeItem } from '@/models/resume'
import { IOrg, Org } from '@/models/org'
import { IEpic, Epic } from '@/models/epic'

import orgData from '@/data/experience.json'
import epicData from '@/data/work.json'

export const orgs = (orgData as IOrg[]).map(Org.parse)
export const epics = (epicData as IEpic[]).map(Epic.parse)

const treeItem = new ResumeItem('~', FsNodeType.FOLDER, '~')
treeItem.childMap = {}

const categories: [string, ResumeItem[]][] = [
  ['experience', orgs],
  ['work', epics],
]
categories.forEach(([categoryName, resumeItems]) => {
  const categoryItem = new ResumeItem(categoryName, FsNodeType.FOLDER, categoryName)
  categoryItem.childMap = Object.fromEntries(
    resumeItems.map((item): [string, ResumeItem] => [item.slug, item]),
  )
  treeItem.childMap = {
    ...treeItem.childMap ?? {},
    [categoryName]: categoryItem,
  }
})

const makeTree = (entity: ResumeItem, parent?: ResumeItem) => {
  const { node, children } = entity

  if (parent) {
    node.parent = parent.node
    parent.node.children.push(node)
  }

  children?.forEach((child) => {
    makeTree(child, entity)
  })
}
makeTree(treeItem)

export const tree = treeItem.node
