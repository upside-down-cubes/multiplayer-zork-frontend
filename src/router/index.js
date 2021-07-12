import Vue from "vue";
import VueRouter from "vue-router";

import Login from "@/components/Login";
import Home from "@/components/Home";
import store from "@/store";

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

router.beforeEach(async (to, from, next) => {
  let response = await Vue.axios.get("/api/whoami");
  await store.dispatch("setLoggedInUser", response.data);
  console.log("from beforeEach");
  console.log(store.state.loggedIn);
  console.log(store.state.username);
  let loggedIn = store.state.loggedIn;
  if (to.name === "Login" && loggedIn) {
    next({ name: "Home" });
  } else if (to.name !== "Login" && to.name !== "Home" && !loggedIn) {
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;
