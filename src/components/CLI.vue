<template>
  <div class="cli flex flex-col min-h-full">
    <Terminal class="terminal solarized dark flex-grow overflow-y-auto"/>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import {
    Terminal,
    useSeeelaye,
  } from 'seeelaye'

  export default defineComponent({
    name: 'Pro',
    components: {
      Terminal,
    },
    setup() {
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

      seeelaye.commit('setCurrentNode', {
        currentNode: seeelaye.state.tree,
      })
      seeelaye.commit('setIsReady', { isReady: true })
    },
  })
</script>

<style lang="css" src="seeelaye/style/style.css"/>
<style scoped lang="css" src="seeelaye/themes/solarized.css"/>
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
