<template>
  <v-container>
    <div class="text-center">
      <h1 class="font-weight-light">This is start page</h1>
    </div>
    <br />
    <v-row>
      <v-col offset="4" cols="12" sm="6" md="5">
        <v-text-field
          v-model="commandInput"
          label="Enter Command"
          required
        ></v-text-field>
        <p class="font-weight-light">
          This is User Input: {{commandInput}}
        </p>
        <br />
        <v-row cols="12" sm="6" md="4" justify="space-around">
          <v-btn color="primary" elevation="5" @click="sendCommandLineProblem"
            >Send Command</v-btn
          >
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Start",
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
    },
  },
};
</script>

<style scoped></style>
