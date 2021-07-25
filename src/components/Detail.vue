<template>
  <div class="detail flex flex-col min-h-full">
    <Terminal
      v-if="isTerminalVisible"
      class="flex-grow solarized dark"/>
  </div>
</template>

<script lang="ts">
  import type { Org } from '@/models/org'
  import type { Epic } from '@/models/epic'

  import { computed, defineComponent, onBeforeUnmount } from 'vue'
  import { useStore } from 'vuex'
  import {
    FsNode,
    FsNodeType,
    getVuexModule,
    Terminal,
    useSeeelaye,
  } from 'seeelaye'

  import { breakpoint } from '@/plugins/responsive'

  export default defineComponent({
    name: 'Detail',
    components: {
      Terminal,
    },
    setup() {
      const seeelaye = useSeeelaye()

      const isTerminalVisible = computed(() => breakpoint.name.includes('x'))

      // Attach and detach see·el·aye module
      const store = useStore()
      const terminalModule = getVuexModule()
      if (!store.hasModule('terminal')) {
        store.registerModule('terminal', terminalModule)
      }
      onBeforeUnmount(() => {
        if (store.hasModule('terminal')) {
          store.unregisterModule('terminal')
        }
      })

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

      return {
        isTerminalVisible,
      }
    },
  })
</script>

<style scoped lang="css" src="seeelaye/dist/themes/solarized.css"/>
<style scoped lang="css">
  .detail {
    padding-right: env(safe-area-inset-right);

    & ::selection {
      @apply text-sol-1 bg-sol-02;
    }
  }

  /* Terminal style variables */
  ::v-deep(.terminal) {
    --content-max-width: 80ch;
    --content-border-width: 1px;

    --folder-color: var(--color-accent-v);
  }
</style>
