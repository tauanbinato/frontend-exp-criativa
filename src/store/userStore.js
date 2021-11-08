
const state = {
  token: ""
}

const mutations = {
  setOngs (state, payload) {
    state.token = payload
  }
}

const actions = {
//   async fetchActiveOngs ({ commit }) {
//   },
//   async registerVote ({ commit, getters, rootGetters }, payload) {
//   },
}

const getters = {
  getOngs: state => {
    return state.token
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
