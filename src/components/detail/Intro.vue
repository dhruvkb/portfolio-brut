<template>
  <div class="intro pane-element-right-safe text-xl leading-snug">
    <p class="mb-4">
      I do a bunch of different things &mdash;
      <template
        v-for="(work, index) in works"
        :key="index">
        <span
          class="thing hover:text-tx bg-gradient-to-r bg-clip-text transition-colors"
          :class="[colors.from[index], colors.to[index], { 'text-tx': index === visibleIndex }]">
          {{ work }}
        </span>
        <template v-if="index <= works.length - 3">; </template>
        <template v-else-if="index === works.length - 2"> and </template>
        <template v-else>.</template>
      </template>
    </p>
    <p>
      As a software engineer, I have worked on all aspects of software
      development, from planning to deployment, from backend to frontend,
      including everything in between. If you have an idea and want to talk, I'm
      all ears.
    </p>
  </div>
</template>

<script lang="ts">
  import {
    defineComponent,
    onMounted,
    ref,
  } from 'vue'

  export default defineComponent({
    name: 'Intro',
    setup() {
      const from = [
        'from-sol-v',
        'from-sol-b',
        'from-sol-c',
        'from-sol-g',
        'from-sol-y',
        'from-sol-o',
        'from-sol-m',
      ]
      const to = [
        'to-sol-b',
        'to-sol-c',
        'to-sol-g',
        'to-sol-y',
        'to-sol-o',
        'to-sol-m',
        'to-sol-v',
      ]
      const works = [
        'writing elegant code',
        'designing accessible interfaces',
        'deploying scalable apps',
        'authoring helpful documentation',
        'nurturing FOSS communities',
        'hiding easter eggs',
        'composing extempore haiku',
      ]

      const index = ref(0)
      let looper: number
      onMounted(() => {
        looper = window.setInterval(() => {
          index.value += 1
          if (index.value === works.length) {
            clearInterval(looper)
          }
        }, 2e3)
      })

      return {
        colors: {
          from,
          to,
        },
        works,
        visibleIndex: index,
      }
    },
  })
</script>

<style scoped lang="css">
  .thing {
    -webkit-box-decoration-break: clone;
  }
</style>
