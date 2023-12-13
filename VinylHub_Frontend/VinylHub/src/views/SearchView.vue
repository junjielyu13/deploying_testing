<template>
  
  <div class="search-view" :class="{ 'resizeSearchView': utilsStore.isCollapsed }"
  @click="cerrarDropdowns()">
    <div class="container-fluid">
      <!-- Barra de búsqueda -->
      <div class="row search-bar mx-auto">
        <div class="col-12 d-flex align-items-center">
          <input
            v-model="searchQuery"
            class="form-control"
            placeholder="Search songs or playlists"
            @input="onSearchInputChange"
            @keyup.enter="onSearchEnter"
          >
          <button
            type="button"
            class="btn btn-dark play"
            :disabled="!searchQuery"
            @click.stop="navigateToSearchResults()"
          >
            <font-awesome-icon :icon="['fas', 'search']" />
          </button>
        </div>
      </div>
      <br>
      <br>
    </div>

    <!-- Contenido de búsqueda actual -->
    <div v-if="!searching">
      <!-- New Albums & Songs  -->
      <div class="swiper-container mx-auto" style="max-width: 90%;">
          <h2 class="section-title">New Albums & Songs</h2>
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
            <swiper-slide v-for="(song, index) in musicDadesStore.newSongs" :key="index">
              <router-link
              :to="{ name: 'SongPlayBack', params: { songId: song.id }}"
                @click.stop="musicDadesStore.getCurrentSong(song,true)"
                style="height: 100%;"
              >
                <div class="song-item" style="height: 100%;">
                  <div class="song-img">
					<img v-if="song.cover" :src="song.cover" style="height: 100%; width: 100%">
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

      <div class="playlists-container d-flex justify-content-start align-items-center flex-column mx-auto">
            <!-- Genres -->
              <div class="col-12">
                <h2 class="section-title">Genres & Moods</h2>
                <div class="row playlist-list">
                  <router-link v-for="(genre, index) in musicDadesStore.genres" :key="index" class="col-md-3 mb-2"
                    :to="{ name: 'ResultsGenre', params: { genre: genre.name }}"
                    @click.stop="setResults(genre)"
                    style="height: 100%;"
                  >
                  <div class="playlist-item">
                      <span style="color: rgba(237, 65, 65, 0.8); font-weight: bold;">{{ genre.name}}</span>  
                  </div>
                  </router-link>
                </div>
              </div>
      </div>
    </div>

    <!-- Contenido de resultados de búsqueda -->
    <div v-else>
      <button class="btn go-back-button" @click.stop="goBack">
        <font-awesome-icon :icon="['fas', 'fa-circle-chevron-left']" style="color: #d6d6d6;" class="icon-gray-arrow-white"/>
      </button>
      <h1 style="font-style: italic; font-size: 25px; text-align: center;">Search Results: "{{ enterQuery }}" </h1>
      <div class="results-container mx-auto" style="max-width: 90%;">
      <h2 class="section-title">Songs by Name</h2> 
      <div class="playlist-list">
          <!-- Check if songsMatching is empty -->
          <template v-if="musicDadesStore.songsMatching.length === 0">
            <p>No results found</p>
          </template>
        <div v-for="(song, index) in musicDadesStore.songsMatching" :key="index" class="for-item">
         <router-link 
          :to="{ name: 'SongPlayBack', params: { songId: song.id }}"
            @click.stop="getSongInfo($event, song, 'toSong')"
            style="height: 100%;"
          >
            <div class="item" style="height: 100%;">
              <div class="results-song-img">
                <img v-if="song.cover" :src="song.cover" style="height: 100%; width: 100%;">  
              </div> 
              <div class="contingut2" style="width: 100%;">
                <font-awesome-icon :icon="['fas', 'music']" style="color: white; font-weight: bold;" />&nbsp;
                <span style="color: white; font-weight: bold;">{{ song.title }}</span>
                <br>
                <div class="author">{{ musicDadesStore.getArtistName(song.artist_id) }}</div>
              </div>
              <div class="buttons" v-if="userStatusStore.isLogged">
                  <div v-if="!booleanLiked[index]" class="like" name="likeButton" @click.stop="getSongInfo($event, song, 'likeButton', index, true)">
                    <font-awesome-icon :icon="['fas', 'heart']" />
                  </div>
                  <div v-if="booleanLiked[index]" class="liked" name="likedButton" @click.stop="getSongInfo($event, song, 'likedButton', index, true)">
                    <font-awesome-icon :icon="['fas', 'heart']"/>
                  </div>
                  <div class="add-playlist" name="addButton" @click.stop="getSongInfo($event, song, 'addButton', index, true)">
                    <font-awesome-icon
                      :icon="['fas', 'plus']"
                      style="color: #ffffff;   font-size: 17px;"
                    />
                  </div>
              </div>
            </div>
          </router-link> 
            <div v-if="showDropdown1[index]" class="dropdown" ref="dropdown" @click.stop="">
                <div class="dropdown-title">Add to Playlist...</div>
                <div class="playlist-options" v-show="showDropdown1[index]">
                  <div v-for="(playlist, playlistIndex) in musicDadesStore.myPlaylists" :key="playlistIndex" @click.stop="handlePlaylistClick(playlist, song, index, true)">
                      {{ playlist.name }}
                  </div>
                </div>
            </div>
      </div>
      </div>
          <h2 class="section-title">Songs by Artist</h2> 
            <div class="playlist-list">
              <!-- Check if songsMatching is empty -->
              <template v-if="musicDadesStore.songsMatchingArtist.length === 0">
                <p>No results found</p>
              </template>
              <div v-for="(song, index) in musicDadesStore.songsMatchingArtist" :key="index">
              <router-link 
                :to="{ name: 'SongPlayBack', params: { songId: song.id }}"
                  @click.stop="musicDadesStore.getCurrentSong(song,true)"
                  style="height: 100%;"
                >
                  <div class="item" style="height: 100%;">
                    <div class="results-song-img">
                      <img v-if="song.cover" :src="song.cover" style="height: 100%; width: 100%;">  
                    </div>
                    <div class="contingut2">
                      <font-awesome-icon :icon="['fas', 'music']" style="color: white; font-weight: bold;" />&nbsp;
                      <span style="color: white; font-weight: bold;">{{ song.title }}</span>
                      <br>
                      <div class="author">{{ musicDadesStore.getArtistName(song.artist_id) }}</div>
                    </div>
                    <div class="buttons" v-if="userStatusStore.isLogged">
                      <div v-if="!booleanLikedArtist[index]" class="like" name="likeButton" @click.stop="getSongInfo($event, song, 'likeButton', index, false)">
                        <font-awesome-icon :icon="['fas', 'heart']" />
                      </div>
                      <div v-if="booleanLikedArtist[index]" class="liked" name="likedButton" @click.stop="getSongInfo($event, song, 'likedButton', index, false)">
                        <font-awesome-icon :icon="['fas', 'heart']"/>
                      </div>
                      <div class="add-playlist" name="addButton" @click.stop="getSongInfo($event, song, 'addButton', index, false)">
                        <font-awesome-icon
                          :icon="['fas', 'plus']"
                          style="color: #ffffff;   font-size: 17px;"
                        />
                      </div>
                  </div>
                  </div>
                </router-link> 
                  <div v-if="showDropdown2[index]" class="dropdown" ref="dropdown" @click.stop="">
                      <div class="dropdown-title">Add to Playlist...</div>
                      <div class="playlist-options" v-show="showDropdown2[index]">
                          <div v-for="(playlist, playlistIndex) in musicDadesStore.myPlaylists" :key="playlistIndex" @click.stop="handlePlaylistClick(playlist, song, index, false)">
                              {{ playlist.name }}
                          </div>
                      </div>
                  </div>              
                  
              </div>
            </div>
      <h2 class="section-title">Playlists</h2>
          <!-- Check if songsMatching is empty -->
          <template v-if="musicDadesStore.playlistsMatching.length === 0">
            <p>No results found</p>
          </template>
          <div v-for="(playlist, index) in musicDadesStore.playlistsMatching" :key="index">
          <router-link 
              :to="{name: 'Playlist', params: {playlistId: playlist.id}}"
              @click.stop="getPlaylistInfo(playlist)"
            >
            <div class="item" style="height: 100%;">
              <div class="results-playlist-img">
                <img v-if="playlist.cover" :src="playlist.cover" style="height: 100%; width: 100%;">  
              </div>
              <div class="contingut2">
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
      <div v-if="userStatusStore.isLogged">
      <h2 class="section-title">Users</h2>
          <!-- Check if songsMatching is empty -->
          <template v-if="musicDadesStore.usersMatching.length === 0">
            <p>No results found</p>
          </template>
          <div v-for="(user, index) in musicDadesStore.usersMatching" :key="index">
          <router-link 
              :to="{name: 'FriendProfile', params: {friendId: user.id}}"
            >
            <div class="item" style="height: 100%;">
              <div class="results-playlist-img">
                <img v-if="user.avatar" :src="user.avatar" style="height: 100%; width: 100%;">  
              </div>
              <div class="contingut-user">
                <div class="text">
                  <span style="color: white; font-weight: bold;" v-if="user.username !== null">{{ user.username }}</span>
                  <span style="color: white; overflow: hidden; text-overflow: ellipsis; max-width: 100px;" v-else>
                    User no name
                  </span>
                  <br>
                  <span style="color: white; overflow: hidden; text-overflow: ellipsis; max-width: 100px;">
                    {{ user.email }}
                  </span>
                  <br>
                  <span style="color: white; overflow: hidden; text-overflow: ellipsis; max-width: 100px;" v-if="user.name !== null">
                    {{ user.name }}
                  </span>
                  <span style="color: white; font-weight: bold;" v-else>Unknown</span>


                </div>
                <div v-if="booleanRequest[index] && !friendsDadesStore.checkIfIsVinylHubAccount(user.id)" class="friendshipButton">
                  <i class="bi bi-person-fill-add" @click.stop="requestFriendship($event, user, 'request', index)" title="Add friend!"></i>
                </div>
                <div v-else-if="friendsDadesStore.checkFriendExists(user.id) && !friendsDadesStore.checkIfIsVinylHubAccount(user.id)" class="addedFriendButton" title="This user is already your friend.">
                  <i class="bi bi-person-fill-check"></i>
                </div>
              </div>
            </div>
          </router-link>
      </div> 
    </div>
    </div> 
    </div>
  </div>

