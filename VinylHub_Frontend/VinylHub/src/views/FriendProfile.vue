<template>
  <div class="friendRequestSendedSuccess" v-if="friendRequestSendedSuccess">
    <h4><strong> Friend request sended! </strong></h4>
  </div>
  <div
    class="profileContainer"
    :class="{ resizeContainer: utilsStore.isCollapsed }"
  >
    <div class="information bg-dark">
      <div
        class="imgBox"
        :style="{
          'background-image': userDadesStore.friendUserImage
            ? 'url(' + userDadesStore.friendUserImage + ')'
            : '',
        }"
      ></div>
      <div class="userName" v-if="userDadesStore.friendUsername">
        {{ userDadesStore.friendUsername }}
      </div>
      <div class="userName" v-else>Friend No Name</div>
      <div
        class="addFriend"
        @click="addFriendAction(route.params.friendId)"
        v-if="
          !friendsDadesStore.checkFriendExists(route.params.friendId) &&
          !friendsDadesStore.checkIfIsVinylHubAccount(route.params.friendId)
        "
      >
        <font-awesome-icon :icon="['fas', 'user-plus']" class="addFriendIcon" />
      </div>
      <div class="close-profile" @click="goToHomePage()">
        <font-awesome-icon :icon="['fas', 'xmark']" class="closeProfileIcon" />
      </div>
    </div>
    <div class="content bg-dark flex-column">
      <div class="userInformation">
        <div class="informationContent">
          <strong>Email: </strong>{{ userDadesStore.friendEmail }}
        </div>
        <br />
        <div class="informationContent" v-if="userDadesStore.friendGender">
          Gender: {{ userDadesStore.friendGender }}
        </div>
        <div class="informationContent" v-else>
          <strong>Gender: </strong>Unknown
        </div>
      </div>
      <div class="sharePlayListSection">
        <h2 style="margin: 20px 20px">Shared Playlist</h2>
        <swiper
          :modules="modules"
          :slides-per-view="5"
          :slides-per-group="5"
          :space-between="10"
          navigation
          :pagination="{ clickable: true }"
          :scrollbar="{ draggable: true }"
          style="height: 200px"
          v-if="userDadesStore.friendSharePlaylists.length !== 0"
        >
          <swiper-slide
            v-for="(playlist, index) in userDadesStore.friendSharePlaylists"
            :key="index"
          >
            <router-link
              v-if="
                playlist.visibility == 'shared' ||
                (friendsDadesStore.checkFriendExists(route.params.friendId) &&
                  playlist.visibility == 'only friends')
              "
              :to="{ name: 'Playlist', params: { playlistId: playlist.id } }"
              @click="getPlaylistInfo(playlist)"
            >
              <div class="playlist-item" style="height: 80%">
                <div class="playlist-img">
                  <img
                    v-if="playlist.cover"
                    :src="playlist.cover"
                    style="height: 100%; width: 100%"
                  />
                </div>
                <div class="contingut">
                  <font-awesome-icon
                    :icon="['fas', 'fa-list']"
                    style="color: white; font-weight: bold"
                  />&nbsp;
                  <span style="color: white; font-weight: bold">{{
                    playlist.name
                  }}</span>
                </div>
              </div>
            </router-link>
          </swiper-slide>
        </swiper>
        <div class="swiper-pagination"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUtilsStore } from "@/stores/utils.js";
import { useUserDadesStore } from "@/stores/userDades.js";
import { useMusicDadesStore } from "@/stores/musicDades.js";
import { useFriendsDadesStore } from "@/stores/friendsDades.js";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
const utilsStore = useUtilsStore();
const userDadesStore = useUserDadesStore();
const musicDadesStore = useMusicDadesStore();
const friendsDadesStore = useFriendsDadesStore();
const router = useRouter();

const modules = ref([Navigation, Pagination, Scrollbar, A11y]);
import { useRoute } from "vue-router";
const route = useRoute();
const friendRequestSendedSuccess = ref(false);

