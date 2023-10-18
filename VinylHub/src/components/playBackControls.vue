<template>
    <div class="container text-center bg-dark">
        <div style="padding-top: 10px; width: 100%;" v-if="!noSong">
            <h4>Song Title</h4>
            <p>Artist</p>
        </div>
        <div class="row" v-if="!isPlayingSong">
            <font-awesome-icon :icon="['fas', 'compact-disc']" class="disc-no-song"/>
        </div>
        <div class="row" v-else>
            <font-awesome-icon :icon="['fas', 'compact-disc']" spin class="disc-no-song"/>
        </div>

        <div class="row d-flex justify-content-around align-items-center controls">

                <button type="button" class="btn btn-dark play" :disabled="noSong">
                    <font-awesome-icon :icon="['fas', 'backward']" class="backwardIcon"/>
                </button>
                <button type="button" class="btn btn-dark play" v-if="!isPlayingSong && !noSong" @click="changeStateSong">
                    <font-awesome-icon :icon="['fas', 'play']" beat class="playIcon"/>
                </button>
                <button type="button" class="btn btn-dark play" v-else-if="noSong" disabled="true">
                    <font-awesome-icon :icon="['fas', 'play']" class="playIcon"/>
                </button>
                <button type="button" class="btn btn-dark play" v-else @click="changeStateSong">
                    <font-awesome-icon :icon="['fas', 'pause']" class="playIcon" />
                </button>
                <button type="button" class="btn btn-dark play" :disabled="noSong">
                    <font-awesome-icon :icon="['fas', 'forward']" class="forwardIcon" />
                </button>
        </div>
        <div class="row d-flex align-items-center" style="margin: 10px 0;" v-if="!noSong && songNumber !== 0">
            <div class="col-9 text-start playlist-title">
                <h4>
                    Playlist name
                </h4>
            </div>
            <div class="col-3">
                <button class="btn btn-dark p-1" v-if="props.repeatMode === 1 || props.repeatMode === 2" @click="changeRepeatMode">
                    <i  class="bi bi-repeat playModeIcons" :style="{ color: props.repeatMode === 2 ? '#08ff00' : '' }"></i>
                </button>
                <button class="btn btn-dark p-1" v-else-if="props.repeatMode === 3" @click="changeRepeatMode">
                    <i class="bi bi-repeat-1 playModeIcons" style="color:#08ff00"></i>
                </button>
                <button class="btn btn-dark p-1" v-else>
                    <i class="bi bi-shuffle playModeIcons" style="color: #08ff00;" @click="changeRepeatMode"></i>
                </button>
            </div>
        </div>
        <currentPlayList :no-song="noSong" :songNumber="songNumber" class="currentPlaylist"></currentPlayList>
    </div>
</template>

<script setup>
import currentPlayList from './currentPlayList.vue';
const props = defineProps({
    isPlayingSong: Boolean,
    noSong: Boolean,
    repeatMode: Number,
    songNumber: Number,
})

//functions

const emits = defineEmits(['changeState','changeRepeatState']);

const changeStateSong = () => {
  emits('changeState', !props.isPlayingSong); // Emit the boolean value 'true' to the parent
};

const changeRepeatMode = () => {
    if(props.repeatMode == 4){
        emits('changeRepeatState', 1);
    }
    else{
        emits('changeRepeatState', props.repeatMode + 1);
    }

};

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
}

.controls{
    padding: 20px 20px 0 20px;
}

.backwardIcon, .forwardIcon, .playIcon{
    width: 20px;
    height: 20px;
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