</template>

<script>
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMusic, faList } from '@fortawesome/free-solid-svg-icons';
import { useMusicDadesStore } from '@/stores/musicDades.js';
import { useUtilsStore } from '@/stores/utils.js';
import { useUserStatusStore } from '@/stores/userStatus.js';
import  { useFriendsDadesStore } from '@/stores/friendsDades.js';
import {ref} from 'vue';


library.add(faMusic, faList);

export default {
  components: {
    Swiper,
    SwiperSlide,
    FontAwesomeIcon,
  }, 

  data() {
    return {
      enterQuery: "",
      searchQuery: "",
      modules: [Navigation, Pagination, Scrollbar, A11y],
      booleanLiked: ref([]),
      booleanLikedArtist: ref([]),
      booleanRequest: ref([]),
      musicDadesStore: useMusicDadesStore(),
      userStatusStore: useUserStatusStore(),
      friendsDadesStore: useFriendsDadesStore(),
      utilsStore: useUtilsStore(),
      searching: false,
      searchTimer: null,
      showDropdown1: ref([]),
      showDropdown2: ref([]),
      friendAdded: false,
    };
  },

  computed: {
    searchResultsRoute() {
      return {
        name: 'SearchResults',
        params: { query: this.searchQuery },
      };
    },
  },

  created () {
      this.booleanLiked = ref(this.musicDadesStore.songsMatching.map((song) => {
                  return this.musicDadesStore.myLikedSongsPlaylist.some((likedSong) => likedSong.id === song.id);
                }));
      this.booleanLikedArtist = ref(this.musicDadesStore.songsMatchingArtist.map((song) => {
        return this.musicDadesStore.myLikedSongsPlaylist.some((likedSong) => likedSong.id === song.id);
      }));
      this.booleanRequest = ref(this.musicDadesStore.usersMatching.map((user) => {
        if(user.friendship_status === null || user.friendship_status === 'denied' || user.friendship_status === 'rejected'){
          return true;
        }
        return false;
      }));

  },

  methods: {
    // Resto de tus métodos existentes

    getSongInfo(e, song, source, index, firstSongs) {
        if (source === 'addButton') {
          e.preventDefault();
          e.stopPropagation();
          this.addToPlaylist(index, firstSongs);
        } else if (source == 'likeButton') {
          e.preventDefault();
          e.stopPropagation();
          this.addToLiked(song, index, firstSongs);
        } else if (source == 'likedButton') {
          e.preventDefault();
          e.stopPropagation();
          this.deleteLikedList(song, index, firstSongs);
        } else {
          this.musicDadesStore.getCurrentSong(song);
        }
      },
      async requestFriendship(e, user, source, index){
        if(source === 'request'){
          this.booleanRequest[index] = !this.booleanRequest[index];
          e.preventDefault();
          e.stopPropagation();
          try {
            await this.musicDadesStore.requestFriendship(user.id);
            this.friendAdded = true;
          } catch (error) {
            console.error("Error:", error);
          }
        }

      },
      cerrarDropdowns() {
        for (let index = 0; index < this.showDropdown1.length; index++) {
          if (this.showDropdown1[index]) {
            this.showDropdown1[index] = false;
          }
        }
        for (let index = 0; index < this.showDropdown2.length; index++) {
          if (this.showDropdown2[index]) {
            this.showDropdown2[index] = false;
          }
        }
      },

    addToPlaylist(index, firstSongs){
      if (firstSongs){
        this.showDropdown1[index] = !this.showDropdown1[index];
      }
      else{
        this.showDropdown2[index] = !this.showDropdown2[index];
      }
        
    },

    async addToLiked(song, index, firstSongs){
        if (firstSongs){
          this.booleanLiked[index] = !this.booleanLiked[index];
        }
        else{
          this.booleanLikedArtist[index] = !this.booleanLikedArtist[index];
        }
        try {
          await this.musicDadesStore.addLikedSong(song);
          await this.musicDadesStore.fetchMyLikedSongsPlaylist();
        } catch (error) {
          console.error("Error:", error);
        }
        
      },

    async deleteLikedList(song, index, firstSongs){
        if (firstSongs){
          this.booleanLiked[index] = !this.booleanLiked[index];
        }
        else{
          this.booleanLikedArtist[index] = !this.booleanLikedArtist[index];
        }
        try {
            await this.musicDadesStore.deleteLikedSong(song);
            await this.musicDadesStore.fetchMyLikedSongsPlaylist();
            } catch (error) {
              console.error("Error:", error);
            }
        
    },

    async handlePlaylistClick(playlist, song, index, booleano) {
        if (booleano){
          this.showDropdown1[index] = !this.showDropdown1[index];
        }
        else{
          this.showDropdown2[index] = !this.showDropdown2[index];
        }
        try {
          await this.musicDadesStore.postSongMyPlaylist(song.id, playlist.id);
        } catch (error) {
          console.error("Error:", error);
        }

      },

    async onSearchInputChange() {
      if (this.searchQuery === "") {
        // Cuando se borra la búsqueda, muestra el contenido original
        this.searching = false;
        clearTimeout(this.searchTimer);
      }
      else{
        this.searching = true;
        clearTimeout(this.searchTimer);
        this.searchTimer = setTimeout(this.searchForResults, 400);
      }
    },

    onSearchEnter() {
      if (this.searchQuery) {
        this.searching = true;
        clearTimeout(this.searchTimer);
        this.searchForResults(true);
      }
    },

    async searchForResults(resetSearchQuery = false) {
      try {
        await this.musicDadesStore.fetchSearchResults(this.searchQuery);
      } catch (error) {
        console.error("Error:", error);
      }
      this.showDropdown1 = ref( new Array(this.musicDadesStore.songsMatching.length).fill(false));
      this.showDropdown2 = ref( new Array(this.musicDadesStore.songsMatchingArtist.length).fill(false));
      this.booleanLiked = ref(this.musicDadesStore.songsMatching.map((song) => {
                return this.musicDadesStore.myLikedSongsPlaylist.some((likedSong) => likedSong.id === song.id);
              }));
      this.booleanLikedArtist = ref(this.musicDadesStore.songsMatchingArtist.map((song) => {
        return this.musicDadesStore.myLikedSongsPlaylist.some((likedSong) => likedSong.id === song.id);
      }));
      this.booleanRequest = ref(this.musicDadesStore.usersMatching.map((user) => {
        return user.friendship_status === null || user.friendship_status === 'denied' || user.friendship_status === 'rejected';
      }));
      this.enterQuery = this.searchQuery;
      if (resetSearchQuery) this.searchQuery = '';
    },

    goBack() {
      this.searching = false;
    },

    navigateToSearchResults() {
      if (this.searchQuery) {
        this.onSearchEnter();
      }
    },
    setResults(genre){
        this.musicDadesStore.setCurrentGenre(genre);
        this.musicDadesStore.fetchPlaylistsByGenre(genre.id);
        this.musicDadesStore.fetchSongsByGenre(genre.id);
    },
    getPlaylistInfo(playlist){
        this.musicDadesStore.getCurrentPlaylist(playlist);
        this.musicDadesStore.getPlaylistById(playlist.id);
    },
  },
};
</script>


