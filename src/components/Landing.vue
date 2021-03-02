<template>
  <div class="landing flex flex-col text-sol-00 bg-sol-3 min-h-full">
    <Intro/>
    <Experience class="flex-grow"/>
    <Footer/>
  </div>
</template>

<script>
  import Intro from '@/components/landing/Intro.vue'
  import Experience from '@/components/landing/Experience.vue'
  import Footer from '@/components/landing/Footer.vue'

  export default {
    name: 'Landing',
    components: {
      Intro,
      Experience,
      Footer,
    },
  }
</script>

<style>
  .landing ::selection {
    @apply text-sol-01 bg-sol-2;
  }
</style>
