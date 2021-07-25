import type { Org } from '@/models/org'
import type { Epic } from '@/models/epic'

export interface ResumeState {
  orgs: Org[]
  epics: Epic[]
}

export const state = (): ResumeState => ({
  orgs: [] as Org[],
  epics: [] as Epic[],
})
