<script setup>
import { RouterLink, RouterView } from 'vue-router'
import LeftSideBar from './components/leftSideBar.vue';
import rightSideBar from './components/rightSideBar.vue';
</script>

<template>
  <LeftSideBar></LeftSideBar>
  <RouterView />
  <rightSideBar></rightSideBar>
</template>

<style>

html, body {
  background-color: #121212;
  color: white;
  margin: 0; 
  padding: 0;
  height: 100%;
}

</style>
