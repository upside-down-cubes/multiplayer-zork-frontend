<template>
  <v-app>
    <div>
      <v-app-bar app dark color="#212121">
        <!--redirect to home-->
        <router-link :to="{ name: 'Home' }">
          <v-img
            :src="require('./assets/zorklogo.png')"
            height="90"
            width="70"
            contain
          />
        </router-link>

        <h1 class="white--text font-weight-light">Zork Game</h1>

        <v-spacer></v-spacer>

        <!--redirect to user login-->
        <v-btn :to="{ name: 'Login' }" icon>
          <v-icon>mdi-account</v-icon>
        </v-btn>
        <v-btn @click="logout">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-app-bar>
    </div>

    <v-main>
      <!--alert message-->
      <v-alert
        v-model="alert"
        border="bottom"
        :color="colorAlert"
        elevation="2"
        dismissible
        type="info"
        >{{ contentAlert }}
      </v-alert>
      <router-view></router-view>
    </v-main>

    <v-footer fixed>
      <v-switch
        v-model="$vuetify.theme.dark"
        style="color: white"
        label="Dark Mode"
        persistent-hint
      ></v-switch>
    </v-footer>
  </v-app>
</template>

<script>
import Vue from "vue";
import store from "./store";

export default {
  name: "App",
  data: () => ({
    contentAlert: "",
    colorAlert: "",
    alert: false,
  }),
  methods: {
    async logout() {
      // send request to logout via get method
      let result = await Vue.axios.get("/api/logout");
      console.log("clicked logout button");
      console.log(result.data);
      console.log("username: " + this.$store.state.username);
      if (
        result.data.success &&
        this.$store.state.username !== null &&
        this.$store.state.username !== undefined
      ) {
        console.log("success");
        this.colorAlert = "green";
        this.contentAlert =
          "You successfully log out as " + this.$store.state.username;
        await store.dispatch("clearUser", result.data);
        console.log("done dispatch");
      } else {
        console.log("fail");
        this.colorAlert = "red";
        this.contentAlert = "Fail to log out. Please try again";
      }
      this.alert = true;
    },
  },
};
</script>
