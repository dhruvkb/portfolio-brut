<template>
  <div class="home flex flex-col overflow-y-auto">
    <Intro/>
    <Bio/>
    <Contact class="mt-auto"/>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import Intro from '@/components/detail/Intro.vue'
  import Bio from '@/components/detail/Bio.vue'
  import Contact from '@/components/detail/Contact.vue'

  export default defineComponent({
    name: 'Hello',
    components: {
      Intro,
      Bio,
      Contact,
    },
  })
</script>
