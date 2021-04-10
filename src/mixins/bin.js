import arg from 'arg'

export default {
  props: {
    argv: {
      type: Array,
    },
  },
  computed: {
    args() {
      const { argSpec } = this.$options
      const kwArgs = argSpec.kwArgs ?? [] // Keyword arguments
      const posArgs = argSpec.posArgs ?? [] // Positional arguments

      // Generate 'arg' compliant argument specification
      const spec = {}
      kwArgs.forEach((kwArg) => {
        // Types
        spec[`--${kwArg.name}`] = kwArg.type

        // Aliases
        if (kwArg.aliases) {
          kwArg.aliases.forEach((alias) => {
            spec[`-${alias}`] = `--${kwArg.name}`
          })
        }
      })

      // Run argument parsing
      const processedArgs = arg(
        spec,
        {
          argv: this.argv,
          permissive: true,
        },
      )

      // Convert back to portfolio argument specification
      const args = {}
      kwArgs.forEach((kwArg) => {
        args[kwArg.name] = processedArgs[`--${kwArg.name}`]
      })
      posArgs.forEach((posArg) => {
        if (posArg.catchAll) {
          args[posArg.name] = processedArgs._
        } else {
          args[posArg.name] = processedArgs._.shift() || posArg.default
        }
      })

      return args
    },
  },
}
