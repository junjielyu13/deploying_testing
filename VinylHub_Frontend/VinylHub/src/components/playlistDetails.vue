<template>
    <div class="playlist">
        <table class="table table-hover table-dark table-borderless">
            <thead>
                <tr>
                    <th scope="col" class="col-1">#</th>
                    <th scope="col" class="col-4">Title</th>
                    <th scope="col" class="col-3">Artist</th>
                    <th scope="col" class="col-2">Duration</th>
                    <th scope="col" class="col-1">Plays</th>
                    <th scope="col" class="col-1" v-if="userStatusStore.isLogged"></th>
                </tr>
            </thead>
            <tbody v-if="musicDadesStore.currentSpecificPlayList!==null">
                <tr v-for="(song, index) in musicDadesStore.currentSpecificPlayList.songs" :key="song.id"
                @dblclick="utilsStore.doubleClickSong(song,index)" :class="{ 'selectedSong' : utilsStore.songSelectedId === song.id}">
                    <th scope="row">{{index + 1}}</th>
                    <td>{{song.title}}</td>
                    <td>{{musicDadesStore.getArtistName(song.artist_id)}}</td>
                    <td>{{ utilsStore.formatDuration(Number(song.duration)) }}</td>
                    <td>{{ song.plays }}</td>
                    <td v-if="userStatusStore.isLogged">
                        <div class="buttons d-flex justify-content-center align-items-center" style="height: 20px;">
                            <div v-if="!booleanLiked[index]" class="like" name="likeButton" @click="likeSong(song, index, $event)">
                                <font-awesome-icon :icon="['fas', 'heart']" style="color: white;"/>
                            </div>
                            <div v-if="booleanLiked[index]" class="liked" name="likedButton" @click="disLikeSong(song, index, $event)">
                                <font-awesome-icon :icon="['fas', 'heart']"/>
                            </div>
                            <div>
                                <font-awesome-icon :icon="['fas', 'xmark']" v-if="personalPlaylist" style="color: #ffffff; margin-right: 7px; font-size: 15px; margin-top: 10px; cursor: pointer;" 
                                @click="deleteSongPlaylist(song, $event)"/>
                            </div>
                        </div>
                    </td>

                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { useMusicDadesStore } from '@/stores/musicDades.js';
import { useUtilsStore} from '@/stores/utils.js';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useUserStatusStore } from '@/stores/userStatus.js';



export default {
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      musicDadesStore: useMusicDadesStore(),
      utilsStore: useUtilsStore(),
      booleanLiked: [],
      userStatusStore: useUserStatusStore(),
      personalPlaylist: false,
    };
  },
  async beforeMount() {
    this.$watch(
      () => this.musicDadesStore.currentSpecificPlayList,
      async (newVal, oldVal) => {
        // Check if the value has changed
        if (newVal !== oldVal) {
          try {
            await this.updateBooleanLiked();
            await this.updatePersonalPlaylist();
          } catch (error) {
            console.error("Error:", error);
          }
        }
      }
    );
  },
  methods: {
    async waitForOtherValue() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 200); 
      });
    },
    async updateBooleanLiked() {
      this.booleanLiked = this.musicDadesStore.currentSpecificPlayList.songs.map((song) => {
        return this.musicDadesStore.myLikedSongsPlaylist.some((likedSong) => likedSong.id === song.id);
      });
    },
    async updatePersonalPlaylist() {
      this.personalPlaylist = this.musicDadesStore.myPlaylists.some(
        (playlist) => playlist.id === this.musicDadesStore.currentSpecificPlayList.id
      );
    },
    async deleteSongPlaylist(song, e) {
      e.preventDefault();
      e.stopPropagation();
      try {
        await this.musicDadesStore.deleteSongMyPlaylist(song.id, this.musicDadesStore.currentSpecificPlayList.id);
        await this.updateBooleanLiked();
        await this.updatePersonalPlaylist();
        await this.musicDadesStore.getPlaylistById(this.musicDadesStore.currentSpecificPlayList.id);
      } catch (error) {
        console.error("Error:", error);
      }
    },
    async likeSong(song, index, e) {
      e.preventDefault();
      e.stopPropagation();
      this.booleanLiked[index] = !this.booleanLiked[index];
      try {
        await this.musicDadesStore.addLikedSong(song);
        await this.musicDadesStore.fetchMyLikedSongsPlaylist();
        await this.updateBooleanLiked();
        await this.updatePersonalPlaylist();
      } catch (error) {
        console.error("Error:", error);
      }
    },
    async disLikeSong(song, index, e) {
      e.preventDefault();
      e.stopPropagation();
      this.booleanLiked[index] = !this.booleanLiked[index];
      try {
        await this.musicDadesStore.deleteLikedSong(song);
        await this.musicDadesStore.fetchMyLikedSongsPlaylist();
        await this.updateBooleanLiked();
        await this.updatePersonalPlaylist();
      } catch (error) {
        console.error("Error:", error);
      }
    },
  },
};


</script>



<style scoped>
.playlist {
    width: 95%;
    margin-left: auto;
    margin-right: auto;
    padding: 20px 10px 10px 10px;
}

.buttons{
    display: flex;
    flex-direction: row;
    column-gap: 1rem;
    align-items: center;
    
}

.like{
  margin-top:10px;
  font-size: 22px;
  cursor: pointer;
}
.liked{
    margin-top:10px;
    font-size: 22px;
    color: red;
    cursor: pointer;
}

.playlist table thead th {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1); 
}

.playlist table tbody th, td {
    padding-top: 20px;
    padding-bottom: 20px;
    height: 50px;
}
.playlist table tbody tr{
    opacity: 0.5;
}
.playlist table tbody tr:hover {
  transform: scale(1.05);
  transition: 1.5s;
  opacity: 1;
}

.selectedSong th,
.selectedSong td {
    color: green;
}
.selectedSong{
    opacity: 1 !important;
}
</style>