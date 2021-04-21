<template>
  <div class="present">
    <label
      v-show="isReady"
      class="flex items-center gap-x-ch">
      <Prompt/>
      <input
        v-model="rawInput"
        class="flex-grow bg-tx h-ln border-none outline-none"
        type="text"
        autocomplete="off"
        autocapitalize="off"
        spellcheck="false"

        @keydown.enter.exact="executeCommand"
        @keydown.tab.exact.prevent="autocompleteCommand"
        @keydown.arrow-up.exact.prevent="traverseHistoryUp"
        @keydown.arrow-down.exact.prevent="traverseHistoryDown"

        ref="inputField">
    </label>
  </div>
</template>

<script>
  import { mapActions, mapMutations, mapState } from 'vuex'

  import Prompt from '@/components/detail/Prompt.vue'

  export default {
    name: 'Present',
    components: {
      Prompt,
    },
    data() {
      return {
        traversal: {
          index: 0,
          backup: '',
        },
      }
    },
    computed: {
      rawInput: {
        get() {
          if (this.$refs.inputField) {
            this.$refs.inputField.focus()
          }
          return this.commandInput
        },
        set(value) {
          this.setCommandInput({ commandInput: value })
        },
      },
      ...mapState('terminal', [
        'interactionHistory',
        'isReady',
        'commandInput',
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
        this.exec({ rawInput: this.rawInput })

        this.rawInput = '' // Clear field
      },
      traverseHistoryUp() {
        if (this.traversal.index === this.interactionHistory.length) {
          return
        }

        if (this.traversal.index === 0) {
          this.traversal.backup = this.command
        }
        this.traversal.index += 1
        const index = this.interactionHistory.length - this.traversal.index
        this.command = this.interactionHistory[index].rawInput
      },
      traverseHistoryDown() {
        if (this.traversal.index === 0) {
          return
        }

        this.traversal.index -= 1
        if (this.traversal.index === 0) {
          this.command = this.traversal.backup
        } else {
          const index = this.interactionHistory.length - this.traversal.index
          this.command = this.interactionHistory[index].rawInput
        }
      },
      autocompleteCommand() {
        console.log(`Autocompleting ${this.command}`) // TODO
      },
      ...mapMutations('terminal', [
        'setCommandInput',
      ]),
      ...mapActions('terminal', [
        'exec',
      ]),
    },
  }
</script>
