import type { Module } from 'vuex'

import type { RootState } from '@/store/state'
import type { UiState } from '@/store/ui/state'

import { state } from '@/store/ui/state'
import { mutations } from '@/store/ui/mutations'

export const module: Module<UiState, RootState> = {
  namespaced: true,
  state,
  mutations,
}
