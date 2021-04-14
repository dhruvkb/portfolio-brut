import { parse } from '@/plugins/tree'
import Interaction from '@/plugins/terminal'

const moduleState = {
  isFirstRun: true,
  tree: null,
  currentNode: null,
  interactionHistory: [],
  isReady: true,
}

const getters = {
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
    let nodeInQuestion = state.currentNode
    const pathEntities = path.split('/')

    for (let i = 0; i < pathEntities.length; i += 1) {
      const entity = pathEntities[i]

      if (entity === '~' || entity === '') {
        nodeInQuestion = state.tree
      } else if (entity === '.') {
        // Do nothing as . refers to current directory
      } else if (entity === '..') {
        nodeInQuestion = nodeInQuestion.parent
      } else {
        nodeInQuestion = nodeInQuestion.children
          .find(child => child.hasName(entity))
        if (!nodeInQuestion) {
          return null
        }
      }
    }

    return nodeInQuestion
  },
  absolutePathTo: (state, g) => (node) => {
    if (node.name === '~') {
      return '~'
    }
    return `${g.absolutePathTo(node.parent)}/${node.name}`
  },
}

const moduleMutations = {
  setTree(state, payload) {
    const rootNode = parse(payload.fs)
    state.tree = rootNode
    state.currentNode = rootNode
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

    commit('setIsReady', { isReady: false })
    const interaction = new Interaction(context, rawInput)
    commit('pushInteraction', { interaction })
    interaction.process()
  },
}

export default {
  namespaced: true,
  state: moduleState,
  getters,
  mutations: moduleMutations,
  actions: moduleActions,
}
