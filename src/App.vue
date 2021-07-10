<template>
  <v-app>
    <v-app-bar app color="#212121">
      <div class="d-flex align-center">
        <h1 class="white--text font-weight-light">Zork Game</h1>
      </div>
    </v-app-bar>

    <v-main>
      <Login />
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
import Login from "./components/Login";

export default {
  name: "App",

  components: {
    Login,
  },

  data: () => ({
    //
  }),
};
</script>
