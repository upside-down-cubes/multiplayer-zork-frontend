<template>
  <v-container>
    <div class="text-center">
      <h1 class="font-weight-light">This is start page</h1>
    </div>
    <br />
    <v-row>
      <v-col offset="4" cols="12" sm="6" md="5">
        <v-text-field
          v-on:keyup.enter="sendCommandLineProblem"
          v-model="commandInput"
          label="Enter Command"
          required
        ></v-text-field>
        <p class="font-weight-light">This is User Input: {{ commandInput }}</p>
        <br />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "CommandLine",
  data() {
    return {
      commandInput: "",
      loader: null,
      loading: false,
    };
  },
  methods: {
    async sendCommandLineProblem() {
      // fill here to send data through websocket
      console.log("actions from commandLine page (Press enter or button)");
      this.commandInput = "";
    },
  },
};
</script>

<style scoped></style>
