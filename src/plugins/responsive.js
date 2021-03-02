import { reactive } from 'vue'
import debounce from 'lodash/debounce'
import { screenSizes } from '@/constants/screen_sizes'

export const breakpoint = reactive({})

const getBreakpoint = (w) => {
  const breakpointNames = ['mx', 'sx', 'l', 'm', 's']
  for (let i = 0; i < breakpointNames.length; i += 1) {
    const breakpointName = breakpointNames[i]
    if (w >= screenSizes[breakpointName]) {
      return breakpointName
    }
  }
  return 'z'
}

export const setBreakpoint = () => {
  breakpoint.w = window.innerWidth
  breakpoint.h = window.innerHeight
  breakpoint.name = getBreakpoint(window.innerWidth)
}

window.addEventListener(
  'resize',
  debounce(setBreakpoint, 100),
  false,
)
