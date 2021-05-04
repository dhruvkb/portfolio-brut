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
    <ul class="suggestions" v-if="suggestions">
      <li
        v-for="([entityType, suggestionDisplay, suggestionCompletion], index) in suggestions"
        :key="index"
        class="w-full"
        tabindex="0"
        @click="populateSuggestion(suggestionCompletion)">
        <Navigable
          v-if="entityType === entityTypes.NODE"
          :node="suggestionDisplay"/>
        <Executable
          v-else
          :bin="suggestionDisplay"/>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapActions, mapMutations, mapState } from 'vuex'

  import Executable from '@/components/detail/Executable.vue'
  import Navigable from '@/components/detail/Navigable.vue'
  import Prompt from '@/components/detail/Prompt.vue'

  import { autocomplete } from '@/plugins/autocomplete'
  import { entityTypes } from '@/models/terminal'

  export default {
    name: 'Present',
    components: {
      Executable,
      Navigable,
      Prompt,
    },
    data() {
      return {
        entityTypes,
        traversal: {
          index: 0,
          backup: '',
        },
        suggestions: [],
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
      nonEmptyHistory() {
        return this.interactionHistory.filter(item => item.rawInput !== '')
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
        if (this.traversal.index === this.nonEmptyHistory.length) {
          return
        }

        if (this.traversal.index === 0) {
          this.traversal.backup = this.rawInput
        }
        this.traversal.index += 1
        const index = this.nonEmptyHistory.length - this.traversal.index
        this.rawInput = this.nonEmptyHistory[index].rawInput
      },
      traverseHistoryDown() {
        if (this.traversal.index === 0) {
          return
        }

        this.traversal.index -= 1
        if (this.traversal.index === 0) {
          this.rawInput = this.traversal.backup
        } else {
          const index = this.nonEmptyHistory.length - this.traversal.index
          this.rawInput = this.nonEmptyHistory[index].rawInput
        }
      },
      autocompleteCommand() {
        const possibilities = autocomplete(this.rawInput)
        if (possibilities.length === 1) {
          const [[, , suggestion]] = possibilities
          this.populateSuggestion(suggestion)
        } else {
          this.suggestions = possibilities
        }
      },
      populateSuggestion(suggestion) {
        const args = this.rawInput.split(' ')
        this.rawInput = [...args.slice(0, -1), suggestion].join(' ')
        this.suggestions = []
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

<style>
  .suggestions {
    column-count: 2;
  }
</style>
