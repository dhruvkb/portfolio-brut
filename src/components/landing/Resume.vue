<template>
  <div class="resume">
    <Experience class="mb-6"/>
    <Work class="mb-6"/>
    <a
      class="pane-element-left-safe external small link"
      href="https://dhruvkb.github.io/resume/"
      target="_blank">
      Resume</a>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import Experience from '@/components/landing/Experience.vue'
  import Work from '@/components/landing/Work.vue'

  export default defineComponent({
    name: 'Resume',
    components: {
      Experience,
      Work,
    },
  })
</script>
