<template>
  <div class="help flex flex-col items-center justify-center text-sol-1">
    <Kaomoji
      mood="confused"
      class="text-2xl mb-2"/>
    <p class="mb-2">Hey surfer! You seem lost.</p>
    <p>
      Want to go
      <RouterLink
        class="underline"
        :to="{ name: 'home' }">
        home</RouterLink>?
    </p>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import Kaomoji from '@/components/detail/Kaomoji.vue'

  export default defineComponent({
    name: '404',
    components: {
      Kaomoji,
    },
  })
</script>