<style scoped>
.section-title {
  margin-bottom: 15px;
  font-weight: bold;
  color: white;
}

.search-view {
  height: 100vh;
  position: fixed;
  top: 0;
  left: 20vw;
  width: 60vw;
  overflow: auto;
  transition: left 0.5s, width 0.5s;
}

.resizeSearchView{
  width: 70vw;
  left: 25vw;
  transition: left 0.5s, width 0.5s;
}

.search-view::-webkit-scrollbar {
  width: 0;
}

.search-view::-webkit-scrollbar-thumb {
  background: transparent;
}

.swiper-container {
    margin-top: 0px;
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

.contingut{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-left: 8px; 
  width: 90%;
}

.song-item {
  position: relative;
  flex-basis: calc(33.33% - 20px);
  max-width: 100%;
  border-radius: 20px;
  background-image: linear-gradient(to left top, rgba(106, 229, 194, 0.8), rgba(0, 0, 255, 0.4));
  box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.7);
  height: 250px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis; /* Agrega puntos suspensivos si el texto no cabe en una sola línea */
  color: white;
}



.playlist-item {
  flex-basis: calc(33.33% - 20px);
  max-width: 100%;
  padding: 40px;
  border-radius: 20px;
  background-image: linear-gradient(to left top, rgba(255, 255, 255, 0.759), rgba(255, 255, 255, 0.925));
  height: 80px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis; 
  color: red;
  display: flex;
  align-items: center;
  justify-content: center;
}

