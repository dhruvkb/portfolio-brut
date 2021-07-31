<template>
  <div class="hello flex flex-col gap-16 py-8">
    <Intro/>
    <Resume/>
    <Footer class="mt-auto"/>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import Intro from '@/components/landing/Intro.vue'
  import Resume from '@/components/landing/Resume.vue'
  import Footer from '@/components/landing/Footer.vue'

  export default defineComponent({
    name: 'Hello',
    components: {
      Intro,
      Resume,
      Footer,
    },
  })
</script>
