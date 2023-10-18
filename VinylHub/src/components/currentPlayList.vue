<template>
    <div class="list-container bg-dark">
      <div class="text-center" style="margin-top: 30px; padding:20px;" v-if="noSong">
          <h2>Welcome to VinylHub</h2>
      </div>
      <ul v-else>
        <li v-for="song in props.songNumber" :key="song">
          <router-link :to="{ name: 'SongPlayBack', params: { songName: 'Yesterday', artist: 'The Beatles' } }">
            <currentPlayListSongs :name="song"></currentPlayListSongs>
          </router-link>
        </li>
      </ul>

  </div>
</template>

<script setup>
import currentPlayListSongs from '@/components/currentPlayListSongs.vue';
const props = defineProps({
    noSong: Boolean,
    songNumber: Number,
})
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