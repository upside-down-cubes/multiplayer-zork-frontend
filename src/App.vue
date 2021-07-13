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
        <v-dialog transition="dialog-top-transition" max-width="600">
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-blind="attrs" icon v-on="on">
              <v-icon>mdi-account</v-icon>
            </v-btn>
          </template>
          <template v-slot:default="dialog">
            <v-card class="mx-auto" max-width="344" outlined>
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="text-overline mb-4">ACCOUNT</div>
                  <v-list-item-title class="text-h5 mb-1">
                    {{ userName }}
                  </v-list-item-title>
                  <v-list-item-subtitle>Status: Online</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-avatar size="60" color="grey">
                  <v-icon dark> mdi-account </v-icon>
                </v-list-item-avatar>
              </v-list-item>

              <v-card-actions>
                <v-btn text> Logout </v-btn>
              </v-card-actions>
              <v-card-actions class="justify-end">
                <v-btn text @click="dialog.value = false">Close</v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
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
    username: store.state.username,
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
