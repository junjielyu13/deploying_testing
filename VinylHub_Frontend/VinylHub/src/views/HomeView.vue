<template>
<div class="home-view"
:class="{ 'resizeHomeView': utilsStore.isCollapsed }" >
<!-- Hot Songs  -->
<div class="swiper-container mx-auto" style="max-width: 90%;">
      <h2 class="section-title">Hot Songs</h2>
      <swiper
        :modules="modules"
        :slides-per-view="5"
        :slides-per-group="5"
        :space-between="10"
        navigation
        :pagination="{ clickable: true }"
        :scrollbar="{ draggable: true }"
        style="height: 240px;"
      >
        <swiper-slide v-for="(song, index) in musicDadesStore.hotSongs" :key="index">
          <router-link
          :to="{ name: 'SongPlayBack', params: { songId: song.id }}"
            @click="currentSong(song, true)"
            style="height: 100%;"
          >
            <div class="song-item" style="height: 100%;">
              <div class="song-img">
				<img v-if="song.cover" :src="song.cover" style="height: 100%; width: 100%;">
			</div>
              <div class="contingut">
                <font-awesome-icon :icon="['fas', 'music']" style="color: white; font-weight: bold;" />&nbsp;
                <span style="color: white; font-weight: bold;">{{ song.title }}</span>
                <br>
                <div class="author">{{ musicDadesStore.getArtistName(song.artist_id) }}</div>
              </div>
            </div>
          </router-link>
        </swiper-slide>
      </swiper>
       <!-- Contenedor para los puntos de paginación -->
      <div class="swiper-pagination"></div> 
    </div>


    <div class="swiper-container mx-auto" style="max-width: 90%;">
      <h2 class="section-title">Hot Playlists</h2>
      <swiper
        :modules="modules"
        :slides-per-view="5"
        :slides-per-group="5"
        :space-between="10"
        navigation
        :pagination="{ clickable: true }"
        :scrollbar="{ draggable: true }"
        style="height: 240px;"
      >
        <swiper-slide v-for="(playlist, index) in musicDadesStore.hotPlaylists" :key="index">
            <router-link 
              :to="{name: 'Playlist', params: {playlistId: playlist.id}}"
              @click="getPlaylistInfo(playlist)"
            >
            <div class="playlist-item" style="height: 100%;">
              <div class="playlist-img">
								<img v-if="playlist.cover" :src="playlist.cover" style="height: 100%; width: 100%;">	
							</div>
              <div class="contingut">
                <font-awesome-icon :icon="['fas', 'fa-list']" style="color: white; font-weight: bold;" />&nbsp;
                <span style="color: white; font-weight: bold;">{{ playlist.name }}</span>
              </div>
            </div>
          </router-link>
        </swiper-slide>
      </swiper>
       <!-- Contenedor para los puntos de paginación -->
      <div class="swiper-pagination"></div> 
    </div>
      

  <div class="playlists-container d-flex justify-content-start align-items-center flex-column mx-auto">
    <div class="suggested-container">
      <div class="recommended">
        
        <!-- Recommended Playlists -->
        <div class="row recommended-section">
          <div class="col-12">
            <h2 class="section-title">Recommended Playlists</h2>
            <div class="row playlist-list">
              <router-link v-for="(playlist, index) in musicDadesStore.recommendedPlaylists" :key="index" class="col-md-3 mb-2"
              :to="{name: 'Playlist', params: {playlistId: playlist.id}}"
              @click="getPlaylistInfo(playlist)"
            >
              <div class="recommended-playlist-item">
                <div class="contingut">
                  <font-awesome-icon :icon="['fas', 'fa-list']" style="color: rgba(237, 65, 65, 0.8); font-weight: bold;" />&nbsp;
                  <span style="color: rgba(237, 65, 65, 0.8); font-weight: bold;">{{ playlist.name }}</span>
                </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>





<script>
  // Import Swiper core and required modules
  import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from 'swiper/vue';

  // Import Swiper styles
  import 'swiper/css';
  import 'swiper/css/navigation';
  import 'swiper/css/pagination';
  import 'swiper/css/scrollbar';

