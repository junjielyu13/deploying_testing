<template>
  <div class="back-button" @click="$router.go(-1)">
    <font-awesome-icon :icon="['fas', 'fa-circle-chevron-left']" style="color: #d6d6d6;" />
  </div>
  <div id="song-playback" class="song-playback" :class="{ 'resizesong-playback': utilsStore.isCollapsed }">
    <div class="container">
      <div class="main" v-if="musicDadesStore.currentSong">
        <div class="header">
          <h2>{{ musicDadesStore.currentSong.title }}</h2>
        </div>
        <div class="song-img">
          <img v-if="musicDadesStore.currentSong.cover" :src="musicDadesStore.currentSong.cover"
            style="width: 100%; height: 100%;">
        </div>
        <div class="song-detail">
          <h2>{{ musicDadesStore.getArtistName(musicDadesStore.currentSong.artist_id) }}</h2>
        </div>
        <div class="progress-bar-section">
          <span>
            {{ utilsStore.formatDuration(musicControlsStore.audioElement.currentTime) }}
          </span>
          <input type="range" min="0" :max="musicControlsStore.audioElement.duration" step="1" id="progress"
            ref="progress" v-model="num" @input="musicControlsStore.changeProgressTime($event.target.value)">
          <span>
            {{ utilsStore.formatDuration(musicControlsStore.audioElement.duration) }}
          </span>
        </div>
        <div class="volume d-flex align-items-center mt-1">
          <input type="range" min="0" max="1" step="0.01" id="volProgress" ref="volProgress"
            @input="musicControlsStore.changeVolume($event.target.value)">
        </div>


        <div class="audio-container" v-if="userStatusStore.isLogged">
          <div v-if="!booleanLiked" class="like" name="likeButton">
            <font-awesome-icon :icon="['fas', 'heart']" @click="likeSong()" />
          </div>
          <div v-if="booleanLiked" class="liked" name="likedButton">
            <font-awesome-icon :icon="['fas', 'heart']" @click="disLikeSong()" />
          </div>
          <div class="liked" name="likedButton">

          </div>
          <div class="add-playlist">
            <font-awesome-icon :icon="['fas', 'plus']" style="color: #ffffff;   font-size: 17px;   cursor: pointer; "
              @click="addToPlaylist()" />
          </div>
        </div>

        <div class="next-up" v-if="musicDadesStore.currentPlayList && musicDadesStore.currentPlayList.length !== 0">
          <p>Next Up: <span>{{ musicDadesStore.getNextSongName() }}</span></p>
        </div>

      </div>
    </div>

  </div>
  <div @click="cerrarDropdown" v-if="showDropdown" class="overlay">
    <div class="dropdown" v-if="showDropdown" ref="dropdown" @click.stop="">
      <div class="dropdown-title">Add to Playlist...</div>
      <div class="playlist-options" v-show="showDropdown">
        <div v-for="(playlist, playlistIndex) in musicDadesStore.myPlaylists" :key="playlistIndex"
          @click="handlePlaylistClick(playlist)">
          {{ playlist.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import { useMusicControlsStore } from '@/stores/musicControls.js';
import { useMusicDadesStore } from '@/stores/musicDades.js';
import { useUtilsStore } from '@/stores/utils.js';
import { useUserStatusStore } from '@/stores/userStatus.js';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';


const musicControlsStore = useMusicControlsStore();
const musicDadesStore = useMusicDadesStore();
const utilsStore = useUtilsStore();
const userStatusStore = useUserStatusStore();


const progress = ref(null);
const volProgress = ref(null);
const num = ref(0);
const booleanLiked = ref(false);
const showDropdown = ref(false);

onBeforeMount(async () => {
  await waitValue();
  booleanLiked.value = musicDadesStore.myLikedSongsPlaylist.some(song => song.id === musicDadesStore.currentSong.id);
});

function addToPlaylist() {
  showDropdown.value = !showDropdown.value;
}

async function waitValue() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Done');
    }, 500);
  });
}

function cerrarDropdown() {
  showDropdown.value = !showDropdown.value;
}

async function handlePlaylistClick(playlist) {
  showDropdown.value = !showDropdown.value;
  try {
    await this.musicDadesStore.postSongMyPlaylist(musicDadesStore.currentSong.id, playlist.id);
  } catch (error) {
    console.error("Error:", error);
  }

}

async function likeSong() {
  booleanLiked.value = !booleanLiked.value;
  try {
    await musicDadesStore.addLikedSong(musicDadesStore.currentSong);
    await musicDadesStore.fetchMyLikedSongsPlaylist();
  } catch (error) {
    console.error("Error:", error);
  }

}
async function disLikeSong() {
  booleanLiked.value = !booleanLiked.value;
  try {

    await musicDadesStore.deleteLikedSong(musicDadesStore.currentSong);
    await musicDadesStore.fetchMyLikedSongsPlaylist();
  } catch (error) {
    console.error("Error:", error);
  }
}



musicControlsStore.audioElement.addEventListener("timeupdate", (event) => {
  num.value = event.srcElement.currentTime;
});

