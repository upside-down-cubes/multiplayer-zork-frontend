import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loggedIn: false,
    username: null,
  },
  mutations: {
    setIsLoggedInUser(state, loggedIn) {
      this.state.loggedIn = loggedIn;
    },
    setUserName(state, username) {
      this.state.username = username;
    },
  },
  actions: {
    setLoggedInUser({ commit }, payload) {
      commit("setIsLoggedInUser", payload.loggedIn);
      commit("setUserName", payload.username);
    },
    clearUser({ commit }) {
      commit("setIsLoggedInUser", false);
      commit("setUserName", null);
    },
  },
  modules: {},
});