.for-item{
  position: relative;
}


.author {
  font-size: 12px; 
  color: rgba(255, 251, 251, 0.918); 
}

.search-bar {
  position: -webkit-sticky;
  position: sticky;
  top: 50px;
  width: 500px;
  margin: 20px 0;
  z-index: 100;
}

.playlists-container {
  color: white;
  position: relative;
  width: 90%;
  margin-top: 70px;
}


.song-img {
  display: block;
  height: 75%;
  width: 100%;
  background: bisque;
  margin: auto;
  margin-bottom: 10px;
  box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.5);
  background-image: url('../assets/imatge.jpg');
  background-position: center;
  background-repeat: repeat;
  background-size: cover;
}

.friendshipButton{
  display: flex;
  flex-direction: row;
  column-gap: 4px;
  align-items: center;
  font-size: 20px;
  right: 10px;
  position: absolute;
}

.addedFriendButton{
  display: flex;
  flex-direction: row;
  column-gap: 4px;
  align-items: center;
  font-size: 20px;
  right: 10px;
  position: absolute;
  color: #06d47b;
}

.friendshipButton:hover{
  scale: 1.2;
  transition: 0.5s;
  color: #06d47b;
}

.dropdown {
  position: absolute;
  margin-top: -4%;
  right: 5%;
  width: 270px; /* Set the width as needed */
  max-height: 250px;
  overflow-y: auto;
  border: 0px solid #ccc;
  background-color: #fff;
  background: rgb(44, 42, 42);
  border-radius: 3px;
  z-index: 1000;
}

