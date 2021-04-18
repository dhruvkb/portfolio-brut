<template>
  <div class="change-dir">
    <span v-if="!isNodeFound">
      <strong>{{ args.dirpath }}</strong> is not a valid directory.
    </span>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'

  import { nodeType } from '@/models/tree'

  import bin from '@/mixins/bin'
  import path from '@/mixins/path'

  export default {
    name: 'ChangeDir',
    command: 'cd',
    description: 'Switch to given directory as the working directory.',
    argSpec: {
      posArgs: [
        {
          name: 'dirpath',
          description: 'the path or name of the directory to switch to',
          default: '~',
          nodeType: nodeType.FOLDER,
        },
      ],
    },
    mixins: [
      bin,
      path('dirpath'),
    ],
    computed: {
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
      if (this.isNodeFound) {
        this.setCurrentNode({
          currentNode: this.node,
        })
      }
    },
  }
</script>
