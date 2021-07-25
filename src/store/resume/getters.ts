import type { GetterTree } from 'vuex'

import type { RootState } from '@/store/state'
import type { ResumeState } from '@/store/resume/state'

import type { Role } from '@/models/role'
import type { Project } from '@/models/project'

export interface ResumeGetterTree<S, RS> extends GetterTree<S, RS> {
  roles(state: S): Role[]
  projects(state: S): Project[]
}

export const getters: ResumeGetterTree<ResumeState, RootState> = {
  roles(state: ResumeState) {
    return state.orgs.map((org) => org.children).flat()
  },
  projects(state: ResumeState) {
    return state.epics.map((epic) => epic.children).flat()
  },
}
