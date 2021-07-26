<template>
  <div class="work-item">{{ projectPath }}</div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'Work',
    props: {
      projectPath: {
        type: String,
      },
    },
  })
</script>
