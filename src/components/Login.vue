<template v-model="$vuetify.theme.dark">
  <v-container>
    <div class="text-center">
      <h1 class="font-weight-light">Login Page</h1>
      <br>
    </div>
    <v-row>
      <v-col offset="3" cols="10" sm="4" md="6">
        <v-text-field
          v-model="username"
          label="Enter Username"
          filled
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="password"
          label="Enter Password"
          filled
        ></v-text-field>
        <v-btn
            color="primary"
            elevation="5"
            @click="sendUserInfo"
        >Login</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Login",

  data: () => ({
    username: "",
    password: "",
  }),
  methods: {
    sendUserInfo(){
      // send user input to vertify in database
    }
  }
};
</script>
