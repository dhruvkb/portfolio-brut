<template>
  <svg
    class="h-4 w-4"
    viewBox="0 0 24 24">
    <path
      v-for="(path, index) in paths"
      :key="index"
      v-bind="path"/>
  </svg>
</template>

<script>
  export default {
    name: 'Icon',
    props: {
      paths: {
        type: Array,
        required: true,
      },
    },
  }
</script>
