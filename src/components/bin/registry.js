import Bad from '@/components/bin/Bad.vue'
import Intro from '@/components/bin/Intro.vue'
import WhoAmI from '@/components/bin/WhoAmI.vue'

export const components = {
  Bad,
  Intro,
  WhoAmI,
}

export const bins = Object.fromEntries(
  Object.values(components)
    .map((component) => {
      const { command } = component
      if (command) {
        return [command, component]
      }
      return null
    })
    .filter(item => item !== null),
)
