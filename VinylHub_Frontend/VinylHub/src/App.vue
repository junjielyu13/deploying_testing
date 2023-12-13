<script setup>
	import { RouterView } from 'vue-router'
	import LeftSideBar from '@/components/leftSideBar.vue';
	import rightSideBar from '@/components/rightSideBar.vue';
  import { onBeforeMount, watch } from 'vue';
  import { useMusicDadesStore } from '@/stores/musicDades.js';
  import { useUserStatusStore } from '@/stores/userStatus.js';
  import { useUserDadesStore } from '@/stores/userDades.js';
  const musicDadesStore = useMusicDadesStore();
  const userStatusStore = useUserStatusStore();
  const userDadesStore = useUserDadesStore();
  onBeforeMount(() => {
    if (localStorage.getItem('axios-headers') !== null) {
    userStatusStore.isLogged = true;
    userDadesStore.getUserProfileInformations().then(response => {
      if (response && response.status === 200) {
        userDadesStore.setUserProfileInformations(response);
      }
    }).catch(error => {
      console.error(error);
    });
  }
    musicDadesStore.fetchDiscoverSongs();
    musicDadesStore.fetchDiscoverPlaylists();
    musicDadesStore.fetchArtists();
    musicDadesStore.fetchNewSongs();
    musicDadesStore.fetchHotSongs();
    musicDadesStore.fetchHotPlaylists();
    musicDadesStore.fetchPopularArtists();
    musicDadesStore.fetchGenres();
    if(userStatusStore.isLogged){
      musicDadesStore.fetchMyPlaylists();
      musicDadesStore.fetchMyLikedSongsPlaylist();
      musicDadesStore.fetchFollowedPlaylists();
    }
  });

watch(() => userStatusStore.isLogged, (newValue, oldValue) => {
  if (newValue === true && oldValue === false) {
    musicDadesStore.fetchMyPlaylists();
    musicDadesStore.fetchMyLikedSongsPlaylist();
    musicDadesStore.fetchFollowedPlaylists();
  }
});
</script>

<template>
  <LeftSideBar></LeftSideBar>
  <RouterView></RouterView>
  <rightSideBar></rightSideBar>
</template>

<style>
* {
  padding: 0;
  margin: 0;
}

html,
body {
  background-color: #121212;
  color: white;
  height: 100vh;
  width: 100vw;
}
</style>
