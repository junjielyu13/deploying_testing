<template>
    <div class="playlistContainer"
    :class="{ 'resizeContainer': utilsStore.isCollapsed }" v-if="musicDadesStore.currentSpecificPlayList!==null">
        <div class="header bg-dark">
            <div class="row" style="width: 95%;">
                <div class="back-button" >
                    <font-awesome-icon :icon="['fas', 'fa-circle-chevron-left']" style="color: #d6d6d6; cursor: pointer;" 
                    @click="$router.go(-1)"/>
                </div>
                <div class="col-3 d-flex justify-content-center align-items-center" style="margin-top: 3%; " >
                    <div class="cover">
						<img v-if="musicDadesStore.currentSpecificPlayList.cover" :src="musicDadesStore.currentSpecificPlayList.cover" alt="">
                        <img v-else src="@/assets/vinil.jpg" alt="">
                    </div>
                </div>
                <div class="col-9" style="margin-top: 3%;">
                    <div class="playlist-title">
                        {{ musicDadesStore.currentSpecificPlayList.name }}
                    </div>
                    <div class="playlist-description">
                        {{ musicDadesStore.currentSpecificPlayList.description }}
                    </div>
                    <div class="bottons" v-if="userStatusStore.isLogged && !booleanFollowed" @click="followPlaylist">
                        <div class="addPlaylist">
                            <font-awesome-icon :icon="['fas', 'plus']" />
                        </div>
                        Follow Playlist
                    </div>
                    <div class="bottons" v-if="userStatusStore.isLogged && booleanFollowed" @click="unfollowPlaylist">
                        <div class="deletePlaylist">
                            <font-awesome-icon :icon="['fas', 'minus']" />
                        </div>
                        Unfollow Playlist
                    </div>
                </div>

            </div>

        </div>
        <div class="content bg-dark">
            <playlistDetails></playlistDetails>
        </div>
    </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import { useUtilsStore } from '@/stores/utils.js';
import { useMusicDadesStore } from '@/stores/musicDades.js';
import { useRoute } from 'vue-router';
import { useUserStatusStore } from '@/stores/userStatus.js';
import playlistDetails from '@/components/playlistDetails.vue';
const utilsStore =  useUtilsStore();
const musicDadesStore = useMusicDadesStore();
const route = useRoute();
const userStatusStore =  useUserStatusStore();
const booleanFollowed = ref(false);



onBeforeMount(async () => {
    if (musicDadesStore.currentSpecificPlayList === null){
        musicDadesStore.getPlaylistById(route.params.playlistId);
    }
    booleanFollowed.value = musicDadesStore.followedPlaylists.some(playlist => {
        const playlistIdFloat = parseFloat(playlist.id);
        const routePlaylistIdFloat = parseFloat(route.params.playlistId);

        return playlistIdFloat === routePlaylistIdFloat;
        });
  });

async function followPlaylist(){
    await musicDadesStore.postFollowedPlaylist(route.params.playlistId);
    booleanFollowed.value = true;
    await musicDadesStore.fetchFollowedPlaylists();
    
}

async function unfollowPlaylist(){
    await musicDadesStore.deleteFollowedPlaylist(route.params.playlistId);
    booleanFollowed.value = false;
    await musicDadesStore.fetchFollowedPlaylists();

}
</script>

<style scoped>
.playlistContainer {
    display: flex;
    flex-direction: column;
    height: 100vh;
    top: 0;
    position: fixed;
    left: 20vw;
    width: 60vw;
    transition: left 0.5s, width 0.5s;
    flex-grow: 1;
}

.resizeContainer{
  width: 70vw;
  left: 25vw;
  transition: left 0.5s, width 0.5s;
}

.header{
    height: 32vh;
    margin: 10px 10px 0px 10px;
    border-radius: 10px 10px 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.content{
    display: flex;
    border-radius: 0 0 10px 10px;
    margin: 0 10px 10px 10px;
    overflow-x: hidden;
    overflow-y: auto;
    flex-grow: 1;
}


.cover img{
	width: 100%;
	max-height: 200px;
	box-shadow: 1px 1px 10px 2px goldenrod, 1px -1px 6px 1px rgba(110, 161, 39, 0.3);
    border-radius: 5px;
}

.playlist-title{
    color: white;
    font-size: 6vh;
    font-weight: bold;
}

.playlist-description{
    padding-right: 100px;
    text-align: justify;
}

.bottons{
    display: flex;
    justify-content: start;
    align-items: center;
    bottom: 0;
    cursor: pointer;
}

.like, .addPlaylist{
    font-size: 30px;
    margin-right: 1vw;
}

.deletePlaylist{
    font-size: 30px;
    margin-right: 1vw;
}

.content::-webkit-scrollbar {
  width: 15px;
}
.content:hover::-webkit-scrollbar-thumb {
  background-color: #666;
}

.content:hover::-webkit-scrollbar-track {
  background-color: #333;
} 

.back-button {
  position: fixed;
  left: 22%;
  top: 2.5%; 
  font-size: 32px;
  z-index: 1000;
}

</style>