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
      <span class="hover:text-tx bg-gradient-to-r from-sol-v to-sol-b bg-clip-text transition-colors">
        writing beautiful code;
      </span>
      <span class="hover:text-tx bg-gradient-to-r from-sol-b to-sol-c bg-clip-text transition-colors">
        designing accessible interfaces;
      </span>
      <span class="hover:text-tx bg-gradient-to-r from-sol-c to-sol-g bg-clip-text transition-colors">
        deploying scalable apps;
      </span>
      <span class="hover:text-tx bg-gradient-to-r from-sol-g to-sol-y bg-clip-text transition-colors">
        authoring helpful documentation;
      </span>
      <span class="hover:text-tx bg-gradient-to-r from-sol-y to-sol-o bg-clip-text transition-colors">
        nurturing FOSS communities;
      </span>
      <span class="hover:text-tx bg-gradient-to-r from-sol-o to-sol-m bg-clip-text transition-colors">
        hiding easter eggs;
      </span>
      <span class="hover:text-tx bg-gradient-to-r from-sol-m to-sol-v bg-clip-text transition-colors">
        composing bad <span class="italic">haiku</span>.
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
  }
</script>
