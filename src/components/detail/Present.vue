<template>
  <label class="present">
    <Prompt/>
    <input
      v-model="command"
      type="text"
      @keyup.enter="executeCommand">
  </label>
</template>

<script>
  import { mapActions } from 'vuex'

  import Prompt from '@/components/detail/Prompt.vue'

  export default {
    name: 'Present',
    components: {
      Prompt,
    },
    data() {
      return {
        command: '',
      }
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
