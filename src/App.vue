<script setup>
  import {RouterView} from "vue-router"
  import Menu from "./components/Menu.vue"
  import './assets/fonts.css';
</script>

<template>

  <div class="container">
    <Menu />
    <RouterView />
  </div>

</template>

<style>
  * {
    font-family: 'OpenSans';
  }
  
</style>