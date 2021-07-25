import type { Module } from 'vuex'

import type { RootState } from '@/store/state'
import type { ResumeState } from '@/store/resume/state'

import { state } from '@/store/resume/state'
import { getters } from '@/store/resume/getters'
import { mutations } from '@/store/resume/mutations'

export const module: Module<ResumeState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
}
