<template>
    <div :class="{ 'rightSidebar': true, 'collapsed': isCollapsed }">
        <!-- Contenido del sidebar -->
        <userNavBar v-if="isLogged"></userNavBar>
        <friendListManipulation v-if="isLogged"></friendListManipulation>
        <friendListBar :friendNumbers="friendNumbers" v-if="isLogged"></friendListBar>
        <friendSideBarNoLogged v-else></friendSideBarNoLogged>
        <!-- Botón para plegar/desplegar el sidebar -->
        <font-awesome-icon :icon="['fas', 'chevron-right']" v-if="!isCollapsed" class="btn btn-dark collapsed-button" @click="toggleSidebar"/>
        <font-awesome-icon :icon="['fas', 'chevron-left']" v-else class="btn btn-dark collapsed-button" @click="toggleSidebar" />
    </div>
</template>

<script setup>
import userNavBar from './userNavBar.vue';
import friendListManipulation from './friendListManipulation.vue';
import friendListBar from './friendListBar.vue';
import friendSideBarNoLogged from './friendSideBarNoLogged.vue';
import {ref} from 'vue';

const friendNumbers = ref(99);
const isCollapsed = ref(false);
const isLogged = ref(false);
const toggleSidebar = () => {
        isCollapsed.value = !isCollapsed.value;
};
</script>

<style scoped>
  .rightSidebar {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 20vw;
    transition: transform 0.3s;
    background-color: #121212;
  }
  .collapsed {
    transform: translateX(20vw);
  }
  
  .collapsed-button {
    position: fixed;
    right: 20vw;
    top: 45%;
    height: 70px;
    width: 10px;
    border-radius: 10px 0 0 10px;
  }
</style>