<template>
  <div class="work-dir">
    <span class="text-sol-v">{{ pwd }}</span>
  </div>
</template>

<script>
  import { mapGetters, mapState } from 'vuex'

  import bin from '@/mixins/bin'

  export default {
    name: 'WorkDir',
    command: 'pwd',
    description: 'Show the present working directory.',
    mixins: [
      bin,
    ],
    computed: {
      pwd() {
        return this.absolutePathTo(this.node)
      },
      ...mapState('terminal', [
        'currentNode',
      ]),
      ...mapGetters('terminal', [
        'absolutePathTo',
      ]),
    },
    created() {
      this.node = this.currentNode
    },
  }
</script>
