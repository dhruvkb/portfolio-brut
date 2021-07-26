import type { MutationTree } from 'vuex'

import type { UiState } from '@/store/ui/state'

export interface UiMutationTree<S> extends MutationTree<S> {
  setIsSliderOpen(state: S, payload: { isSliderOpen: boolean }): void
}

export const mutations: UiMutationTree<UiState> = {
  setIsSliderOpen(state: UiState, payload: { isSliderOpen: boolean }) {
    state.isSliderOpen = payload.isSliderOpen
  },
}
