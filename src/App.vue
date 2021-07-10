<template>
  <v-app>
    <v-app-bar app color="#212121">
      <v-btn to="/home" icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
      <div class="d-flex align-center">
        <v-img
          :src="require('./assets/zorklogo.png')"
          height="90"
          width="70"
          contain
        />
        <h1 class="white--text font-weight-light">Zork Game</h1>
      </div>
    </v-app-bar>

    <v-main>
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
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
