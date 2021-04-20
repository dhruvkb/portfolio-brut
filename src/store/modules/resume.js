const moduleState = () => ({
  orgs: [],
  epics: [],
})

const moduleGetters = {
  roles: state => state.orgs.map(org => org.roles).flat(),
  projects: state => state.epics.map(epic => epic.projects).flat(),
}

const moduleMutations = {
  setOrgs(state, payload) {
    state.orgs = payload.orgs
  },
  setEpics(state, payload) {
    state.epics = payload.epics
  },
}

export default {
  namespaced: true,
  state: moduleState,
  getters: moduleGetters,
  mutations: moduleMutations,
}
