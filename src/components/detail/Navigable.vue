<template>
  <span
    class="navigable"
    :title="title">
    <button
      :class="node.isFolder ? 'text-sol-v' : 'text-sol-m'"
      @click="navigateToNode">
      <!-- @slot Alternative name to display for the node goes here -->
      <slot>
        {{ node.name }}
      </slot>
    </button>
  </span>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  import { Tree } from '@/plugins/tree'

  export default {
    name: 'Navigable',
    props: {
      node: {
        type: Tree,
        required: true,
      },
    },
    computed: {
      ...mapGetters('terminal', [
        'absolutePathTo',
      ]),
      command() {
        const bin = this.node.isFolder ? 'cd' : 'cat'
        const argv = [this.absolutePathTo(this.node)]
        return [bin, ...argv].join(' ')
      },
      title() {
        return `Navigate to '${this.node.name}'.`
      },
    },
    methods: {
      ...mapActions('terminal', [
        'exec',
      ]),
      navigateToNode() {
        this.exec({ rawInput: this.command })
      },
    },
  }
</script>

<style scoped>

</style>
