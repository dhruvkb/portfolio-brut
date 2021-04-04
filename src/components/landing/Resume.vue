<template>
  <div class="resume my-8">
    <Experience class="mb-4"/>
    <Epics class="mb-4"/>
    <a
      class="pane-element font-semibold text-sol-00 text-xs uppercase hover:underline"
      href="https://dhruvkb.github.io/resume/"
      target="_blank">
      Resume
      <span class="text-sol-r">&#x2197;</span>
    </a>
  </div>
</template>

<script>
  import Experience from '@/components/landing/Experience.vue'
  import Epics from '@/components/landing/Epics.vue'

  export default {
    name: 'Resume',
    components: {
      Experience,
      Epics,
    },
  }
</script>