musicControlsStore.audioElement.addEventListener("ended", function () {
  musicControlsStore.play();
  musicControlsStore.audioElement.currentTime = 0;
  if (musicControlsStore.repeatMode) {
    musicControlsStore.next();
  }
  else if (musicControlsStore.repeatOneSongMode) {
    musicControlsStore.play();
  }
  else if (musicControlsStore.shuffleMode) {
    const num = Math.floor(Math.random() * musicDadesStore.currentSpecificPlayList.songs.length);
    const randomSong = musicDadesStore.currentSpecificPlayList.songs[num];
    musicDadesStore.getCurrentSong(randomSong);
    utilsStore.songSelectedId = randomSong.id;
  }
  else {
    if (musicDadesStore.currentSpecificPlayListSongIndex < musicDadesStore.currentSpecificPlayList.songs.length - 1) {
      musicControlsStore.next();
    }
  }
});




</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Meow+Script&display=swap');

.my-view * {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  font-family: sans-serif;
  background: rgba(133, 141, 143, 0.8);
}

.song-playback {
  left: 20vw;
  display: flex;
  flex-direction: column;
  height: 100vh;
  top: 0;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 20vw;
  width: 60vw;
  transition: left 0.5s, width 0.5s;
  flex-grow: 1;
}

.like {
  margin-top: 10px;
  font-size: 22px;
  cursor: pointer;
  z-index: 1000;
}

.liked {
  margin-top: 10px;
  font-size: 22px;
  color: red;
  cursor: pointer;
  z-index: 1000;

}

.resizesong-playback {
  width: 70vw;
  left: 25vw;
  transition: left 0.5s, width 0.5s;
}

.main {
  width: 500px;
  max-width: 100%;
  margin: 30px auto;
  padding: 30px;
  border-radius: 20px;
  background-image: linear-gradient(to left top, rgba(106, 229, 194, 0.8), rgba(0, 0, 255, 0.4));
  box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.7);
}

.header {
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  text-align: center;
  font-size: 2rem;
  margin-top: 5px;
  margin-bottom: 20px;

}

.song-img {
  display: block;
  width: 200px;
  height: 200px;
  max-width: 100%;
  background: bisque;
  position: relative;

  margin: auto;
  margin-bottom: 30px;
  border-radius: 50px;
  box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.5);

  background-image: url('../assets/imatge.jpg');
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

.dropdown {
  margin-left: 48%;
  margin-top: 43%;
  position: absolute;
  width: 270px;
  /* Set the width as needed */
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
  background-color: #f0f0f0;
}

.song-detail {
  text-align: center;
  margin: 30px;
}

.song-detail h2 {
  font-weight: 800;
  font-size: 20px;
}

.song-detail h3 {
  font-style: italic;
  font-weight: 300;
  font-size: 15px;
}

.audio-container {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 20px;
}

.next-up {
  text-align: center;
  margin-top: 20px;
}

.next-up p {
  color: white;
}

.next-up span {
  font-style: italic;
}

.icon {
  transform: scale(1.5);
}

#progress {
  -webkit-appearance: none;
  width: 25vw;
  height: 6px;
  background: gray;
  border-radius: 4px;
  cursor: pointer;
  margin: 0 10px;
  outline: none;
  overflow: hidden;
}


#progress::-webkit-slider-thumb {
  -webkit-appearance: none;
  background: white;
  border-radius: 0 20px 20px 0;
  width: 5px;
  height: 10px;
  box-shadow: calc(-35vw - 3px) 0 0 35vw white;
}

#progress:hover {
  height: 10px;
}

#progress::-webkit-slider-thumb:hover {
  background: rgba(147, 250, 165, 1);
  border-radius: 50%;

  box-shadow: calc(-35vw - 10px) 0 0 35vw rgba(147, 250, 165, 0.5),
    inset 0 0 5px rgba(147, 250, 165, 0.5);
  width: 10px;
  height: 10px;
}

.progress-bar-section {
  display: flex;
  justify-content: center;
  align-items: center;
}

#volProgress {
  width: 80px;
  height: 15px;
  background: transparent;
  appearance: none;
  border: 2px solid white;
  border-radius: 15px;
  outline: none;
  box-shadow: 0 0 5px #1e90ff, 0 0 10px #1e90ff, inset 0 0 5px #1e90ff,
    inset 0 0 10px #1e90ff;
  overflow: hidden;
}

#volProgress::-webkit-slider-thumb {
  appearance: none;
  width: 15px;
  height: 15px;
  background: white;
  border-radius: 15px;
  border: 3px solid rgb(76, 230, 176);
  box-shadow: calc(-35vw - 5px) 0 0 35vw rgba(76, 230, 176, 0.7);
}


.volumeIcon {
  padding-right: 10px;
}

.volumeIcon:hover+#volProgress {
  display: flex;
}

.volumeIcon:not(:hover)+#volProgress:not(:hover) {
  display: none;
  animation: disappear 0.5s forwards;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  z-index: 999;
}

.back-button {
  position: fixed;
  left: 23%;
  top: 6%;
  font-size: 35px;
  cursor: pointer;
  z-index: 998;
}


@keyframes disappear {
  from {
    opacity: 1;
    display: flex;
  }

  to {
    opacity: 0;
    display: none;
  }
}</style>