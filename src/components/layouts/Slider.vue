<template>
  <div
    class="slider
      fixed inset-y-0 right-0
      flex flex-row
      text-sol-00 bg-sol-2
      transition duration-300"
    :class="[{ 'is-active': isProMode }]"
    :style="{ '--pane-size': `${breakpoint.paneSize}px` }">
    <button
      class="hidden mb:block
        flex items-center justify-center
        text-xs font-bold uppercase
        w-8 h-full border-l border-r border-l-sol-1 border-r-sol-2"
      @click="toggleMore">
      <span class="vertical">
        <template v-if="isProMode">
          Close Pro mode <span class="text-sol-r">&times;</span>
        </template>
        <template v-else>
          Open Pro mode <span class="text-sol-r">&darr;</span>
        </template>
      </span>
    </button>

    <div class="content flex flex-col overflow-y-scroll">
      <slot/>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import { useStore } from 'vuex'

  import { breakpoint } from '@/plugins/responsive'

  export default defineComponent({
    name: 'Slider',
    setup() {
      const store = useStore()

      const isProMode = computed(() => store.state.ui.isProMode)
      const toggleMore = () => {
        store.commit('ui/setIsProMode', {
          isProMode: !isProMode.value,
        })
      }

      return {
        isProMode,
        breakpoint,
        toggleMore,
      }
    },
  })
</script>

<style scoped lang="css" src="seeelaye/dist/themes/solarized.css"/>
<style scoped lang="css">
  .slider {
    transform: translateX(var(--pane-size));

    &.is-active {
      transform: translateX(0);
    }

    .vertical {
      writing-mode: vertical-lr;
    }

    .content {
      width: var(--pane-size, 0);
    }
  }
</style>
