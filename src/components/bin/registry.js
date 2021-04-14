import Bad from '@/components/bin/Bad.vue'
import ChangeDir from '@/components/bin/ChangeDir.vue'
import Help from '@/components/bin/Help.vue'
import Intro from '@/components/bin/Intro.vue'
import List from '@/components/bin/List.vue'
import Manual from '@/components/bin/Manual.vue'
import WhoAmI from '@/components/bin/WhoAmI.vue'
import WorkDir from '@/components/bin/WorkDir.vue'

export const components = {
  Bad,
  ChangeDir,
  Help,
  Intro,
  List,
  Manual,
  WhoAmI,
  WorkDir,
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
