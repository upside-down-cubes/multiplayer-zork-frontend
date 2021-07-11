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
    // TODO: loggedIn is undefined from backend, but there is "success" boolean
    setLoggedInUser(state, payload) {
      console.log("from store " + payload.success);
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
