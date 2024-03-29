import type { GetterTree } from 'vuex'

import { SliderContent } from '@/models/slider'

import type { RootState } from '@/store/state'
import type { UiState } from '@/store/ui/state'

import {
  detailPane,
  proButton,
  regularTable,
  screenSizes,
  shortenedTable,
} from '@/constants/screen_sizes'

type Getterify<GT> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [I in keyof GT]: GT[I] extends (...args: any) => any ? ReturnType<GT[I]> : any
}

export interface UiGetterTree<S, RS> extends GetterTree<S, RS> {
  breakpointName(state: S): string
  isTwoPane(state: S, uiGetters: Getterify<UiGetterTree<S, RS>>): boolean
  sliderSize(state: S, uiGetters: Getterify<UiGetterTree<S, RS>>): number
  sliderContents(state: S, uiGetters: Getterify<UiGetterTree<S, RS>>): SliderContent
  isLandingInactive(state: S, uiGetters: Getterify<UiGetterTree<S, RS>>): boolean
}

export const getters: UiGetterTree<UiState, RootState> = {
  breakpointName(state: UiState): string {
    const breakpointNames = Object.keys(screenSizes).reverse()
    for (let i = 0; i < breakpointNames.length; i += 1) {
      const breakpointName = breakpointNames[i]
      if (state.viewportWidth >= screenSizes[breakpointName]) {
        return breakpointName
      }
    }
    return breakpointNames[breakpointNames.length - 1]
  },
  isTwoPane(
    state: UiState,
    uiGetters: Getterify<UiGetterTree<UiState, RootState>>,
  ): boolean {
    return uiGetters.breakpointName.includes('p')
  },
  sliderSize(
    state: UiState,
    uiGetters: Getterify<UiGetterTree<UiState, RootState>>,
  ): number {
    switch (uiGetters.breakpointName) {
      case 'mb':
        return state.viewportWidth - proButton
      case 'lb':
        return detailPane
      case 'spb':
        return state.viewportWidth - (shortenedTable + proButton)
      case 'mpb':
        return state.viewportWidth - (regularTable + proButton)
      default:
        return state.viewportWidth
    }
  },
  sliderContents(
    state: UiState,
    uiGetters: Getterify<UiGetterTree<UiState, RootState>>,
  ): SliderContent {
    return uiGetters.isTwoPane ? SliderContent.CLI : SliderContent.DETAIL
  },
  isLandingInactive(
    state: UiState,
    uiGetters: Getterify<UiGetterTree<UiState, RootState>>,
  ): boolean {
    const { isSliderOpen } = state
    const { sliderContents } = uiGetters
    return isSliderOpen && sliderContents === SliderContent.DETAIL
  },
}
