<template>
  <div class="concatenate">
    <div
      v-if="isValid"
      v-html="content"
      ref="code"/>
    <template v-else>
      <strong>{{ args.filepath }}</strong> is not a valid file.
    </template>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  import hljs from 'highlight.js/lib/core'

  import { nodeType } from '@/models/tree'

  import bin from '@/mixins/bin'
  import path from '@/mixins/path'

  export default {
    name: 'Concatenate',
    command: 'cat',
    description: 'Display the contents of a file.',
    argSpec: {
      posArgs: [
        {
          name: 'filepath',
          description: 'the path or name of the file whose contents to display',
          default: 'vanity',
          nodeType: nodeType.FILE,
        },
      ],
    },
    mixins: [
      bin,
      path('filepath'),
    ],
    data() {
      return {
        content: '',
        markReadyOnMount: false,
      }
    },
    computed: {
      isValid() {
        return this.args.filepath === 'vanity' || this.isNodeFound
      },
      languages() {
        return this.node?.languages ?? ['markdown']
      },
      path() {
        let filePath
        if (this.args.filepath === 'vanity') {
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
          const languageModules = await Promise.all(this.languages.map(lang => import(
            /*
             webpackInclude: /(java|javascript|markdown|python|ruby|yaml)/,
             webpackChunkName: "lang-[request]"
             */
            `highlight.js/lib/languages/${lang}.js`
            )))
          for (let i = 0; i < languageModules.length; i += 1) {
            hljs.registerLanguage(this.languages[i], languageModules[i].default)
          }
          hljs.highlightAll()
        })
      },
    },
    async mounted() {
      const fileModule = await import(
        /* webpackChunkName: "fs-[request]" */
        `@/assets/fs/${this.path}.fs.html`
        )
      await this.fetchContent(fileModule.default)
      this.highlightContent()
      this.setIsReady({
        isReady: true,
      })
    },
  }
</script>

<style lang="css" src="highlight.js/styles/solarized-dark.css"/>
<style lang="css">
  .hljs {
    padding: 0;
  }
</style>
