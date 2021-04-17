<template>
  <div class="change-dir">
    <span v-if="!isFound">
      <strong>{{ args.dirname }}</strong> is not a valid directory.
    </span>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'

  import { nodeType } from '@/models/tree'

  import bin from '@/mixins/bin'

  export default {
    name: 'ChangeDir',
    command: 'cd',
    description: 'Switch to given directory as the working directory.',
    argSpec: {
      posArgs: [
        {
          name: 'dirname',
          description: 'the directory to switch to',
          default: '~',
          nodeType: nodeType.FOLDER,
        },
      ],
    },
    mixins: [
      bin,
    ],
    computed: {
      dir() {
        return this.nodeLocatedAt(this.args.dirname.replace(/\/$/, ''))
      },
      isFound() {
        return this.node && this.node.isFolder
      },
      ...mapGetters('terminal', [
        'nodeLocatedAt',
      ]),
    },
    methods: {
      ...mapMutations('terminal', [
        'setCurrentNode',
      ]),
    },
    created() {
      this.node = this.dir

      if (this.isFound) {
        this.setCurrentNode({
          currentNode: this.node,
        })
      }
    },
  }
</script>
