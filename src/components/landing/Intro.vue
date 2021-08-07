<template>
  <div class="intro pane-element-left-safe">
    <p class="text-xl leading-snug mb-4">
      Hello! I am
      <RouterLink :to="{ name: 'home' }">
        <strong class="site-title font-mono tracking-tight">Dhruv Bhanushali</strong>
      </RouterLink>,
      a software engineer and open-source maintainer who also wears many other
      hats.
    </p>
    <RouterLink :to="{ name: 'hello' }" class="text-xs font-bold uppercase">
      More about this guy <span class="text-sol-r">&rarr;</span>
    </RouterLink>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'Intro',
  })
</script>
