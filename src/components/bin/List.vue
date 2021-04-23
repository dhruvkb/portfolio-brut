<template>
  <div class="list">
    <ul v-if="isNodeFound" class="children-list">
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
      <strong>{{ args.dirpath }}</strong> is not a valid directory.
    </template>
  </div>
</template>

<script>
  import Navigable from '@/components/detail/Navigable.vue'

  import { nodeType } from '@/models/tree'

  import bin from '@/mixins/bin'
  import path from '@/mixins/path'

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
          name: 'dirpath',
          description: 'the path or name of the directory whose contents to list',
          default: '.',
          nodeType: nodeType.FOLDER,
        },
      ],
    },
    mixins: [
      bin,
      path('dirpath'),
    ],
    components: {
      Navigable,
    },
  }
</script>

<style scoped lang="css">
  .children-list {
    column-count: 2;
  }
</style>
