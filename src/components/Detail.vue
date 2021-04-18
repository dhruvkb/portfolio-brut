<template>
  <div class="detail flex flex-col text-sol-0 bg-sol-03 min-h-full">
    <Terminal class="flex-grow"/>
  </div>
</template>

<script>
  import Terminal from '@/components/detail/Terminal.vue'

  export default {
    name: 'Detail',
    components: {
      Terminal,
    },
  }
</script>

<style scoped lang="css">
  .detail {
    @screen sx {
      padding-right: env(safe-area-inset-right);
    }

    & ::selection {
      @apply text-sol-1 bg-sol-02;
    }
  }
</style>
