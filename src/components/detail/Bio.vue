<template>
  <div class="bio">
    <h2 class="font-semibold text-xs uppercase text-sol-1 border-b border-sol-1 mb-2">
      <span class="pane-element-right-safe">Bio</span>
    </h2>
    <div class="pane-element-right-safe leading-snug text-lg mb-4">
      <p class="mb-4">
        I grew up in
        <a
          class="underline"
          href="https://en.wikipedia.org/wiki/Mumbai"
          target="_blank">Mumbai</a>
        and have lived there for almost all my life. I did spend four years
        studying Physics at the Indian Institute of Technology in
        <a
          class="underline"
          href="https://en.wikipedia.org/wiki/Roorkee"
          target="_blank">Roorkee</a>
        and several months, several times in
        <a
          class="underline"
          href="https://en.wikipedia.org/wiki/Bangalore"
          target="_blank">Bengaluru</a>.
      </p>
      <p class="mb-4">
        I write code as a hobby. I also write code as a full-time job. Almost
        all the programs I write are
        <a
          class="underline"
          href="https://github.com/dhruvkb"
          target="_blank">open-source</a>,
        including those from work. It's really fun when you get paid to do
        something you enjoy. 10/10 would recommend.
      </p>
      <p>
        In my personal time, I enjoy learning new technologies and languages.
        When not reading, writing or debugging code, I'll be watching some TV
        series or movie. I also like to listen to music and take long solitary
        walks, preferably simultaneously.
      </p>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'Bio',
    setup() {
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
          'writing elegant code',
          'designing accessible interfaces',
          'deploying scalable apps',
          'authoring helpful documentation',
          'nurturing FOSS communities',
          'hiding easter eggs',
          'composing extempore haiku',
        ],
      }
    },
  })
</script>
