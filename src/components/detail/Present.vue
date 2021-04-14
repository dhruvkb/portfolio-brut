<template>
  <div class="present">
    <template v-if="isReady">
      <label>
        <Prompt/>
        <input
          v-model="command"
          type="text"
          @keyup.enter="executeCommand">
      </label>
    </template>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'

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
    computed: {
      ...mapState('terminal', [
        'isReady',
      ]),
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
