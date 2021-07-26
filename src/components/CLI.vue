<template>
  <div class="cli flex-grow">
    <Terminal class="terminal solarized dark"/>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useStore } from 'vuex'
  import {
    FsNode,
    FsNodeType,
    Terminal,
    useSeeelaye,
  } from 'seeelaye'

  import { Org } from '@/models/org'
  import { Epic } from '@/models/epic'

  export default defineComponent({
    name: 'Pro',
    components: {
      Terminal,
    },
    setup() {
      const store = useStore()
      const seeelaye = useSeeelaye()

      // Run startup commands when terminal is ready
      let index = 0
      const startupCommands = ['intro', 'help']
      const unsubscribe = seeelaye.store.subscribe((mutation) => {
        if (mutation.type.includes('/setIsReady') && mutation.payload.isReady) {
          const command = startupCommands[index]
          if (command) {
            index += 1
            seeelaye.dispatch('executeCmd', { rawInput: command })
          }
          if (index === startupCommands.length) {
            unsubscribe()
          }
        }
      })

      // Make FS tree from experience and work data
      const makeTree = () => {
        const rootNode = new FsNode(FsNodeType.FOLDER, '~')

        const experienceNode = new FsNode(FsNodeType.FOLDER, 'experience')
        experienceNode.parent = rootNode
        rootNode.children.push(experienceNode)
        store.state.resume.orgs.forEach((org: Org) => {
          const orgNode = org.asFsNode
          orgNode.parent = experienceNode
          experienceNode.children.push(orgNode)
        })

        const workNode = new FsNode(FsNodeType.FOLDER, 'work')
        workNode.parent = rootNode
        rootNode.children.push(workNode)
        store.state.resume.epics.forEach((epic: Epic) => {
          const epicNode = epic.asFsNode
          epicNode.parent = workNode
          workNode.children.push(epicNode)
        })

        return rootNode
      }
      const tree = makeTree()
      seeelaye.commit('setTree', { tree })
      seeelaye.commit('setCurrentNode', { currentNode: tree })

      seeelaye.commit('setIsReady', { isReady: true })
    },
  })
</script>

<style scoped lang="css" src="seeelaye/dist/themes/solarized.css"/>
<style scoped lang="css">
  .cli {
    ::v-deep(.terminal) {
      /* Terminal style variables */
      --content-max-width: 80ch;
      --content-border-width: 1px;

      --folder-color: var(--color-accent-v);
    }
  }
</style>
