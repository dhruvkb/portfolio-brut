<template>
  <div class="tree">
    <template v-if="isFound">
      <slot/>
      {{ shape }}
      <Navigable :node="node"/>
      <Tree
        v-for="(child, index) in node.children"
        :key="index"
        :argv="[absolutePathTo(child)]"
        allow-files>
      <slot/>
      {{ childShape }}
      </Tree>
    </template>
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
    name: 'Tree',
    command: 'tree',
    description: 'List contents of directory recursively like a tree.',
    argSpec: {
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
    props: {
      allowFiles: {
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
      }
    },
    computed: {
      dir() {
        return this.nodeLocatedAt(this.args.dirname.replace(/\/$/, ''))
      },
      isFound() {
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
        'nodeLocatedAt',
        'absolutePathTo',
      ]),
    },
    created() {
      this.node = this.dir
    },
  }
</script>
