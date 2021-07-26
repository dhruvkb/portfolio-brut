export interface UiState {
  isSliderOpen: boolean
}

export const state = (): UiState => ({
  isSliderOpen: false,
})