.dropdown-title {
  font-weight: bold;
  padding: 8px;
  border-bottom: 1px solid #ccc;
}

.playlist-options div {
  padding: 8px;
  cursor: pointer;
}

.playlist-options div:hover {
  background-color: black;
}

.suggested-container {
  margin: 10px 5px;
}
.recommended-section{
  margin-top: 10px;
}

.results-playlist-img {
  width: 90px;
  height: 90px; 
  background: bisque;
  margin-right: 10px; 
  box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.5);
  background-image: url('../assets/imatgePlaylist.jpg'); 
  background-position: center;
  background-size: cover; 
}

.text{
  position: relative;
  width: 40%;
}

.results-playlist-img {
  width: 90px;
  height: 90px; 
  background: bisque;
  margin-right: 10px; 
  box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.5);
  background-position: center;
  background-size: cover; 
}

.results-song-img {
  width: 90px; /* Ancho de la imagen */
  height: 90px; /* Altura del song-item */
  background: bisque;
  margin-right: 10px; /* Espacio entre la imagen y el texto */
  box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.5);
  background-image: url('../assets/imatge.jpg'); 
  background-position: center;
  background-size: cover; 
}


.buttons{
  display: flex;
  flex-direction: row;
  column-gap: 1rem;
  align-items: center;
}

