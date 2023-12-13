<template>
  <div
    class="my-library"
    :class="{ resizeSearchView: utilsStore.isCollapsed }"
    @click="cerrarDropdowns()"
  >
    <div v-if="playlistCreated" class="success-message">
      <h4><strong> Successfully created! Add your songs. </strong></h4>
    </div>
    <div class="header">
      <div class="title">
        <font-awesome-icon :icon="['fas', 'music']" class="music-icon" />&nbsp;
        <h1 class="h1">My Library</h1>
      </div>
      <div
        class="create-playlist"
        name="createPlaylist"
        @click.stop="createPlaylist()"
      >
        <font-awesome-icon :icon="['fas', 'plus']" />
        <h1 class="h2" style="font-size: 20px">Playlist</h1>
      </div>
    </div>
    <div v-if="showAddPlaylist" class="dropdown-new-playlist" ref="dropdown">
      <div class="dropdown-title">CREATE A PLAYLIST...</div>
      <div class="form">
        <!-- Playlist Name -->
        <div class="playlist-title">
          <label for="playlistName" style="font-weight: bold"
            >Playlist Name:</label
          >
          &nbsp;
        </div>
        <div class="text-title">
          <input
            class="text"
            type="text"
            id="playlistName"
            v-model="newPlaylistName"
            @click.stop=""
            placeholder="Enter Playlist Name"
            style="border-radius: 6px"
          />
        </div>
        <!-- Description -->
        <div class="playlist-title">
          <label for="playlistDescription" style="font-weight: bold"
            >Description:</label
          >
        </div>
        <div class="text-title">
          <input
            class="text"
            type="text"
            id="playlistDescription"
            v-model="newPlaylistDescription"
            @click.stop=""
            placeholder="Enter Description"
            style="border-radius: 6px"
          />
        </div>
        <!-- Done button -->

        <div class="done-button">
          <button
            type="button"
            class="btn btn-light"
            @click.stop="
              doneNewPlaylist(newPlaylistName, newPlaylistDescription)
            "
          >
            Create & Add Songs
          </button>
        </div>
      </div>
    </div>
    <div class="results-container" style="max-width: 95%">
      <h1 style="font-size: 30px">My Liked Songs</h1>
      <div
        v-for="(song, index) in musicDadesStore.myLikedSongsPlaylist"
        :key="index"
      >
        <router-link
          :to="{ name: 'SongPlayBack', params: { songId: song.id } }"
          @click.stop="getSongInfo($event, song, 'toSong')"
          style="z-index: -1"
        >
          <div class="item" style="height: 100%; position: relative">
            <div class="song-img">
              <img
                v-if="song.cover"
                :src="song.cover"
                style="height: 100%; width: 100%"
              />
            </div>
            <div class="contingut2" style="width: 100%; position: relative">
              <font-awesome-icon
                :icon="['fas', 'music']"
                style="color: white; font-weight: bold"
              />&nbsp;
              <span style="color: white; font-weight: bold">{{
                song.title
              }}</span>
              <br />
              <div class="author">
                {{ musicDadesStore.getArtistName(song.artist_id) }}
              </div>
            </div>
            <div class="buttons">
              <div
                class="liked"
                name="likedButton"
                @click.stop="getSongInfo($event, song, 'likedButton', index)"
              >
                <font-awesome-icon :icon="['fas', 'heart']" />
              </div>
              <div
                class="add-playlist"
                name="addButton"
                @click.stop="getSongInfo($event, song, 'addButton', index)"
              >
                <font-awesome-icon
                  :icon="['fas', 'plus']"
                  style="color: #ffffff; font-size: 17px"
                />
              </div>
            </div>
          </div>
        </router-link>
        <div v-if="showDropdown[index]" class="dropdown" ref="dropdown">
          <div class="dropdown-title">Add to Playlist...</div>
          <div class="playlist-options" v-show="showDropdown[index]">
            <div
              v-for="(playlist, playlistIndex) in musicDadesStore.myPlaylists"
              :key="playlistIndex"
              @click.stop="handlePlaylistClick(playlist, song, index)"
            >
              {{ playlist.name }}
            </div>
          </div>
        </div>
      </div>
      <br />
      <h1 style="font-size: 30px">My Playlists</h1>
      <div
        v-for="(playlist, index) in musicDadesStore.myPlaylists"
        :key="index"
      >
        <router-link
          v-if="playlist.id"
          :to="{ name: 'Playlist', params: { playlistId: playlist.id } }"
          @click.stop="getPlaylistInfo(playlist)"
        >
          <div class="item" style="height: 100%">
            <div class="playlist-img"></div>
            <div class="contingut2" style="width: 100%">
              <font-awesome-icon
                :icon="['fas', 'fa-list']"
                style="color: white; font-weight: bold"
              />&nbsp;
              <span style="color: white; font-weight: bold">{{
                playlist.name
              }}</span>
              <br />
              <span
                style="
                  color: white;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  max-width: 100px;
                "
              >
                {{ playlist.description }}
              </span>
            </div>
            <font-awesome-icon
              :icon="icons[playlist.visibility].icon"
              style="color: #ffffff; margin-right: 7px; font-size: 15px"
              @click.prevent="toggleIcon(playlist.visibility, playlist, $event)"
            />
            <font-awesome-icon
              :icon="['fas', 'xmark']"
              style="color: #ffffff; margin-right: 7px; font-size: 15px"
              @click.stop="deletePlaylist(playlist, $event)"
            />
          </div>
        </router-link>
      </div>
      <br />
      <h1 style="font-size: 30px">Followed Playlists</h1>
      <div
        v-for="(playlist, index) in musicDadesStore.followedPlaylists"
        :key="index"
      >
        <router-link
          v-if="playlist.id"
          :to="{ name: 'Playlist', params: { playlistId: playlist.id } }"
          @click.stop="getPlaylistInfo(playlist)"
        >
          <div class="item" style="height: 100%">
            <div class="playlist-img">
              <img
                v-if="playlist.cover"
                :src="playlist.cover"
                style="height: 100%; width: 100%"
              />
            </div>
            <div class="contingut2" style="width: 100%">
              <font-awesome-icon
                :icon="['fas', 'fa-list']"
                style="color: white; font-weight: bold"
              />&nbsp;
              <span style="color: white; font-weight: bold">{{
                playlist.name
              }}</span>
              <br />
              <span
                style="
                  color: white;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  max-width: 100px;
                "
              >
                {{ playlist.description }}
              </span>
            </div>
            <font-awesome-icon
              :icon="['fas', 'xmark']"
              style="color: #ffffff; margin-right: 7px; font-size: 15px"
              @click.stop="unfollowPlaylist(playlist, $event)"
            />
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
/*Importem per a tenir icones*/
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMusic, faList } from "@fortawesome/free-solid-svg-icons";

