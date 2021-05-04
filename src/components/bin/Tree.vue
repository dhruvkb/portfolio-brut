<template>
  <div class="tree">
    <template v-if="isNodeFound">
      <slot/>
      {{ shape }}
      <Navigable
        :node="node"
        :show-aliases="node.isFolder"
        enable-exec/>
      <Tree
        v-for="(child, index) in node.children"
        :key="index"
        :argv="[absolutePathTo(child)]"
        allow-files
        is-subtree>
        <slot/>
        {{ childShape }}
      </Tree>
    </template>
    <template v-else>
      <strong>{{ args.dirpath }}</strong> is not a valid directory.
    </template>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  import Navigable from '@/components/detail/Navigable.vue'

  import { nodeType } from '@/models/tree'

  import bin from '@/mixins/bin'
  import path from '@/mixins/path'

  export default {
    name: 'Tree',
    command: 'tree',
    description: 'List contents of directory recursively like a tree.',
    argSpec: {
      posArgs: [
        {
          name: 'dirpath',
          description: 'the directory of which to list contents',
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
    props: {
      allowFiles: {
        type: Boolean,
        default: false,
      },
      isSubtree: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        pipe: '│',
        tee: '├',
        bend: '└',
        dash: '─',
        space: '\xa0',
        markReadyOnMount: !this.isSubtree,
      }
    },
    computed: {
      // Overrides `isNodeFound` from mixin
      isNodeFound() {
        return this.node && (this.allowFiles || this.node.isFolder)
      },
      isRoot() {
        return !this.$slots.default
      },
      isLastChild() {
        const siblings = this.node.parent.children
        return siblings.indexOf(this.node) === siblings.length - 1
      },
      shape() {
        if (this.isRoot) {
          return ''
        }
        if (this.isLastChild) {
          return [this.bend, this.dash].join('')
        }
        return [this.tee, this.dash].join('')
      },
      childShape() {
        if (this.isRoot) {
          return ''
        }
        if (this.isLastChild) {
          return [this.space, this.space].join('')
        }
        return [this.pipe, this.space].join('')
      },
      ...mapGetters('terminal', [
        'absolutePathTo',
      ]),
    },
  }
</script>
