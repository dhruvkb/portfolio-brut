<template>
  <svg
    class="h-4 w-4"
    viewBox="0 0 24 24">
    <path
      v-for="(path, index) in paths"
      :key="index"
      v-bind="path"
      fill="currentColor"/>
  </svg>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'Icon',
    props: {
      paths: {
        type: Array,
        required: true,
      },
    },
  })
</script>
