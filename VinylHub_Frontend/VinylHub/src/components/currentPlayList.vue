<template>
    <div class="list-container bg-dark">
      <div class="text-center" style="margin-top: 30px; padding:20px;" v-if="musicDadesStore.currentSpecificPlayList === null">
          <h2>Welcome to VinylHub</h2>
      </div>
      <ul v-else>
        <li v-for="song in musicDadesStore.currentSpecificPlayList.songs" :key="song.id" @dblclick="utilsStore.doubleClickSong(song)">
            <currentPlayListSongs :song="song"></currentPlayListSongs>
        </li>
      </ul>

  </div>
</template>

<script setup>
import currentPlayListSongs from '@/components/currentPlayListSongs.vue';
import {useMusicDadesStore} from '@/stores/musicDades.js';
import { useUtilsStore} from '@/stores/utils.js';
const utilsStore = useUtilsStore();
const musicDadesStore = useMusicDadesStore();
</script>

<style scoped>

.list-container{
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

ul{
  list-style: none;
  padding-inline-start: 0;
  position: relative;
}
.list-container::-webkit-scrollbar {
  width: 15px;
}
.list-container:hover::-webkit-scrollbar-thumb {
  background-color: #666;
}

.list-container:hover::-webkit-scrollbar-track {
  background-color: #333;
} 
</style>