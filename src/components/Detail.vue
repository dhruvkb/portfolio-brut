<template>
  <div class="detail
      flex flex-col
      text-sol-00 bg-sol-3
      min-h-full border-l border-sol-1">
    <div class="pane-element my-8">Hello, World!</div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'Detail',
  })
</script>

<style scoped lang="css">
  .detail {
    padding-right: env(safe-area-inset-right);

    & ::selection {
      @apply text-sol-01 bg-sol-2;
    }
  }
</style>
