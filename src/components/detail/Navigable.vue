<template>
  <span
    class="navigable"
    :title="title">
    <button
      :class="node.isFolder ? 'text-sol-v' : 'text-sol-m'"
      @click="handleClick">
      <!-- @slot Alternative name to display for the node goes here -->
      <slot>
        {{ node.name }}
      </slot>
    </button>
  </span>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  import { Tree } from '@/models/tree'

  export default {
    name: 'Navigable',
    props: {
      node: {
        type: Tree,
        required: true,
      },
    },
    computed: {
      command() {
        const bin = this.node.isFolder ? 'cd' : 'cat'
        const argv = [this.absolutePathTo(this.node)]
        return [bin, ...argv].join(' ')
      },
      title() {
        return `Navigate to '${this.node.name}'.`
      },
      ...mapGetters('terminal', [
        'absolutePathTo',
      ]),
    },
    methods: {
      navigateToNode() {
        this.exec({ rawInput: this.command })
      },
      handleClick() {
        this.navigateToNode()
      },
      ...mapActions('terminal', [
        'exec',
      ]),
    },
  }
</script>

<style scoped>

</style>
