<template>
  <div class="concatenate">
    <template v-if="isNodeOk">
      <div
        v-if="content"
        v-html="content"
        ref="code"/>
      <Spinner
        class="spinner"
        v-else/>
    </template>
    <template v-else>
      <strong>{{ filepath }}</strong> is not a valid file.
    </template>
  </div>
</template>

<script lang="ts">
  import {
    computed,
    defineComponent,
    onMounted,
    ref,
    nextTick,
  } from 'vue'

  import {
    ArgType,
    Binary,
    binComposition,
    binProps,
    FsNodeType,
    NodeArg,
    Spinner,
  } from 'seeelaye'

  import hljs from 'highlight.js/lib/core'

  const filepathFn = () => new NodeArg(
    ArgType.POSITIONAL,
    'filepath',
    'the path or name of the file whose contents to display',
    FsNodeType.FILE,
    'vanity',
  )
  export const binaryFn = (): Binary<[NodeArg], []> => {
    const filepath = filepathFn()
    return new Binary<[NodeArg], []>(
      'Concatenate',
      'cat',
      'Display the contents of a file.',
      [filepath],
      [],
    )
  }

  export default defineComponent({
    name: 'Concatenate',
    components: {
      Spinner,
    },
    props: binProps,
    setup(props) {
      const binary = binaryFn()
      const filepath = binary.args[0] as NodeArg

      const { setTerminalReady } = binComposition(false)
      binary.processArgs(props.argv)

      const filepathValue = filepath.handlerValue
      const node = filepath.value
      const isNodeOk = (filepathValue === 'vanity')
        || (filepath.isNodeFound && filepath.isNodeValidType)

      const path = computed(() => {
        if (filepathValue === 'vanity') {
          return 'vanity'
        }

        if (!node) {
          throw new Error('Could not resolve node')
        }

        const { parent } = node
        const { parent: grandparent } = parent
        return [
          grandparent, parent,
          node,
        ].map((ancestor) => ancestor.name).join('/')
      })
      const languages = computed(() => node?.language ?? ['markdown'])

      const content = ref('')
      const fetchContent = async (filePath: string) => {
        // Artificial delay to enjoy the spinner
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const res = await fetch(filePath)
        content.value = await res.text()
      }
      const highlightContent = () => {
        nextTick(async () => {
          const languageModules = await Promise.all(languages.value.map((lang) => import(
            /*
             webpackInclude: /(java|javascript|latex|markdown|python|ruby|typescript|xml|yaml)/,
             webpackChunkName: "lang-[request]"
             */
            `@/../node_modules/highlight.js/lib/languages/${lang}` // TODO: Fix path
            )))
          for (let i = 0; i < languageModules.length; i += 1) {
            hljs.registerLanguage(languages.value[i], languageModules[i].default)
          }
          hljs.highlightAll()
        })
      }
      onMounted(async () => {
        if (isNodeOk) {
          try {
            const fileModule = await import(
              /* webpackChunkName: "fs-[request]" */
              `@/assets/fs/${path.value}.fs.html`
              )
            await fetchContent(fileModule.default)
            highlightContent()
            setTerminalReady(true)
          } catch (ex) {
            setTerminalReady(true)
            throw ex
          }
        }
      })

      return {
        isNodeOk,
        content,
        filepath: filepathValue,
      }
    },
  })
</script>

<style lang="css" src="highlight.js/styles/base16/solarized-dark.css"/>
<style scoped lang="css">
  .spinner {
    --spinner-edge-color: var(--color-accent-b);
    --spinner-char-color: var(--color-accent-y);
  }

  ::v-deep(.hljs) {
    padding: 0;
    overflow-x: unset; /* patch for slight vertical scroll */
  }
</style>
