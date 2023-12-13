import { defineStore } from 'pinia'
import { useMusicDadesStore } from '@/stores/musicDades.js';
import { useUtilsStore } from '@/stores/utils.js';

export const useMusicControlsStore = defineStore('musicControls', {

    // State ==> equivalent a variables
    state: () => ({
        audioElement: null,
        isPlayingSong : false,
        repeatMode: false,
        repeatOneSongMode: false,
        shuffleMode: false,
        progress: null,
    }),
    getters: {

    },
    actions: {
        // actions ==> equivalent a funcions
        changeRepeatMode(){
            this.repeatMode = !this.repeatMode;
            this.shuffleMode = false;
            this.repeatOneSongMode = false;
        },

        changeRepeatOneSongMode(){
            this.repeatOneSongMode = !this.repeatOneSongMode;
            this.shuffleMode = false;
            this.repeatMode = false;
        },
        
        changeShuffleMode(){
            this.shuffleMode = !this.shuffleMode;
            this.repeatOneSongMode = false;
            this.repeatMode = false;
        },
        play(){
            if (this.audioElement) {
                this.isPlayingSong = !this.isPlayingSong;
                if (this.isPlayingSong) {
                  this.audioElement.play();
                } else {
                  this.audioElement.pause();
                }
            }
        },
        next(){
            const musicDadesStore = useMusicDadesStore();
            const utilsStore = useUtilsStore();
            if(musicDadesStore.currentSpecificPlayList !== null && this.audioElement !== null && this.shuffleMode === false){
                if(musicDadesStore.currentSpecificPlayListSongIndex < musicDadesStore.currentSpecificPlayList.songs.length - 1){
                    musicDadesStore.currentSpecificPlayListSongIndex++;
                }else{
                    musicDadesStore.currentSpecificPlayListSongIndex = 0;
                }
                if(!this.isPlayingSong){
                    this.isPlayingSong = true;
                }
                utilsStore.songSelectedId = musicDadesStore.currentSpecificPlayList.songs[musicDadesStore.currentSpecificPlayListSongIndex].id;
                musicDadesStore.getCurrentSong(musicDadesStore.currentSpecificPlayList.songs[musicDadesStore.currentSpecificPlayListSongIndex]);
            }else if (musicDadesStore.currentSpecificPlayList === null){
                let num = Math.floor(Math.random() * musicDadesStore.recommendedSongs.length);
                let randomSong = musicDadesStore.recommendedSongs[num];
                while(musicDadesStore.currentSpecificPlayListSongIndex === num){
                    num = Math.floor(Math.random() * musicDadesStore.recommendedSongs.length);
                    randomSong = musicDadesStore.recommendedSongs[num];
                }
                musicDadesStore.getCurrentSong(randomSong,true);
            }else if (musicDadesStore.currentSpecificPlayList !== null && this.audioElement !== null && this.shuffleMode === true){
                let num = Math.floor(Math.random() * musicDadesStore.currentSpecificPlayList.songs.length);
                let randomSong = musicDadesStore.currentSpecificPlayList.songs[num];
                while(musicDadesStore.currentSpecificPlayListSongIndex === num){
                    num = Math.floor(Math.random() * musicDadesStore.currentSpecificPlayList.songs.length);
                    randomSong = musicDadesStore.currentSpecificPlayList.songs[num];
                }
                utilsStore.doubleClickSong(randomSong,num);
            }
        },
        prev(){
            const musicDadesStore = useMusicDadesStore();
            const utilsStore = useUtilsStore();
            if(musicDadesStore.currentSpecificPlayList !== null && this.audioElement !== null){
                if(musicDadesStore.currentSpecificPlayListSongIndex > 0){
                    musicDadesStore.currentSpecificPlayListSongIndex--;
                }else{
                    musicDadesStore.currentSpecificPlayListSongIndex = musicDadesStore.currentSpecificPlayList.songs.length - 1;
                }
                if(!this.isPlayingSong){
                    this.isPlayingSong = true;
                }
                utilsStore.songSelectedId = musicDadesStore.currentSpecificPlayList.songs[musicDadesStore.currentSpecificPlayListSongIndex].id;
                musicDadesStore.getCurrentSong(musicDadesStore.currentSpecificPlayList.songs[musicDadesStore.currentSpecificPlayListSongIndex]);
            }else if (musicDadesStore.currentSpecificPlayList === null){
                const num = Math.floor(Math.random() * musicDadesStore.recommendedSongs.length);
                const randomSong = musicDadesStore.recommendedSongs[num];
                musicDadesStore.getCurrentSong(randomSong,true);
            }
        },
        changeProgressTime(value){
                this.audioElement.currentTime = value;
        },
        changeVolume(value){
            this.audioElement.volume = value;
        },
        resetAllControlVariables(){
            if (this.audioElement) {
                this.audioElement.pause();
                
            }
            this.isPlayingSong = false;
            this.repeatMode = false;
            this.repeatOneSongMode = false;
            this.shuffleMode = false;
        }
    }
  })