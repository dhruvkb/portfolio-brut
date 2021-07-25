import type { MutationTree } from 'vuex'

import type { ResumeState } from '@/store/resume/state'

import type { Epic } from '@/models/epic'
import type { Org } from '@/models/org'

export interface ResumeMutationTree<S> extends MutationTree<S> {
  setOrgs(state: S, payload: { orgs: Org[] }): void

  setEpics(state: S, payload: { epics: Epic[] }): void
}

export const mutations: ResumeMutationTree<ResumeState> = {
  setOrgs(state: ResumeState, payload: { orgs: Org[] }) {
    state.orgs = payload.orgs
  },
  setEpics(state: ResumeState, payload: { epics: Epic[] }) {
    state.epics = payload.epics
  },
}
