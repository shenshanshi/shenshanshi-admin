<template>
  <div id="app">
<!--    <img alt="Vue logo" src="./assets/logo.jpg">-->
    <router-view></router-view>
  </div>
</template>

<script>
import Home from "@/views/Home";

export default {
  name: 'App',
  components: {
    Home
  }
}
</script>

<style>
/*#app {*/
/*  font-family: Avenir, Helvetica, Arial, sans-serif;*/
/*  -webkit-font-smoothing: antialiased;*/
/*  -moz-osx-font-smoothing: grayscale;*/
/*  text-align: center;*/
/*  color: #2c3e50;*/
/*  margin-top: 60px;*/
/*}*/
</style>
