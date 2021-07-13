<template>
  <div>
    <br />
    <br />
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
    </v-card>
  </div>
</template>

<script>
import store from "../store";
export default {
  name: "Account",
  data: () => ({
    userName: store.state.username,
  }),
};
</script>

<style scoped></style>
