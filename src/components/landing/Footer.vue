<template>
  <footer class="pane-element-left-safe flex justify-between items-center">
    <p class="text-sm text-sol-1">
      <span v-if="isLucky"><em>You're</em> breathtaking!</span>
      <span v-else>Thanks for visiting!</span>
    </p>
    <a
      class="font-semibold text-xs uppercase hover:underline"
      href="https://github.com/dhruvkb/portfolio-brut"
      target="_blank">
      source code <span class="text-sol-r">&UpperRightArrow;</span>
    </a>
  </footer>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import { useStore } from 'vuex'

  export default defineComponent({
    name: 'Footer',
    setup() {
      const store = useStore()
      const breakpointName = computed(() => store.getters['ui/breakpointName'])

      const isLucky = computed(() => Math.random() >= 0.9)

      return {
        breakpointName,
        isLucky,
      }
    },
  })
</script>
