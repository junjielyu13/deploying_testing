<template>
    <div :class="{ 'rightSidebar': true, 'collapsed': utilsStore.isCollapsed }">
        <!-- Contenido del sidebar -->
        <userNavBar v-if="userStatusStore.isLogged"></userNavBar>
        <friendListManipulation v-if="userStatusStore.isLogged"></friendListManipulation>
        <friendListBar v-if="userStatusStore.isLogged"></friendListBar>
        <friendSideBarNoLogged v-else></friendSideBarNoLogged>
        <!-- Botón para plegar/desplegar el sidebar -->
        <font-awesome-icon :icon="['fas', 'chevron-right']" v-if="!utilsStore.isCollapsed" class="btn btn-dark collapsed-button" @click="utilsStore.toggleSidebar"/>
        <font-awesome-icon :icon="['fas', 'chevron-left']" v-else class="btn btn-dark collapsed-button" @click="utilsStore.toggleSidebar" />
    </div>
</template>

<script setup>
import userNavBar from '@/components/userNavBar.vue';
import friendListManipulation from '@/components/friendListManipulation.vue';
import friendListBar from '@/components/friendListBar.vue';
import friendSideBarNoLogged from '@/components/friendSideBarNoLogged.vue';
import { useUtilsStore } from '@/stores/utils.js';
import { useUserStatusStore} from '@/stores/userStatus.js';
const utilsStore = useUtilsStore();
const userStatusStore = useUserStatusStore();
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
    opacity: 0.2;
  }
  .collapsed-button:hover{
    opacity: 1;
  }
</style>