<template>
  <footer class="pane-element flex justify-between items-center my-8">
    <p class="text-sm text-sol-1">
      <Kaomoji class="inline-block"/>
      <span
        v-if="isLucky"
        class="pl-4">
        <em>You're</em> breathtaking!
      </span>
      <span
        v-else
        class="pl-4">Thanks for visiting!
      </span>
    </p>
    <a
      class="font-semibold text-xs uppercase hover:underline"
      href="https://github.com/dhruvkb/portfolio-brut"
      target="_blank">
      source code <span class="text-sol-r">&#x2197;</span>
    </a>
  </footer>
</template>

<script>
  import Kaomoji from '@/components/landing/Kaomoji.vue'

  import { breakpoint } from '@/plugins/responsive'

  export default {
    name: 'Footer',
    components: {
      Kaomoji,
    },
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
  }
</script>
