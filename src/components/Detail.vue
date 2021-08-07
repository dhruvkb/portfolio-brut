<template>
  <div class="detail flex flex-col min-h-full">
    <RouterView class="flex-grow"/>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'Detail',
  })
</script>
