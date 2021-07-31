<template>
  <div
    class="slider
      fixed inset-y-0 right-0 z-20
      flex flex-row
      text-sol-00 bg-sol-2
      transition duration-300"
    :class="[{ 'is-active': isSliderOpen }]"
    :style="{ '--slider-size': `${sliderSize}px` }">
    <Teleport to="#app__slot">
      <div
        v-if="isLandingInactive"
        class="absolute inset-0 z-10"
        @click="goHome"/>
    </Teleport>

    <button
      class="hidden mb:block
        flex items-center justify-center
        text-xs font-bold uppercase
        w-8 h-full border-l border-r border-l-sol-1 border-r-sol-2"
      @click="toggleSlider">
      <span class="vertical">
        <template v-if="isSliderOpen">
          Close {{ contents }} <span class="text-sol-r">&times;</span>
        </template>
        <template v-else>
          Open {{ contents }} <span class="text-sol-r">&darr;</span>
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
  import { useRouter } from 'vue-router'
  import { useKeypress } from 'vue3-keypress'

  export default defineComponent({
    name: 'Slider',
    props: {
      contents: {
        type: String,
      },
    },
    setup() {
      const store = useStore()
      const router = useRouter()

      const isSliderOpen = computed(() => store.state.ui.isSliderOpen)
      const isLandingInactive = computed(() => store.getters['ui/isLandingInactive'])
      const sliderSize = computed(() => store.getters['ui/sliderSize'])
      const toggleSlider = () => {
        store.commit('ui/setIsSliderOpen', {
          isSliderOpen: !isSliderOpen.value,
        })
      }
      const goHome = () => {
        router.push({ name: 'home' })
      }

      useKeypress({
        keyEvent: 'keydown',
        keyBinds: [
          {
            keyCode: 'esc',
            success: () => {
              if (isLandingInactive.value) {
                goHome()
              }
            },
          },
        ],
      })

      return {
        isSliderOpen,
        isLandingInactive,
        sliderSize,
        toggleSlider,
        goHome,
      }
    },
  })
</script>

<style scoped lang="css" src="seeelaye/dist/themes/solarized.css"/>
<style scoped lang="css">
  .slider {
    transform: translateX(var(--slider-size));

    &.is-active {
      transform: translateX(0);
    }

    .vertical {
      writing-mode: vertical-lr;
    }

    .content {
      width: var(--slider-size, 0);
    }
  }
</style>
