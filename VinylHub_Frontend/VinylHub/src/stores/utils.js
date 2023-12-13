import { defineStore } from 'pinia'
import { useMusicDadesStore } from '@/stores/musicDades.js';
import { useFriendsDadesStore } from '@/stores/friendsDades.js';
export const useUtilsStore = defineStore('utils',{

    // State ==> equivalent a variables
    state: () => ({
        isCollapsed: false,
        songSelectedId: -1,
        profileEditMode: false,
        friendListOrder: 1,
    }),
    getters: {


    },
    // actions ==> equivalent a funcions
    actions: {
        toggleSidebar() {
            this.isCollapsed = !this.isCollapsed;
        },
        formatDuration(durationInSeconds) {
          if(isNaN(durationInSeconds)){
            return '0:00';
          }
          const hours = Math.floor(durationInSeconds / 3600);
          const minutes = Math.floor((durationInSeconds % 3600) / 60);
          const seconds = Math.round(durationInSeconds % 60);
      
          if (hours === 0) {
              if (minutes < 10) {
                  return `${minutes}:${String(seconds).padStart(2, '0')}`;
              } else {
                  return `${minutes}:${String(seconds).padStart(2, '0')}`;
              }
          } else {
              if (minutes < 10) {
                  return `${hours}:${minutes}:${String(seconds).padStart(2, '0')}`;
              } else {
                  return `${hours}:${minutes}:${String(seconds).padStart(2, '0')}`;
              }
          }
        },
        doubleClickSong(song,index) {
          const musicDadesStore = useMusicDadesStore();
          musicDadesStore.getCurrentSong(song);
          this.songSelectedId = song.id;
          musicDadesStore.currentSpecificPlayListSongIndex = index;
          if(musicDadesStore.currentPlayListIdForPlaysNumber !== musicDadesStore.currentPlayList.id){
            musicDadesStore.currentPlayListIdForPlaysNumber = musicDadesStore.currentPlayList.id;
            musicDadesStore.addPlayListPlaysNumber(musicDadesStore.currentPlayList);
          }
        },
        toggleEditMode() {
            this.profileEditMode = !this.profileEditMode;
        },
        toggleFriendListOrder(){
            this.friendListOrder === 1 ? this.friendListOrder = 0 : this.friendListOrder = 1;
            const friendsDadesStore = useFriendsDadesStore();
            friendsDadesStore.applyFriendListOrder();
        },
          
    }

  
  })