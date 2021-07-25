export interface UiState {
  isProMode: boolean
}

export const state = (): UiState => ({
  isProMode: false,
})
