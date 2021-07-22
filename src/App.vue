<template>
  <v-app>
    <div>
      <v-app-bar app dark color="#212121">
        <!--redirect to home-->
        <router-link :to="{ name: 'Home' }">
          <v-btn fab icon x-large class="mr-3">
            <v-img
              :src="require('./assets/zorklogo.png')"
              height="90"
              width="70"
              contain
            />
          </v-btn>
        </router-link>

        <h1 class="white--text font-weight-bold">Mult / Zork</h1>

        <v-spacer></v-spacer>

        <v-menu bottom min-width="200px" open-on-hover offset-y>
          <template v-slot:activator="{ on }">
            <v-btn icon x-large v-on="on">
              <v-avatar size="48">
                <v-icon>mdi-account</v-icon>
              </v-avatar>
            </v-btn>
          </template>
          <v-card class="mx-auto" max-width="344" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <div
                  v-if="this.$store.state.loggedIn === true"
                  class="text-overline mb-4"
                >
                  USERNAME
                </div>
                <v-list-item-title
                  v-if="this.$store.state.loggedIn === true"
                  class="text-h5 mb-1"
                >
                  {{ this.$store.state.username }}
                </v-list-item-title>
                <v-list-item-title v-else class="text-h5 mb-1">
                  Please log in
                </v-list-item-title>
                <v-list-item-subtitle v-if="this.$store.state.loggedIn === true"
                  >Status: Online</v-list-item-subtitle
                >
                <v-list-item-subtitle v-else
                  >Status: Offline</v-list-item-subtitle
                >
              </v-list-item-content>

              <v-list-item-avatar size="60" color="grey">
                <v-icon dark> mdi-account </v-icon>
              </v-list-item-avatar>
            </v-list-item>

            <v-card-actions justify="space-around">
              <v-btn
                text
                v-if="this.$store.state.loggedIn === false"
                :to="{ name: 'Login' }"
              >
                Log in
              </v-btn>
              <v-btn text v-else @click="logout"> Logout </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-app-bar>
    </div>

    <v-main>
      <!--alert message-->
      <p></p>
      <v-row>
        <v-col offset="2" cols="10" sm="4" md="9">
          <v-alert
            v-model="alert"
            border="bottom"
            :color="colorAlert"
            elevation="2"
            dismissible
            type="info"
            >{{ contentAlert }}
          </v-alert>
        </v-col>
      </v-row>
      <router-view></router-view>
    </v-main>

    <v-footer fixed app>
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
import router from "./router";
export default {
  name: "App",
  metaInfo: {
    title: "Mult / Zork",
    titleTemplate: "%s | My Awesome Webapp",
  },
  data: () => ({
    contentAlert: "",
    colorAlert: "",
    alert: false,
  }),
  created() {
    document.title = "Mult / Zork";
  },
  methods: {
    async logout() {
      // send request to logout via get method
      let result = await Vue.axios.get("/api/logout");
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
        await router.push({ name: "Login" });
      } else {
        this.colorAlert = "red";
        this.contentAlert = "Fail to log out. Please try again";
      }
      this.alert = true;
    },
    async isLoggedIn() {
      return this.$store.state.loggedIn;
    },
  },
};
</script>
