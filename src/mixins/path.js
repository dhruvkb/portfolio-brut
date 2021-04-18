import { mapGetters } from 'vuex'

/**
 * This mixin abstracts functionality related to the path argument of binaries.
 *
 * @param {string} nodeArg - the name of the argument that accepts path
 * @returns {Object} - the mixin, dynamically generated from the argument name
 */
export default nodeArg => ({
  computed: {
    nodeAtPath() {
      const argValue = this.args[nodeArg] ?? ''
      return this.nodeLocatedAt(argValue.replace(/\/$/, ''))
    },
    isNodeFound() {
      const { argSpec } = this.$options
      const argument = argSpec.posArgs.find(arg => arg.name === nodeArg)
      const { nodeType } = argument
      return this.node && this.node.isType(nodeType)
    },
    ...mapGetters('terminal', [
      'nodeLocatedAt',
    ]),
  },
  created() {
    this.node = this.nodeAtPath
  },
})
