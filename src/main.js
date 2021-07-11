import Vue from "vue";
import VueRouter from "vue-router";
import "./plugins/vue-axios";

import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import Login from "./components/Login";
import Home from "./components/Home";

Vue.use(VueRouter);

const routes = [
  {
    name: "Login",
    path: "/login",
    component: Login,
  },
  {
    name: "Home",
    path: "/home",
    component: Home,
  },
];

const router = new VueRouter({ mode: "history", routes: routes });

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
