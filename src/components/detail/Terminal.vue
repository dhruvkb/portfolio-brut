<template>
  <div class="terminal font-mono text-mono my-ln mx-ch">
    <Past/>
    <Present/>
  </div>
</template>

<script>
  import { mapActions, mapMutations, mapState } from 'vuex'

  import Past from '@/components/detail/Past.vue'
  import Present from '@/components/detail/Present.vue'

  import terminalModule from '@/store/modules/terminal'

  import fs from '@/data/fs.json'

  export default {
    name: 'Terminal',
    components: {
      Present,
      Past,
    },
    computed: {
      ...mapState('terminal', [
        'isFirstRun',
      ]),
    },
    methods: {
      ...mapMutations('terminal', [
        'setTree',
        'setIsFirstRun',
      ]),
      ...mapActions('terminal', [
        'exec',
      ]),
    },
    beforeCreate() {
      if (!this.$store.hasModule('terminal')) {
        this.$store.registerModule('terminal', terminalModule)
      }
    },
    async created() {
      this.setTree({ fs })
      if (this.isFirstRun) {
        // Run initial commands
        await this.exec({ rawInput: 'intro' })
        await this.exec({ rawInput: 'help' })
        this.setIsFirstRun({ isFirstRun: false })
      }
    },
    beforeUnmount() {
      if (this.$store.hasModule('terminal')) {
        this.$store.unregisterModule('terminal')
      }
    },
  }
</script>
