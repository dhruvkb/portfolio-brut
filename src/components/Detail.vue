<template>
  <div class="detail flex flex-col text-sol-00 bg-sol-3 min-h-full border-l border-sol-1">
    <RouterView class="flex-grow"/>
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
