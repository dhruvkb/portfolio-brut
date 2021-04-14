<template>
  <span
    class="executable"
    :title="title">
    <button @click="executeCommand">
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
    },
    computed: {
      command() {
        return [this.bin, ...this.argv].join(' ')
      },
      title() {
        return `Execute '${this.command}'.`
      },
    },
    methods: {
      executeCommand() {
        this.exec({ rawInput: this.command })
      },
      ...mapActions('terminal', [
        'exec',
      ]),
    },
  }
</script>
