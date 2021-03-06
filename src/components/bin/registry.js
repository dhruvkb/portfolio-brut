import Bad from '@/components/bin/Bad.vue'
import ChangeDir from '@/components/bin/ChangeDir.vue'
import Clear from '@/components/bin/Clear.vue'
import Concatenate from '@/components/bin/Concatenate.vue'
import Help from '@/components/bin/Help.vue'
import Intro from '@/components/bin/Intro.vue'
import List from '@/components/bin/List.vue'
import Manual from '@/components/bin/Manual.vue'
import Nop from '@/components/bin/Nop.vue'
import Tree from '@/components/bin/Tree.vue'
import WhoAmI from '@/components/bin/WhoAmI.vue'
import WorkDir from '@/components/bin/WorkDir.vue'

export const components = {
  Bad,
  ChangeDir,
  Clear,
  Concatenate,
  Help,
  Intro,
  List,
  Manual,
  Nop,
  Tree,
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