/*Importem per a tenir icones*/
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMusic, faList } from '@fortawesome/free-solid-svg-icons';
import { useMusicDadesStore } from '@/stores/musicDades.js';
import { useUtilsStore } from '../stores/utils.js';
library.add(faMusic, faList);


export default {
  components: {
    Swiper,
    SwiperSlide,
    FontAwesomeIcon,
},
  data() {
  return {
    searchQuery: "",
    modules: [Navigation, Pagination, Scrollbar, A11y],
    musicDadesStore: useMusicDadesStore(),
    utilsStore: useUtilsStore(),
  };
},

methods: {
    async currentSong(song, bool){
      await this.musicDadesStore.getCurrentSong(song, bool);
    },


    getArtistName(artistId) {
      const artist = this.musicDadesStore.artists.find((a) => a.id === artistId);
      return artist ? artist.artist_name : 'Artista Desconocido'; // Si no se encuentra el artista, muestra un mensaje por defecto
    },
    async getPlaylistInfo(playlist){
      await this.musicDadesStore.getPlaylistById(playlist.id);
      await this.musicDadesStore.getCurrentPlaylist(playlist);
    }
  }
};
</script>

<style scoped>
.section-title {
  margin-bottom: 15px;
  font-weight: bold;
  color: white;
}

.home-view {
  height: 100vh;
  position: fixed;
  top: 0;
  left: 20vw;
  width: 60vw;
  overflow: auto;
  transition: left 0.5s, width 0.5s;
}

.resizeHomeView{
  width: 70vw;
  left: 25vw;
  transition: left 0.5s, width 0.5s;
}

.home-view::-webkit-scrollbar {
  width: 0;
}

.home-view::-webkit-scrollbar-thumb {
  background: transparent;
}
.suggested-container {
  margin: 10px 5px;
}
.recommended-section{
  margin-top: 10px;
}
.song-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.song-item {
  position: relative;
  flex-basis: calc(33.33% - 20px);
  max-width: 100%;
  border-radius: 20px;
  background-image: linear-gradient(to left top, rgba(247, 108, 44, 0.8), rgba(235, 161, 161, 0.999));
  box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.7);
  height: 250px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis; /* Agrega puntos suspensivos si el texto no cabe en una sola línea */
  color: white;
}

.playlist-item {
  position: relative;
  flex-basis: calc(33.33% - 20px);
  max-width: 100%;
  border-radius: 20px;
  background-image: linear-gradient(to left top, rgba(237, 65, 65, 0.8), rgba(235, 161, 161, 0.999));
  box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.7);
  height: 250px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis; /* Agrega puntos suspensivos si el texto no cabe en una sola línea */
  color: white;
}

.recommended-playlist-item {
  flex-basis: calc(33.33% - 20px);
  max-width: 100%;
  padding: 20px;
  border-radius: 20px;
  background-image: linear-gradient(to left top, rgba(255, 255, 255, 0.759), rgba(255, 255, 255, 0.925));
  box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.7);
  height: 80px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: red; 
  display: flex;
  align-items: center;
  justify-content: center;
}
.contingut{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-left: 8px; 
  width: 92%;
}

.author {
  font-size: 12px; 
  color: rgba(255, 251, 251, 0.918); 
}


.playlists-container {
  color: white;
  position: relative;
  width: 90%;
  margin-top: 40px;
}

.song-img {
  display: block;
  height: 75%;
  width: 100%;
  background: bisque;
  margin: auto;
  margin-bottom: 10px;
  background-image: url('../assets/cover2.jpg');
  background-position: center;
  background-repeat: repeat;
  background-size: cover;
}

.playlist-img {
  display: block;
  height: 75%;
  width: 100%;
  background: bisque;
  margin: auto;
  margin-bottom: 10px;
  /* box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.5); */
  background-image: url('../assets/imatgePlaylist.jpg');
  background-position: center;
  background-repeat: repeat;
  background-size: cover;
}


.song-img::after {
  content: '';
  display: block;
  padding-top: 100%;
}

.song-img::before {
  content: '';
  display: block;
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
}

.swiper-container{
  margin-top: 40px;
}
</style> 
