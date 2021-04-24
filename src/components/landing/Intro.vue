<template>
  <div class="intro pane-element my-8">
    <p class="text-xl leading-snug mb-4">
      This is the portfolio of
      <RouterLink to="/">
        <strong class="site-title">Dhruv Bhanushali</strong>
      </RouterLink>,
      a software engineer and open-source maintainer who also wears many other
      hats.
    </p>
    <p class="text-xl leading-snug mb-4">
      He does a lot of things &mdash;
      <span
        v-for="(works, index) in works"
        :key="index"
        class="thing hover:text-tx bg-gradient-to-r bg-clip-text transition-colors"
        :class="[colors.from[index], colors.to[index]]">
        {{ works }}
      </span>
    </p>
    <a class="text-xs font-bold uppercase">
      More about this guy <span class="text-sol-r">&rarr;</span>
    </a>
  </div>
</template>

<script>
  export default {
    name: 'Intro',
    data() {
      return {
        colors: {
          from: [
            'from-sol-v',
            'from-sol-b',
            'from-sol-c',
            'from-sol-g',
            'from-sol-y',
            'from-sol-o',
            'from-sol-m',
          ],
          to: [
            'to-sol-b',
            'to-sol-c',
            'to-sol-g',
            'to-sol-y',
            'to-sol-o',
            'to-sol-m',
            'to-sol-v',
          ],
        },
        works: [
          'writing beautiful code; ',
          'designing accessible interfaces; ',
          'deploying scalable apps; ',
          'authoring helpful documentation; ',
          'nurturing FOSS communities; ',
          'hiding easter eggs; ',
          'composing bad haiku.',
        ],
      }
    },
  }
</script>

<style scoped lang="css">
  .thing {
    -webkit-box-decoration-break: clone;
  }
</style>
