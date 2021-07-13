<template>
  <v-container>
    <div class="text-center">
      <h1 class="font-weight-light">This is start page</h1>
    </div>
    <br/>
    <v-row cols="12" sm="6" md="4" justify="space-around">
      <v-btn
        color="primary"
        :loading="loading"
        :disabled="loading"
        elevation="5"
        @click="loader = 'loading'"
        >Back
        <template v-slot:loader>
          <span>Loading...</span>
        </template>
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import router from "../router";

export default {
  name: "Start",
  data() {
    return {
      loader: null,
      loading: false,
    };
  },
  watch: {
    async loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 3000);
      await router.push({ name: "Home" });

      this.loader = null;
    },
  },
};
</script>

<style scoped></style>
