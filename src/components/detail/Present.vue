<template>
  <div class="present">
    <label
      v-show="isReady"
      class="flex items-center gap-x-ch">
      <Prompt/>
      <input
        v-model="command"
        class="flex-grow bg-tx border-none outline-none"
        type="text"
        @keyup.enter="executeCommand"
        ref="inputField">
    </label>
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
    watch: {
      isReady(finalValue) {
        if (finalValue && this.$refs.inputField) {
          this.$nextTick(() => {
            this.$refs.inputField.focus()
            this.$refs.inputField.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
              inline: 'nearest',
            })
          })
        }
      },
    },
    methods: {
      executeCommand() {
        this.exec({ rawInput: this.command })

        this.command = '' // Clear field
      },
      ...mapActions('terminal', [
        'exec',
      ]),
    },
  }
</script>
