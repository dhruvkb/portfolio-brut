import { parse } from '@/plugins/tree'
import Interaction from '@/plugins/terminal'

const getters = {}

const mutations = {
  setTree(state, payload) {
    const rootNode = parse(payload.fs)
    state.tree = rootNode
    state.currentNode = rootNode
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
}

const actions = {
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
  state: {
    isFirstRun: true,
    tree: null,
    currentNode: null,
    interactionHistory: [],
    isReady: true,
  },
  getters,
  mutations,
  actions,
}
