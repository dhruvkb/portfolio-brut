import { Interaction } from '@/models/interaction'
import { specialNames } from '@/models/tree'

const moduleState = () => ({
  isFirstRun: true,
  tree: null,
  currentNode: null,
  interactionHistory: [],
  isReady: true,
  commandInput: '',
})

const moduleGetters = {
  nodeNamed: state => (nodeName) => {
    let nodeInQuestion = null
    state.tree.traverse((node) => {
      if (node.hasName(nodeName)) {
        nodeInQuestion = node
        return false // stops further traversal
      }
      return true // continues further traversal
    })

    return nodeInQuestion
  },
  nodeLocatedAt: state => (path) => {
    let node = state.currentNode
    const parts = path
      .replace(/\/+/g, '/')
      .split(/(?<=\/)/)

    for (let i = 0; i < parts.length; i += 1) {
      const part = parts[i]

      if (i === 0 && state.tree.hasName(part)) {
        node = state.tree
      } else if (specialNames.CURRENT_DIR.includes(part)) {
        // Do nothing as . refers to current directory
      } else if (specialNames.PARENT_DIR.includes(part)) {
        node = node.parent
      } else {
        node = node.children.find(child => child.hasName(part))
      }
      if (!node) {
        return null
      }
    }

    return node
  },
  absolutePathTo: (state, g) => (node) => {
    if (node.isRoot) {
      return node.name
    }
    return `${g.absolutePathTo(node.parent)}/${node.name}`
  },
}

const moduleMutations = {
  setTree(state, payload) {
    const { tree } = payload
    state.tree = tree
    state.currentNode = tree
  },
  setCurrentNode(state, payload) {
    state.currentNode = payload.currentNode
  },
  setIsReady(state, payload) {
    state.isReady = payload.isReady
  },
  setIsFirstRun(state, payload) {
    state.isFirstRun = payload.isFirstRun
  },
  setCommandInput(state, payload) {
    state.commandInput = payload.commandInput
  },
  pushInteraction(state, payload) {
    state.interactionHistory.push(payload.interaction)
  },
  hideInteractions(state) {
    state.interactionHistory.forEach((interaction) => {
      interaction.hide()
    })
  },
}

const moduleActions = {
  exec({
    state,
    commit,
  }, payload) {
    const pwd = state.currentNode.name
    const context = {
      wd: pwd,
    }
    const { rawInput } = payload

    if (!state.isReady) {
      console.log(`Command ${rawInput} rejected as terminal is busy!`)
      return
    }

    commit('setIsReady', { isReady: false })
    const interaction = new Interaction(context, rawInput)
    commit('pushInteraction', { interaction })
    interaction.process()
  },
}

export default {
  namespaced: true,
  state: moduleState,
  getters: moduleGetters,
  mutations: moduleMutations,
  actions: moduleActions,
}
