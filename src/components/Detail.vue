<template>
  <div class="detail flex flex-col text-sol-0 bg-sol-03 min-h-full">
    <Terminal
      v-if="breakpoint.name.includes('x')"
      class="flex-grow"/>
  </div>
</template>

<script>
  import Terminal from '@/components/detail/Terminal.vue'

  import { breakpoint } from '@/plugins/responsive'

  export default {
    name: 'Detail',
    components: {
      Terminal,
    },
    data() {
      return {
        breakpoint,
      }
    },
  }
</script>

<style scoped lang="css">
  .detail {
    padding-right: env(safe-area-inset-right);

    & ::selection {
      @apply text-sol-1 bg-sol-02;
    }
  }
</style>
