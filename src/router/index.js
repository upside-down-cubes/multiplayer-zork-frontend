import Vue from "vue";
import VueRouter from "vue-router";

import Login from "@/components/Login";
import Home from "@/components/Home";
import store from "@/store";
import Account from "@/components/Account";
import Start from "@/components/Start";

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
  {
    name: "Account",
    path: "/account",
    component: Account,
  },
  {
    name: "Start",
    path: "/start",
    component: Start,
  },
];

const router = new VueRouter({ mode: "history", routes: routes });

router.beforeEach(async (to, from, next) => {
  let response = await Vue.axios.get("/api/whoami");
  await store.dispatch("setLoggedInUser", response.data);
  let loggedIn = store.state.loggedIn;
  // if user log in already but close the window and access the link again, the body page will be white
  if (from.name === null && to.name === null && loggedIn) {
    next({ name: "Home" });
  } else if (to.name === "Login" && loggedIn) {
    next({ name: "Account" });
  } else if (to.name !== "Login" && to.name !== "Home" && !loggedIn) {
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;
