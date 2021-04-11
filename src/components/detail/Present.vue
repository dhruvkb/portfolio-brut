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
    <template v-else>
      Processing...
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
      ...mapActions('terminal', [
        'exec',
      ]),
      executeCommand() {
        this.exec({ rawInput: this.command })
      },
    },
  }
</script>
