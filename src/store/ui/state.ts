export interface UiState {
  isSliderOpen: boolean
  viewportWidth: number
}

export const state = (): UiState => ({
  isSliderOpen: false,
  viewportWidth: 0,
})
