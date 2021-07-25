import type { MutationTree } from 'vuex'

import type { UiState } from '@/store/ui/state'

export interface UiMutationTree<S> extends MutationTree<S> {
  setIsProMode(state: S, payload: { isProMode: boolean }): void
}

export const mutations: UiMutationTree<UiState> = {
  setIsProMode(state: UiState, payload: { isProMode: boolean }) {
    state.isProMode = payload.isProMode
  },
}
