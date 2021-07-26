<template>
  <footer class="pane-element flex justify-between items-center my-8">
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
  import { defineComponent } from 'vue'

  import { breakpoint } from '@/plugins/responsive'

  export default defineComponent({
    name: 'Footer',
    data() {
      return {
        breakpoint,
      }
    },
    computed: {
      isLucky() {
        return Math.random() >= 0.9
      },
    },
  })
</script>
