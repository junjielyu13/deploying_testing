<script setup>
    import navbar from './navbar.vue';
    import playBackControls from './playBackControls.vue';
    import { ref } from 'vue';

    // variables

    const isLogged = ref(false);
    const isPlayingSong = ref(false);
    const noSong = ref(false);
    const repeatMode = ref(1);
    const songNumber= ref(3);
    // functions
    const getState = (value) => {
      isPlayingSong.value = value; // Update the received value in the parent
    };

    const getRepeatMode = (value) => {
      repeatMode.value = value;
    }

</script>

<template>
      <!-- Sidebar -->
      <div class="sidebar">
        <!-- Contenido del sidebar -->
        <navbar :isLogged="isLogged"></navbar>
        <playBackControls :isPlayingSong="isPlayingSong" :noSong="noSong" :repeatMode="repeatMode" 
        :songNumber="songNumber" @changeState="getState" @changeRepeatState="getRepeatMode"></playBackControls>
      </div>
  

</template>
  
<style scoped>
  .sidebar {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 20vw;
    background-color: #121212;
  }


</style>
  
  
  