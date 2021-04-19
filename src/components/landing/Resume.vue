<template>
  <div class="resume my-8">
    <Experience class="mb-6"/>
    <Work class="mb-6"/>
    <a
      class="pane-element font-semibold text-sol-00 text-xs uppercase hover:underline"
      href="https://dhruvkb.github.io/resume/"
      target="_blank">
      Resume
      <span class="text-sol-r">&UpperRightArrow;</span>
    </a>
  </div>
</template>

<script>
  import Experience from '@/components/landing/Experience.vue'
  import Work from '@/components/landing/Work.vue'

  export default {
    name: 'Resume',
    components: {
      Experience,
      Work,
    },
  }
</script>
