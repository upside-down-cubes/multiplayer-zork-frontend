<template>
  <v-container>
    <div class="text-center">
      <h1 class="font-weight-light">{{ commandOutput }}</h1>
    </div>
    <br />
    <v-row>
      <v-col offset="4" cols="12" sm="6" md="5">
        <v-text-field
          v-model="commandInput"
          label="Enter Command"
          required
        ></v-text-field>
        <p class="font-weight-light">This is User Input: {{ commandOutput }}</p>
        <br />
        <v-row cols="12" sm="6" md="4" justify="space-around">
          <v-btn color="primary" elevation="5" @click="sendCommandLineProblem"
            >Send Command</v-btn
          >
          <v-btn color="primary" elevation="5" @click="created"
          >connect</v-btn
          >
          <div class="text-center">
            <h1 class="font-weight-light">{{ connection }}</h1>
          </div>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "CommandLine",
  data() {
    return {
      connection: null,
      commandInput: "",
      commandOutput: "HI looo",
      loader: null,
      loading: false,
    };
  },
  methods: {
    sendMessage: function(message) {
      console.log("Hello");
      console.log(this.connection);
      this.connection.send(message);
    },
    async sendCommandLineProblem() {
      // fill here to send data through websocket
      this.sendMessage(this.commandInput)
    },
  },
  created: function() {
    console.log("Starting connection to WebSocket Server")
    this.connection = new WebSocket("ws://localhost:8080/api/commandline")

    this.connection.onmessage = function(event) {
      console.log(event.data);
      this.commandOutput = event.data;
    }

    this.connection.onopen = function(event) {
      console.log(event)
      console.log("Successfully connected to the echo websocket server...")
    }

  },
};
</script>

<style scoped></style>
