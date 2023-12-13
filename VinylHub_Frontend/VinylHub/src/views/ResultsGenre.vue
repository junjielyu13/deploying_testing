<template>
  <div class="genre-results"
    :class="{ 'resizeView': utilsStore.isCollapsed }" >
    <div class="genre-results-header">
      <button class="btn go-back-button" >
        <font-awesome-icon :icon="['fas', 'fa-circle-chevron-left']" style="color: #d6d6d6; font-size: 25px;" class="icon-gray-arrow-white" @click="goBack"/>
      </button>
      <h1 style="font-style: italic;">"{{ musicDadesStore.currentGenre.name }}"</h1>
    </div>
    <div class="results-container mx-auto" style="max-width: 90%;">
      <!-- Check if songsMatching is empty -->
      <div v-if="musicDadesStore.playlistsByGenre.length === 0">
        <p>No results found</p>
      </div>

      <h1 style="font-size: 30px;">"{{ musicDadesStore.currentGenre.name }}" Songs:</h1>
      <div v-for="(song, index) in musicDadesStore.songsByGenre" :key="index">
        <router-link
            :to="{name: 'SongPlayBack', params: {songId: song.id}}"
            @click="getSongInfo(song)">
            <div class="item" style="height: 100%;">
                <div class="song-img">
                  <img v-if="song.cover" :src="song.cover" style="height: 100%; width: 100%;">	
                </div> 
                <div class="contingut2" style="width: 100%;">
                    <font-awesome-icon :icon="['fas', 'music']" style="color: white; font-weight: bold;" />&nbsp;
                    <span style="color: white; font-weight: bold;">{{ song.title }}</span>
                    <br>
                    <div class="author">{{ musicDadesStore.getArtistName(song.artist_id) }}</div>
                </div> 
            </div> 
        </router-link> 
          
      </div> 

      <h1 style="font-size: 30px;">"{{ musicDadesStore.currentGenre.name }}" Playlists:</h1>
      <div v-for="(playlist, index) in musicDadesStore.playlistsByGenre" :key="index">
        <router-link
            :to="{name: 'Playlist', params: {playlistId: playlist.id}}"
            @click="getPlaylistInfo(playlist)">
            <div class="item" style="height: 100%;">
                <div class="playlist-img">
                <img v-if="playlist.cover" :src="playlist.cover" style="height: 100%; width: 100%;">	
              </div> 
              <div class="contingut2" style="width: 100%;">
                <font-awesome-icon :icon="['fas', 'fa-list']" style="color: white; font-weight: bold;" />&nbsp;
                <span style="color: white; font-weight: bold;">{{ playlist.name }}</span>
                <br>
                <span style="color: white; overflow: hidden; text-overflow: ellipsis; max-width: 100px;">
                  {{ playlist.description }}
                </span>
              </div>
            </div>
        </router-link> 
          
      </div> 
      
    </div> 
  </div>       
</template>
  
  <script>

  /*Importem per a tenir icones*/
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import { library } from '@fortawesome/fontawesome-svg-core';
  import { faMusic, faList } from '@fortawesome/free-solid-svg-icons';

  import { useMusicDadesStore } from '@/stores/musicDades.js';
  import { useUtilsStore } from '../stores/utils.js';
  library.add(faMusic, faList);


  export default {
  components: {
    FontAwesomeIcon,
  },
  data() {
  return {
    searchQuery: "",
    musicDadesStore: useMusicDadesStore(),
    utilsStore: useUtilsStore(),
  };
  },

  methods: {
    getArtistName(artistId) {
      const artist = this.musicDadesStore.artists.find((a) => a.id === artistId);
      return artist ? artist.artist_name : 'Artista Desconocido'; // Si no se encuentra el artista, muestra un mensaje por defecto
    },
    getPlaylistInfo(playlist){
      this.musicDadesStore.getCurrentPlaylist(playlist);
      this.musicDadesStore.getPlaylistById(playlist.id);
    },
    getSongInfo(song){
      this.musicDadesStore.getCurrentSong(song);
    },
    goBack() {
        this.$router.go(-1); // Regresa a la vista anterior
    },
  }
  };
  </script>

<style scoped>

.section-title {
  margin-bottom: 15px;
  font-weight: bold;
  color: white;
}

.genre-results {
  height: 100vh;
  position: fixed;
  top: 0;
  left: 20vw;
  width: 60vw;
  overflow: auto;
  transition: left 0.5s, width 0.5s;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
}

.resizeView{
  width: 70vw;
  left: 25vw;
  transition: left 0.5s, width 0.5s;
}

.search-results::-webkit-scrollbar {
  width: 0;
}

.search-results::-webkit-scrollbar-thumb {
  background: transparent;
}
.suggested-container {
  margin: 10px 5px;
}
.recommended-section{
  margin-top: 10px;
}

.playlist-img {
  width: 90px;
  height: 90px; 
  background: bisque;
  margin-right: 10px; 
  box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.5);
  background-image: url('../assets/imatgePlaylist.jpg'); 
  background-position: center;
  background-size: cover; 
}
.song-img {
  width: 90px;
  height: 90px; 
  background: bisque;
  margin-right: 10px; 
  box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.5);
  background-image: url('../assets/imatge.jpg'); 
  background-position: center;
  background-size: cover; 
}


.results-container{
  margin-top: 40px;
}
  
.icon-gray-arrow-white {
  font-size: 32px;
}

.genre-results-header{
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  margin-top: 2.5rem;  
  align-items: center;
  justify-content: center;
  text-align: center;
}

.item {
  background-color: black;
  color: white;
  padding: 10px;
  margin: 5px 0;
  width: 100%;
  height: 10px;
  border-radius: 10px;
  display: flex; /* Usar flexbox para alinear la imagen y el texto */
  align-items: center; /* Centrar verticalmente el contenido */
}

.contingut {
  width: 100%; /* Usar todo el espacio disponible para el texto */
  display: flex;
}

.song-details {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.author {
  font-size: 12px;
  color: rgba(255, 251, 251, 0.918);
}

</style>