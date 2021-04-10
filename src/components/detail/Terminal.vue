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
      this.$store.registerModule('terminal', terminalModule)
    },
    created() {
      this.setTree({ fs })
      if (this.isFirstRun) {
        // Run initial commands
        this.exec({ rawInput: 'intro' })
        this.setIsFirstRun({ isFirstRun: false })
      }
    },
    beforeUnmount() {
      this.$store.unregisterModule('terminal')
    },
  }
</script>