.like{
  font-size: 22px;
}
.liked{
  font-size: 22px;
  color: red;
}
.add-playlist{
  font-size: 15px;
}

.results-container{
  margin-top: 10px;
}
  
.go-back-button {
    position: absolute;
    left: 2%;
    top: 5%; 
    font-size: 28px;
    cursor: pointer;
}

.icon-gray-arrow-white {
  font-size: 28px;
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

.results-song-img {
  width: 75px; /* Ancho de la imagen */
  /* height: 100%; Altura del song-item */
  background: bisque;
  margin-right: 10px; /* Espacio entre la imagen y el texto */
  box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.5);
  background-image: url('../assets/cover2.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.contingut2 {
  width: 100%; /* Usar todo el espacio disponible para el texto */
}
.contingut-user {
  width: 100%; 
  display: flex;
  align-items: center;
  column-gap: 21rem;
  position: relative;
}
.author {
  font-size: 12px;
  color: rgba(255, 251, 251, 0.918);
}
.overlay {
  position: relative;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  z-index: 999;
}

.success-message {
  position: absolute;
  opacity: 0;
  left: 30%;
  top: 10%;
  animation: drop 1s ease-in, smoke 1.5s ease-in 1s;
  z-index: 1000;
}
@keyframes drop {
  0% {
    opacity: 0;
    top: 0;
    color: white;
  }
  50%{
    top: 9%;
    opacity: 1;
    color: #06d47b;
  }
  100%{
    opacity: 1;
    top: 10%;
    color: #06d47b;
  }
}

@keyframes smoke {
  0%{
    opacity: 1;
    color: #06d47b;
    top: 10%;
    filter: blur(5px);
    transform: translateX(0) translateY(0) rotate(0deg) scale(1);

  }
  100% {
    opacity: 0;
    top: 3%;
    filter: blur(100px);
    transform: translateX(200px) translateY(-200px) rotate(60deg) scale(4);
  }
}

</style> 