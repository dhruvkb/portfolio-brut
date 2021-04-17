<template>
  <div class="concatenate">
    <div
      v-if="isFound"
      v-html="content"
      ref="code"/>
    <template v-else>
      <strong>{{ args.filename }}</strong> is not a valid file.
    </template>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  import hljs from 'highlight.js/lib/core'

  import { nodeType } from '@/plugins/tree'

  import bin from '@/mixins/bin'

  export default {
    name: 'Concatenate',
    command: 'cat',
    description: 'Display the contents of a file.',
    argSpec: {
      posArgs: [
        {
          name: 'filename',
          description: 'the file whose contents to display',
          default: 'vanity',
          nodeType: nodeType.FILE,
        },
      ],
    },
    mixins: [
      bin,
    ],
    data() {
      return {
        content: '',
      }
    },
    computed: {
      file() {
        return this.nodeLocatedAt(this.args.filename.replace(/\/$/, ''))
      },
      isFound() {
        return this.args.filename === 'vanity'
          || (this.node && this.node.isFile)
      },
      lang() {
        if (this.args.filename === 'vanity') {
          return 'markdown'
        }
        return this.node.lang
      },
      path() {
        let filePath
        if (this.args.filename === 'vanity') {
          filePath = ['vanity']
        } else {
          const { parent } = this.node
          const { parent: grandparent } = parent
          filePath = [grandparent, parent, this.node].map(node => node.name)
        }
        return filePath.join('/')
      },
      ...mapGetters('terminal', [
        'nodeLocatedAt',
      ]),
    },
    methods: {
      async fetchContent(filePath) {
        const res = await fetch(filePath)
        this.content = await res.text()
      },
      highlightContent() {
        this.$nextTick(async () => {
          const languageModule = await import(
            /*
             webpackInclude: /(java|javascript|markdown|python|ruby|yaml)/,
             webpackChunkName: "lang-[request]"
             */
            `highlight.js/lib/languages/${this.lang}.js`
            )
          hljs.registerLanguage(this.lang, languageModule.default)
          hljs.highlightAll()
        })
      },
    },
    created() {
      this.node = this.file
    },
    async mounted() {
      const fileModule = await import(
        /* webpackChunkName: "fs-[request]" */
        `@/assets/fs/${this.path}.fs.html`
        )
      await this.fetchContent(fileModule.default)
      this.highlightContent()
    },
  }
</script>

<style lang="css" src="highlight.js/styles/solarized-dark.css"/>
<style lang="css">
  .hljs {
    padding: 0;
  }
</style>
