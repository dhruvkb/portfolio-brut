<template>
  <div class="experience-item">{{ rolePath }}</div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'Experience',
    props: {
      rolePath: {
        type: String,
      },
    },
  })
</script>
