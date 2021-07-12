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
    // TODO: loggedIn is undefined from backend, but there is "success" boolean
    setLoggedInUser({ commit }, payload) {
      console.log("from store ");
      console.log(payload.loggedIn);
      console.log(payload.username);
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
