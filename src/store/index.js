import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loggedIn: false,
    username: null,
  },
  mutations: {},
  actions: {
    setLoggedInUser(state, payload) {
      state.loggedIn = payload.loggedIn;
      state.username = payload.username;
    },
    clearUser(state) {
      state.loggedIn = false;
      state.username = null;
    },
  },
  modules: {},
});
