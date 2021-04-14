<template>
  <span class="prompt">
    [guest@dhruvkb <span class="dir">{{ directory }}</span>]$
  </span>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'Prompt',
    props: {
      wd: {
        type: String,
      },
    },
    computed: {
      directory() {
        return this.wd ?? this.currentNode.name
      },
      ...mapState('terminal', [
        'currentNode',
      ]),
    },
  }
</script>
