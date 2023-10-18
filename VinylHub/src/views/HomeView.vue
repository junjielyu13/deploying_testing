<template>
  <div class="container-fluid home-view d-flex flex-column align-items-center justify-content-center">
    <!-- Barra de búsqueda -->
    <div class="row search-bar">
      <div class="col-12">
        <input v-model="searchQuery" class="form-control" placeholder="Buscar canciones o playlists" @input="search">
      </div>
    </div>

    <!-- Recommended Songs -->
    <div class="recommended">
      <div class="row recommended-section">
        <div class="col-12">
          <h2 class="section-title">Recommended Songs</h2>
          <div class="row song-list">
            <router-link
              v-for="(song, index) in recommendedSongs"
              :to="{ name: 'SongPlayBack', params: { songName: song.name, artist: song.author } }"
              class="col-md-3 mb-2"
              :key="index"
            >
              <div class="song-item">
                <font-awesome-icon :icon="['fas', 'music']" /> {{ song.name }}
                <div class="author">{{ song.author }}</div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <!-- Recommended Playlists -->
      <div class="row recommended-section">
        <div class="col-12">
          <h2 class="section-title">Recommended Playlists</h2>
          <div class="row playlist-list">
            <div v-for="(playlist, index) in recommendedPlaylists" :key="index" class="col-md-3 mb-2">
                <div class="playlist-item">
                  <font-awesome-icon :icon="['fas', 'list']" /> {{ playlist.name }}
                  <div class="author">{{ playlist.author }}</div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>





<script>
/*Importem axios per la connexió amb el backend*/
import axios from 'axios';

/*Importem per a tenir icones*/
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMusic, faList } from '@fortawesome/free-solid-svg-icons';

import { RouterLink } from 'vue-router';

library.add(faMusic, faList);


export default {
  components: {
    FontAwesomeIcon,
  },
  data() {
  return {
    searchQuery: "",
    recommendedSongs: [
  { name: "Yesterday", author: "The Beatles" },
  { name: "Bohemian Rhapsody", author: "Queen" },
  { name: "Hotel California", author: "Eagles" },
  { name: "Imagine", author: "John Lennon" },
  { name: "Like a Rolling Stone", author: "Bob Dylan" },
  { name: "Let It Be", author: "The Beatles" },
  { name: "Smells Like Teen Spirit", author: "Nirvana" },
  { name: "Hey Jude", author: "The Beatles" }
],
recommendedPlaylists: [
  { name: "Top 100 Hits", author: "Various Artists" },
  { name: "Classic Rock Anthems", author: "Various Artists" },
  { name: "80's Pop Party", author: "Various Artists" },
  { name: "Chill Vibes", author: "Various Artists" },
  { name: "Indie Alternatives", author: "Various Artists" },
  { name: "Hip-Hop Classics", author: "Various Artists" },
  { name: "Feel-Good Folk", author: "Various Artists" },
  { name: "R&B Jams", author: "Various Artists" }
]

  };
}
,
methods: {
    // Realiza una solicitud HTTP para obtener canciones recomendadas
    /*async fetchRecommendedSongs() {
      try {
        const response = await axios.get('URL_CANÇONS'); // Cal reemplaçar per la URL real encara
        this.recommendedSongs = response.data.slice(0, 8); //Limitem les recommended songs a només 8 elements
      } catch (error) {
        console.error("Error when getting recommended songs", error);
      }
    },
    // Realiza una solicitud HTTP para obtener playlists recomendadas
    async fetchRecommendedPlaylists() {
      try {
        const response = await axios.get('URL_PLAYLISTS'); // Cal reemplaçar
        this.recommendedPlaylists = response.data.slice(0, 8); 
      } catch (error) {
        console.error("Error when getting recommended songss", error);
      }
    },*/
    search() {
      // Implementarem la lògica per la búsqueda aquí
    }
  }
};
</script>

<style scoped>
.section-title {
  color: white; 
}

.home-view {
  color: white;
  height: 90vh;
  position: relative;
  width: 60%;
}

.song-item, .playlist-item {
  margin-bottom: 10px;
  padding: 10px;
  background-color: #333;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.author {
  font-size: 12px; 
  color: gray; 
}


.song-item-link,
.playlist-item-link {
  display: block;
  text-decoration: none;
  width: 100%;
  height: 100%;
}

.song-item-link:hover,
.playlist-item-link:hover {
  background-color: #f0f0f0;
}

.search-bar{
  width: 500px;
  position: absolute;
  top: 0;
  align-items: center;
}


</style>


