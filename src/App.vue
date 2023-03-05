<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.jpg">
    <Account></Account>
  </div>
</template>

<script>

import Account from "@/views/Account";

export default {
  name: 'App',
  components: {
    Account
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
