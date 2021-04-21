<template>
  <div class="terminal font-mono text-mono py-ln px-ch">
    <Past/>
    <Present/>
  </div>
</template>

<script>
  import { mapActions, mapMutations, mapState } from 'vuex'

  import Past from '@/components/detail/Past.vue'
  import Present from '@/components/detail/Present.vue'

  import terminalModule from '@/store/modules/terminal'

  import { Tree } from '@/models/tree'

  import experience from '@/data/experience.json'
  import work from '@/data/work.json'

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
      makeTree() {
        const rootNode = new Tree('folder', '~')
        rootNode.makeRoot()

        const experienceNode = Tree.parse(experience)
        const workNode = Tree.parse(work)

        const nodes = [experienceNode, workNode]
        nodes.forEach((node) => {
          node.setParent(rootNode)
          rootNode.appendChild(node)
        })

        return rootNode
      },
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
      this.setTree({ tree: this.makeTree() })
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
