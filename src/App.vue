<template>
  <v-app>
    <v-app-bar app :style="{background: $vuetify.theme.themes['light'].background}">
      <div class="d-flex align-center">
        <h1 class="white--text font-weight-light">Zork Game</h1>
      </div>
    </v-app-bar>

    <v-main>
      <Login />
    </v-main>
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
