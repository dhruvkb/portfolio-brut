import argLib from 'arg'
import { mapMutations } from 'vuex'

export default {
  props: {
    argv: {
      type: Array,
    },
  },
  data() {
    return {
      markReadyOnMount: true,
    }
  },
  computed: {
    args() {
      const { argSpec } = this.$options
      const kwArgs = argSpec.kwArgs ?? [] // Keyword arguments
      const posArgs = argSpec.posArgs ?? [] // Positional arguments

      // Generate 'arg' compliant argument specification
      const spec = {}
      kwArgs.forEach((arg) => {
        // Types
        spec[`--${arg.name}`] = arg.type

        // Aliases
        if (arg.aliases) {
          arg.aliases.forEach((alias) => {
            spec[`-${alias}`] = `--${arg.name}`
          })
        }
      })

      // Run argument parsing
      const processedArgs = argLib(
        spec,
        {
          argv: this.argv,
          permissive: true,
        },
      )

      // Convert back to portfolio argument specification
      const args = {}
      kwArgs.forEach((arg) => {
        args[arg.name] = processedArgs[`--${arg.name}`]
      })
      posArgs.forEach((arg) => {
        if (arg.catchAll) {
          args[arg.name] = processedArgs._
        } else {
          args[arg.name] = processedArgs._.shift() || arg.default
        }
      })

      return args
    },
  },
  methods: {
    ...mapMutations('terminal', [
      'setIsReady',
    ]),
  },
  mounted() {
    if (this.markReadyOnMount) {
      this.setIsReady({
        isReady: true,
      })
    }
  },
}
