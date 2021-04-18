<template>
  <div class="landing flex flex-col text-sol-00 bg-sol-3 min-h-full">
    <Intro/>
    <Resume class="flex-grow"/>
    <Footer/>
  </div>
</template>

<script>
  import Intro from '@/components/landing/Intro.vue'
  import Resume from '@/components/landing/Resume.vue'
  import Footer from '@/components/landing/Footer.vue'

  export default {
    name: 'Landing',
    components: {
      Intro,
      Resume,
      Footer,
    },
  }
</script>

<style scoped lang="css">
  .landing {
    padding-left: env(safe-area-inset-left);

    @screen s {
      padding-right: env(safe-area-inset-right);
    }
    @screen sx {
      padding-right: 0;
    }

    & ::selection {
      @apply text-sol-01 bg-sol-2;
    }
  }
</style>
