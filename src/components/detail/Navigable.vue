<template>
  <span
    class="navigable"
    :title="title">
    <button
      :class="node.isFolder ? 'text-sol-v' : 'text-sol-m'"
      v-on="on">
      <!-- @slot Alternative name to display for the node goes here -->
      <slot>
        {{ node.name }}
        <span
          v-if="showAliases && node.aliases.length"
          class="text-sol-01">
          (~ {{ node.aliases.join(', ') }})
        </span>
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
      showAliases: {
        type: Boolean,
      },
      enableExec: {
        type: Boolean,
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
      on() {
        return {
          click: this.enableClick ? this.handleClick : null,
        }
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
