<template>
  <span class="executable">
    <button @click="executeCommand">
      <span class="text-sol-g">{{ bin }}</span>
      <span
        v-for="(arg, index) in argv"
        :key="index"
        class="text-sol-b">&nbsp;{{ arg }}</span>
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
    },
    methods: {
      ...mapActions('terminal', [
        'exec',
      ]),
      executeCommand() {
        this.exec({ rawInput: this.command })
      },
    },
  }
</script>
