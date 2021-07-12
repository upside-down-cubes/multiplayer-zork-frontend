<template>
  <div class="text-center">
    <h1>This is Account Page</h1>
    <p>Current User Name: {{ userName }}</p>
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
