<template>
  <div class="hello flex flex-col">
    <Intro/>
    <Resume class="flex-grow"/>
    <Footer/>
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
