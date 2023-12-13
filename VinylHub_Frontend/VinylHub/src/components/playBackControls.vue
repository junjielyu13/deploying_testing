<template>
    <div class="container text-center bg-dark">
        <div style="padding-top: 10px; width: 100%;" v-if="!musicDadesStore.noCurrentSong()">
            <h4>{{ musicDadesStore.currentSong.title }}</h4>
            <p>{{ getArtistName(musicDadesStore.currentSong.artist_id) }}</p>
        </div>
        <div class="row" v-if="!musicControlsStore.isPlayingSong" @click="goToCurrentSongView()" :style="{'cursor' : musicDadesStore.currentSong ? 'pointer': 'default'}">
            <font-awesome-icon :icon="['fas', 'compact-disc']" class="disc-no-song"/>
        </div>
        <div class="row" v-else @click="goToCurrentSongView()" :style="{'cursor' : musicDadesStore.currentSong ? 'pointer': 'default'}">
            <font-awesome-icon :icon="['fas', 'compact-disc']" spin class="disc-no-song" style=" box-shadow: 0 0 10px rgb(255, 235, 167);"/>
        </div>

        <audio ref="audioElement">
            <source :src="musicDadesStore.currentSong.audio" type="audio/mpeg" v-if="musicDadesStore.currentSong">
            <source src="@/musics/song1.mp3" type="audio/mpeg" v-else>
            Tu navegador no soporta la reproducción de audio.
        </audio>
        <div class="row d-flex justify-content-around align-items-center controls">
            <button type="button" class="btn btn-dark play" :disabled="musicDadesStore.noCurrentSong()" @click="musicControlsStore.prev()">
                <font-awesome-icon :icon="['fas', 'backward-step']" class="backwardIcon"/>
            </button>
            <button type="button" class="btn btn-dark play" 
            v-if="!musicControlsStore.isPlayingSong && !musicDadesStore.noCurrentSong()" 
            @click="musicControlsStore.play()">
                <font-awesome-icon :icon="['fas', 'play']" beat class="playIcon"/>
            </button>
            <button type="button" class="btn btn-dark play" v-else-if="musicDadesStore.noCurrentSong()" disabled="true">
                <font-awesome-icon :icon="['fas', 'play']" class="playIcon"/>
            </button>
            <button type="button" class="btn btn-dark play" v-else @click="musicControlsStore.play()">
                <font-awesome-icon :icon="['fas', 'pause']" class="playIcon"/>
            </button>
            <button type="button" class="btn btn-dark play" :disabled="musicDadesStore.noCurrentSong()" @click="musicControlsStore.next()">
                <font-awesome-icon :icon="['fas', 'forward-step']" class="forwardIcon"/>
            </button>
        </div>
        <div class="row d-flex align-items-center" style="margin: 10px 0;" v-if="musicDadesStore.currentPlayList !== null">
            <div class="col-7 text-start playlist-title">
                <h4>
                    {{ musicDadesStore.currentPlayList.name }}
                </h4>
            </div>
            <div class="col-5 d-flex justify-content-around">

                <button class="btn btn-dark p-1" @click="musicControlsStore.changeRepeatMode" title="Repeat Mode">
                    <i  class="bi bi-repeat playModeIcons"  :style="{ color: musicControlsStore.repeatMode ? '#08ff00' : '' }"></i>
                </button>
                <button class="btn btn-dark p-1" @click="musicControlsStore.changeRepeatOneSongMode" title="Repeat same song Mode">
                    <i class="bi bi-repeat-1 playModeIcons" :style="{ color: musicControlsStore.repeatOneSongMode ? '#08ff00' : '' }"></i>
                </button>
                <button class="btn btn-dark p-1" @click="musicControlsStore.changeShuffleMode" title="Shuffle Mode">
                    <i class="bi bi-shuffle playModeIcons" :style="{ color: musicControlsStore.shuffleMode ? '#08ff00' : '' }" ></i>
                </button>
            </div>
        </div>
        <currentPlayList class="currentPlaylist"></currentPlayList>
    </div>
</template>

<script setup>
import currentPlayList from '@/components/currentPlayList.vue';
import { useMusicControlsStore } from '@/stores/musicControls.js';
import { useMusicDadesStore } from '@/stores/musicDades.js';
import { ref, onMounted } from 'vue';
import { useRouter } from "vue-router";
const router = useRouter();
const musicControlsStore = useMusicControlsStore();
const musicDadesStore = useMusicDadesStore();

//variables
const audioElement = ref(null);

onMounted(() => {
  musicControlsStore.audioElement = audioElement.value;
});

const getArtistName = (artistId) => {
  const artist = musicDadesStore.artists.find((a) => a.id === artistId);
  return artist ? artist.artist_name : 'Artista Desconocido';
};

function goToCurrentSongView(){
    if(musicDadesStore.currentSong){
        router.push("/songs/" + musicDadesStore.currentSong.id);
    }
}

</script>

<style scoped>

.container {
    flex-grow: 1;
    border-radius: 0 10px 10px 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    margin-bottom: 10px;
    padding: 0;
}

.disc-no-song {
    position: relative;
    width: auto;
    height: 120px;
    margin: 10px auto 0 auto;
    padding: 0;
    border-radius: 50%;
}

.play {
    border-radius: 50%;
    width: 60px; 
    height: 60px; 
    display: flex;
    justify-content: center;
    align-items: center;
}

.controls{
    padding: 20px 20px 0 20px;
}

.backwardIcon, .forwardIcon, .playIcon{
    font-size: 30px;
}

.playModeIcons{
    font-size: 20px;
}
.playlist-title{
    padding-left: 20px;
    border-radius: 20px;
}

.container::-webkit-scrollbar {
  width: 15px;
}
.container:hover::-webkit-scrollbar-thumb {
  background-color: #666;
}

.container:hover::-webkit-scrollbar-track {
  background-color: #333;
} 

</style>