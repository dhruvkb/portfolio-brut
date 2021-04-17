<template>
  <div class="list">
    <ul v-if="isFound" class="children-list">
      <template v-if="args.all">
        <li>
          <Navigable :node="node">.</Navigable>
        </li>
        <li>
          <Navigable :node="node.parent">..</Navigable>
        </li>
      </template>
      <li
        v-for="(child, index) in node.children"
        :key="index">
        <Navigable :node="child"/>
      </li>
    </ul>
    <template v-else>
      <strong>{{ args.dirname }}</strong> is not a valid directory.
    </template>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  import Navigable from '@/components/detail/Navigable.vue'

  import { nodeType } from '@/models/tree'

  import bin from '@/mixins/bin'

  export default {
    name: 'List',
    command: 'ls',
    description: 'List the contents of the given directory.',
    argSpec: {
      kwArgs: [
        {
          name: 'all',
          aliases: ['a'],
          description: 'whether to show hidden files as well',
          type: Boolean,
        },
      ],
      posArgs: [
        {
          name: 'dirname',
          description: 'the directory of which to list contents',
          default: '.',
          nodeType: nodeType.FOLDER,
        },
      ],
    },
    mixins: [
      bin,
    ],
    components: {
      Navigable,
    },
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
    created() {
      this.node = this.dir
    },
  }
</script>

<style scoped lang="css">
  .children-list {
    column-count: 2;
  }
</style>
