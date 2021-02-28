<template>
  <div class="landing flex flex-col text-white bg-black min-h-full">
    <Intro/>
    <div class="flex-grow"/>
    <Footer/>
  </div>
</template>

<script>
  import Intro from '@/components/landing/Intro.vue'
  import Footer from '@/components/landing/Footer.vue'

  export default {
    name: 'Landing',
    components: {
      Footer,
      Intro,
    },
  }
</script>

<style>
  .landing ::selection {
    @apply text-sol-01 bg-sol-2;
  }
</style>
