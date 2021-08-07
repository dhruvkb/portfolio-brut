<template>
  <div class="help flex flex-col items-center justify-center text-sol-1">
    <Kaomoji
      mood="happy"
      class="text-2xl mb-2"/>
    <p>Hey surfer! Welcome to my slice of the Internet.</p>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import Kaomoji from '@/components/detail/Kaomoji.vue'

  export default defineComponent({
    name: 'Home',
    components: {
      Kaomoji,
    },
  })
</script>
