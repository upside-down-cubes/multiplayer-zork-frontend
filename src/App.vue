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
      </v-app-bar>
    </div>

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
