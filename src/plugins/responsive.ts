import { reactive } from 'vue'
import debounce from 'lodash/debounce'

export const shortenedTable = 480 // px
export const regularTable = 640 // px
export const expandedTable = 800 // px

export const detailPane = 720 // px

export const proButton = 32 // px

/**
 * Maps screen size names to the lower bound of their width range in pixels.
 *
 * **Key:**
 * - `'t'` indicates that terminal should be visible
 * - `'b'` indicates that the more button should be visible
 *
 * Duplicated in Tailwind config: `tailwind.config.js`
 */
export const screenSizes: Record<string, number> = {
  z: 0,
  s: shortenedTable,
  mb: regularTable + proButton,
  lb: expandedTable + proButton,
  spb: shortenedTable + detailPane + proButton,
  mpb: regularTable + detailPane + proButton,
}

export interface IBreakpoint {
  w: number
  h: number
  name: string
  sliderContents: string
  sliderSize: number
}

export const breakpoint = reactive<IBreakpoint>({
  w: 0,
  h: 0,
  name: '?',
  sliderContents: '?',
  sliderSize: 0,
})

/**
 * Calculate the name of the breakpoint based on the width ranges and the inner
 * width of the available viewport.
 *
 * @param w - the inner width of the viewport
 * @returns the calculated name of the breakpoint
 */
const getBreakpointName = (w: number) => {
  const breakpointNames = Object.keys(screenSizes).reverse()
  for (let i = 0; i < breakpointNames.length; i += 1) {
    const breakpointName = breakpointNames[i]
    if (w >= screenSizes[breakpointName]) {
      return breakpointName
    }
  }
  return breakpointNames[breakpointNames.length - 1]
}

/**
 * Calculate the width of the pane based on the breakpoint and the inner width
 * of the available viewport.
 *
 * @param w - the inner width of the viewport
 * @returns the calculated width of the panel
 */
const getSliderSize = (w: number) => {
  const breakpointName = breakpoint.name
  let paneSize
  switch (breakpointName) {
    case 'mb':
      paneSize = w - proButton
      break
    case 'lb':
      paneSize = detailPane
      break
    case 'spb':
      paneSize = w - (shortenedTable + proButton)
      break
    case 'mpb':
      paneSize = w - (regularTable + proButton)
      break
    default:
      paneSize = w
  }
  return paneSize
}

export const setBreakpoint = (): void => {
  breakpoint.w = window.innerWidth
  breakpoint.h = window.innerHeight
  breakpoint.name = getBreakpointName(window.innerWidth)
  breakpoint.sliderSize = getSliderSize(window.innerWidth)
  breakpoint.sliderContents = breakpoint.name.includes('p') ? 'cli' : 'details'
}

export const addListener = (): void => {
  window.addEventListener(
    'resize',
    debounce(setBreakpoint, 100),
    false,
  )
}
