<template>
  <div
    class="landing flex flex-col text-sol-00 bg-sol-3 min-h-full transition duration-300"
    :class="[...isBlurred ? ['filter', 'blur-sm', 'pointer-events-none'] : []]">
    <Hello class="flex-grow"/>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import { useStore } from 'vuex'

  import Hello from '@/components/landing/Hello.vue'

  export default defineComponent({
    name: 'Landing',
    components: {
      Hello,
    },
    setup() {
      const store = useStore()
      const isBlurred = computed(() => {
        const { isSliderOpen } = store.state.ui
        const sliderContents = store.getters['ui/sliderContents']
        return isSliderOpen && sliderContents === 'details'
      })

      return {
        isBlurred,
      }
    },
  })
</script>

<style scoped lang="css">
  .landing {
    padding-left: env(safe-area-inset-left);

    @screen s {
      padding-right: env(safe-area-inset-right);
    }
    @screen spb {
      padding-right: 0;
    }

    & ::selection {
      @apply text-sol-01 bg-sol-2;
    }
  }
</style>