function getPlaylistInfo(playlist) {
  musicDadesStore.getCurrentPlaylist(playlist);
  musicDadesStore.getPlaylistById(playlist.id);
}

async function addFriendAction(id) {
  const response = await friendsDadesStore.addFriend(id);
  if (response && response.status === 200) {
    friendRequestSendedSuccess.value = true;
    setTimeout(() => {
      friendRequestSendedSuccess.value = false;
    }, 1500);
  } else {
    alert("You have already send a friend request!");
  }
}

function goToHomePage() {
  router.push("/home");
}

onMounted(() => {
  userDadesStore
    .getOtherUserProfileInformation(route.params.friendId)
    .then((response) => {
      if (response && response.status === 200) {
        userDadesStore.setOtherUserProfileInformations(response);
      }
    })
    .catch((error) => {
      console.error(error);
    });
  userDadesStore
    .getOtherUserSharedPlaylists(route.params.friendId)
    .then()
    .catch((error) => {
      console.error(error);
    });
});
</script>

<style scoped>
.profileContainer {
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

.resizeContainer {
  width: 70vw;
  left: 25vw;
  transition: left 0.5s, width 0.5s;
}

.information {
  height: 30vh;
  margin: 10px 10px 0px 10px;
  border-radius: 10px 10px 0 0;
  display: flex;
  justify-content: start;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.userName {
  color: white;
  font-size: 7vh;
  margin: 0 15px 0 0;
}

.content {
  display: flex;
  border-radius: 0 0 10px 10px;
  margin: 0 10px 10px 10px;
  overflow-x: hidden;
  overflow-y: auto;
  flex-grow: 1;
  position: relative;
}

.imgBox {
  height: 20vh;
  width: 20vh;
  border: 1px solid white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px;
  background-color: white;
  overflow: hidden;
  background-size: cover;
  /* Ajusta el tamaño de la imagen al contenedor */
  background-repeat: no-repeat;
}

.userInformation {
  padding: 20px 50px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.informationContent {
  background-color: transparent;
  color: white;
  border-radius: 5px;
  border: none;
  font-size: 20px;
  margin: 20px 15px;
}

.sharePlayListSection {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 10px;
  height: 200px;
}

.contingut {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-left: 8px;
  width: 92%;
}

.playlist-item {
  position: relative;
  flex-basis: calc(33.33% - 20px);
  max-width: 100%;
  border-radius: 20px;
  background-image: linear-gradient(
    to left top,
    rgba(237, 65, 65, 0.8),
    rgba(235, 161, 161, 0.999)
  );
  box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.7);
  height: 250px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis; /* Agrega puntos suspensivos si el texto no cabe en una sola línea */
  color: white;
}

.playlist-img {
  display: block;
  height: 75%;
  width: 100%;
  background: bisque;
  margin: auto;
  margin-bottom: 10px;
  /* box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.5); */
  background-image: url("../assets/imatgePlaylist.jpg");
  background-position: center;
  background-repeat: repeat;
  background-size: cover;
}

.addFriend {
  position: absolute;
  right: 70px;
  top: 30px;
  cursor: pointer;
}

.addFriend:hover {
  color: #06d47b;
}

.close-profile {
  position: absolute;
  right: 30px;
  top: 30px;
  cursor: pointer;
}

.close-profile:hover {
  color: rgb(172, 61, 61);
}

.addFriendIcon,
.closeProfileIcon {
  height: 30px;
  width: 30px;
}

.friendRequestSendedSuccess {
  position: absolute;
  opacity: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  top: 0;
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
    top: 5%;
    opacity: 1;
    color: #06d47b;
  }
  100% {
    opacity: 1;
    top: 5%;
    color: #06d47b;
  }
}

@keyframes smoke {
  0% {
    opacity: 1;
    color: #06d47b;
    top: 5%;
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
.content::-webkit-scrollbar {
  width: 0;
}

.content::-webkit-scrollbar-thumb {
  background: transparent;
}
</style>