import router from "../router";
import { useMusicDadesStore } from "@/stores/musicDades.js";
import { useUtilsStore } from "../stores/utils.js";
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
      showDropdown: new Array(
        useMusicDadesStore().myLikedSongsPlaylist.length
      ).fill(false),
      showAddPlaylist: false,
      newPlaylistName: "",
      newPlaylistDescription: "",
      playlistCreated: false,
      icons: {
        shared: {
          icon: ["fas", "eye"],
          action: (nextState, playlist, event) =>
            this.handlePublicIconClick(nextState, playlist, event),
        },
        personal: {
          icon: ["fas", "lock"],
          action: (nextState, playlist, event) =>
            this.handlePrivateIconClick(nextState, playlist, event),
        },
        "only friends": {
          icon: ["fas", "user-group"],
          action: (nextState, playlist, event) =>
            this.handleFriendsIconClick(nextState, playlist, event),
        },
      },
    };
  },

  methods: {
    getArtistName(artistId) {
      const artist = this.musicDadesStore.artists.find(
        (a) => a.id === artistId
      );
      return artist ? artist.artist_name : "Artista Desconocido"; // Si no se encuentra el artista, muestra un mensaje por defecto
    },
    getSongInfo(e, song, source, index) {
      if (source === "addButton") {
        e.preventDefault();
        e.stopPropagation();
        this.addToPlaylist(index);
      } else if (source == "likedButton") {
        e.preventDefault();
        e.stopPropagation();
        this.deleteLikedList(song);
      } else {
        this.musicDadesStore.getCurrentSong(song);
      }
    },

    async getPlaylistInfo(playlist) {
      await this.musicDadesStore.getCurrentPlaylist(playlist);
      await this.musicDadesStore.getPlaylistById(playlist.id);
    },

    cerrarDropdowns() {
      for (let index = 0; index < this.showDropdown.length; index++) {
        if (this.showDropdown[index]) {
          this.showDropdown[index] = false;
        }
      }
      this.showAddPlaylist = false;
    },

    async deleteLikedList(song) {
      try {
        await this.musicDadesStore.deleteLikedSong(song);
        await this.musicDadesStore.fetchMyLikedSongsPlaylist();
      } catch (error) {
        console.error("Error:", error);
      }
    },

    addToPlaylist(index) {
      this.showDropdown[index] = !this.showDropdown[index];
    },

    goBack() {
      this.$router.go(-1);
    },

    async handlePlaylistClick(playlist, song, index) {
      this.showDropdown[index] = !this.showDropdown[index];
      try {
        await this.musicDadesStore.postSongMyPlaylist(song.id, playlist.id);
      } catch (error) {
        console.error("Error:", error);
      }
    },

    createPlaylist() {
      this.showAddPlaylist = !this.showAddPlaylist;
    },

    toggleIcon(actual, playlist, event) {
      let nextState = "personal";
      if (actual == "shared") {
        nextState = "personal";
      } else if (actual == "personal") {
        nextState = "only friends";
      } else if (actual == "only friends") {
        nextState = "shared";
      }
      this.icons[playlist.visibility].action(nextState, playlist, event);
    },

    async handlePublicIconClick(nextState, playlist, e) {
      e.preventDefault();
      e.stopPropagation();
      try {
        await this.musicDadesStore.changeSongVisibilityMyPlaylist(
          playlist,
          nextState
        );
        await this.musicDadesStore.fetchMyPlaylists();
      } catch (error) {
        console.error("Error:", error);
      }
    },

    async handlePrivateIconClick(nextState, playlist, e) {
      e.preventDefault();
      e.stopPropagation();
      try {
        await this.musicDadesStore.changeSongVisibilityMyPlaylist(
          playlist,
          nextState
        );
        await this.musicDadesStore.fetchMyPlaylists();
      } catch (error) {
        console.error("Error:", error);
      }
    },

    async handleFriendsIconClick(nextState, playlist, e) {
      e.preventDefault();
      e.stopPropagation();
      try {
        await this.musicDadesStore.changeSongVisibilityMyPlaylist(
          playlist,
          nextState
        );
        await this.musicDadesStore.fetchMyPlaylists();
      } catch (error) {
        console.error("Error:", error);
      }
    },

    async deletePlaylist(playlist, e) {
      e.preventDefault();
      e.stopPropagation();
      try {
        await this.musicDadesStore.deleteMyPlaylist(playlist);
        await this.musicDadesStore.fetchMyPlaylists();
      } catch (error) {
        console.error("Error:", error);
      }
    },

    async unfollowPlaylist(playlist, e) {
      e.preventDefault();
      e.stopPropagation();
      try {
        await this.musicDadesStore.deleteFollowedPlaylist(playlist.id);
        await this.musicDadesStore.fetchFollowedPlaylists();
      } catch (error) {
        console.error("Error:", error);
      }
    },

    async doneNewPlaylist(pl_name, pl_description) {
      this.playlistCreated = true;
      try {
        await this.musicDadesStore.postMyPlaylist(pl_name, pl_description);
        await this.musicDadesStore.fetchMyPlaylists();
      } catch (error) {
        console.error("Error:", error);
      }
      setTimeout(() => {
        router.push("/search");
      }, 2000);
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: black;
  padding: 5px;
  margin-top: 20px;
  border-radius: 10px;
}

.title {
  margin-left: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.create-playlist {
  margin-right: 8%;
  font-size: 27px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 5px;
  border-radius: 5px;
  background: rgb(44, 42, 42);
  cursor: pointer;
}

.playlist-title {
  padding: 6px;
}

.text {
  background-color: black;
  width: 100%;
  border: 0px solid #ccc; /* Optional border */
  padding: 10px; /* Optional padding */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Add a box shadow */
  color: white;
}

.text:focus {
  outline: none; /* Remove the default focus outline */
  border-color: #ffffff; /* Change border color on focus */
  box-shadow: 0 0 4px rgba(255, 255, 255, 0.4); /* Change box shadow on focus */
}

.done-button {
  margin-top: 5px;
  margin-left: 6.5rem;
  margin-bottom: 5px;
}
.btn-light {
  right: 5px;
  background: rgb(44, 42, 42);
  color: white;
  font-weight: bold;
}

.music-icon {
  color: white;
  font-weight: bold;
  margin-right: 10px;
  font-size: 30px;
}

h1 {
  font-weight: bold;
  margin: 0; /* Remove default margin for h1 */
}

.buttons {
  display: flex;
  flex-direction: row;
  column-gap: 1rem;
  align-items: center;
}

.like {
  font-size: 22px;
}
.liked {
  font-size: 22px;
  color: red;
}
.add-playlist {
  font-size: 15px;
}

.my-library {
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

.resizeSearchView {
  width: 70vw;
  left: 25vw;
  transition: left 0.5s, width 0.5s;
}

.suggested-container {
  margin: 10px 5px;
}
.recommended-section {
  margin-top: 10px;
}

.playlist-img {
  width: 90px;
  height: 90px;
  background: bisque;
  margin-right: 10px;
  box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.5);
  background-image: url("../assets/vinil.jpg");
  background-position: center;
  background-size: cover;
}
.song-img {
  width: 90px;
  height: 90px;
  background: bisque;
  margin-right: 10px;
  box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.5);
  background-image: url("../assets/imatge.jpg");
  background-position: center;
  background-size: cover;
}

.results-container {
  margin-top: 15px;
  margin-left: 5%;
  margin-right: 5%;
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

.dropdown-new-playlist {
  position: absolute;
  margin-top: 5rem;
  right: 3rem;
  width: 400px;
  max-height: 250px;
  overflow-y: auto;
  border: 0px solid #ccc;
  background-color: #fff;
  background: rgb(44, 42, 42);
  border-radius: 2px;
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

.success-message {
  position: absolute;
  opacity: 0;
  left: 30%;
  top: 2px;
  animation: drop 1s ease-in, smoke 1.5s ease-in 1s;
  z-index: 1000;
}
@keyframes drop {
  0% {
    opacity: 0;
    top: 0;
    color: white;
  }
  50% {
    top: 9%;
    opacity: 1;
    color: #06d47b;
  }
  100% {
    opacity: 1;
    top: 10%;
    color: #06d47b;
  }
}

@keyframes smoke {
  0% {
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
