<template>
  <div
    class="slider
      fixed inset-y-0 -right-px z-20
      flex flex-row
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
        text-sol-00 bg-sol-2
        box-content w-8 h-full
        border-l border-r border-l-sol-1 border-r-sol-1"
      :class="[{ 'pr-0-safe': !isSliderOpen }]"
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

    <div class="content flex flex-col relative text-sol-00 bg-sol-3">
      <div
        v-if="isFullScreen"
        class="absolute top-2 right-2 text-right">
        <button
          class="text-sol-r text-xl bg-sol-2 h-8 w-8 rounded-full"
          @click="toggleSlider">
          &times;
        </button>
      </div>
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
      const isFullScreen = computed(() => ['s', 'z'].includes(store.getters['ui/breakpointName']))
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
        isFullScreen,
        toggleSlider,
        goHome,
      }
    },
  })
</script>

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
