<template>
  <div class="pane overflow-y-scroll h-full">
    <slot/>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'Pane',
  })
</script>
