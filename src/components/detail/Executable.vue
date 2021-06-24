<template>
  <span
    class="executable"
    :title="title">
    <button v-on="on">
      <span class="text-sol-g">{{ bin }}</span>
      <!-- @slot Replacement for argument vector goes here -->
      <slot>
        <span
          v-for="(arg, index) in argv"
          :key="index"
          class="text-sol-b ml-ch">
          {{ arg }}
        </span>
      </slot>
    </button>
  </span>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: 'Executable',
    props: {
      bin: {
        type: String,
        required: true,
      },
      argv: {
        type: Array,
        default: () => [],
      },
      enableExec: {
        type: Boolean,
      },
    },
    computed: {
      command() {
        return [this.bin, ...this.argv].join(' ')
      },
      title() {
        return `Execute '${this.command}'.`
      },
      on() {
        return {
          click: this.enableExec ? this.handleClick : null,
        }
      },
    },
    methods: {
      executeCommand() {
        this.exec({ rawInput: this.command })
      },
      handleClick() {
        this.executeCommand()
      },
      ...mapActions('terminal', [
        'exec',
      ]),
    },
  }
</script>
