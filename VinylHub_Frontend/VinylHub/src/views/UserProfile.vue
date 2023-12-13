<template>
    <div class="profileContainer"
    :class="{ 'resizeContainer': utilsStore.isCollapsed }" v-if="userStatusStore.isLogged">
        <div class="information bg-dark">
            <div class="imgBox" 
            :style="{ 'background-image': userDadesStore.userImage ? 'url(' + userDadesStore.userImage + ')': '' }" v-if="!utilsStore.profileEditMode">
            </div>
            <div style="cursor: pointer; box-shadow: 0 0 10px rgb(255, 235, 167);" class="imgBox imgBoxWithEditMode" v-else data-bs-toggle="modal" data-bs-target="#staticBackdrop"
            :style="{ 'background-image': userDadesStore.tempUserImage ? 'url(' + userDadesStore.tempUserImage + ')' : '' }">
            </div>
            <div class="userName" v-if="!utilsStore.profileEditMode">
                <input style="font-size: 7vh;" class="inputContent" type="name" id="name" name="name" v-model="userDadesStore.username" disabled><br>
            </div>
            <div class="userName" v-else>
                <input style="font-size: 7vh; cursor: text;" class="inputContent editContent" type="name" id="name" name="name" v-model="username"><br>
            </div>
            <div class="edit-profile" @click="utilsStore.toggleEditMode()">
                <font-awesome-icon :icon="['fas', 'user-pen']" class="editProfileIcon"/>
            </div>
            <div class="close-profile" @click="goToHomePage()">
                <font-awesome-icon :icon="['fas', 'xmark']" class="closeProfileIcon" />
            </div>

        </div>
        <div class="content bg-dark d-flex flex-column">
            <form @submit.prevent v-if="!utilsStore.profileEditMode">
                <label for="email">Email:</label>
                <input class="inputContent" type="email" id="email" name="email" v-model="userDadesStore.email" disabled><br>
                <label for="gender">Gender:</label>
                <input class="inputContent" type="text" id="gender" name="gender" v-model="userDadesStore.gender" disabled><br>
            </form>
            <form @submit.prevent v-else>
                <label for="email">Email:</label>
                <input class="inputContent editContent" type="email" id="email" name="email" v-model="email"><br>
                <label for="gender">Gender:</label>
                <input class="inputContent" type="text" id="gender" name="gender" v-model="gender" disabled><br>
                <input style="margin-left: 20px;" type="radio" id="maleRadio" value="Male" v-model="gender"> <label for="maleRadio">Male</label>
                <input type="radio" id="femaleRadio" value="Female" v-model="gender"> <label for="maleRadio">Female</label><br>
                <br>
                <button class="btn btn-primary saveBtn" @click="save()">Save Changes</button>
            </form>
            <div class="sharePlayListSection">
                <h2 style="margin: 20px 20px;">Shared Playlist</h2>
                <swiper :modules="modules" :slides-per-view="5" :slides-per-group="5" :space-between="10" navigation
                    :pagination="{ clickable: true }" :scrollbar="{ draggable: true }" style="height: 200px;"
                    v-if="userDadesStore.sharePlaylists.length !== 0">
                    <swiper-slide v-for="(playlist, index) in userDadesStore.sharePlaylists" :key="index">
                        <router-link :to="{ name: 'Playlist', params: { playlistId: playlist.id } }"
                            @click="getPlaylistInfo(playlist)">
                            <div class="playlist-item" style="height: 80%;">
                                <div class="playlist-img">
                                    <img v-if="playlist.cover" :src="playlist.cover" style="height: 100%; width: 100%;">
                                </div>
                                <div class="contingut">
                                    <font-awesome-icon :icon="['fas', 'fa-list']"
                                        style="color: white; font-weight: bold;" />&nbsp;
                                    <span style="color: white; font-weight: bold;">{{ playlist.name }}</span>
                                </div>
                            </div>
                        </router-link>
                    </swiper-slide>
                </swiper>
                <div class="swiper-pagination"></div> 
            </div>
            <div class="botton-section">
                <button class="btn btn-outline-primary resetPwdBtn" @click="goToResetPasswordView()">Reset Password</button>
                <button class="btn btn-outline-light signoutBtn" @click="userStatusStore.signOut(router)">Sign Out</button>
                <button class="btn btn-danger deleteAccoutBtn" data-bs-toggle="modal" data-bs-target="#staticBackdrop1" >Delete Account</button>
            </div>
            
        </div>
    </div>
    <div class="profileContainer d-flex justify-content-center align-items-center"
    :class="{ 'resizeContainer': utilsStore.isCollapsed }" v-else>
        <h1>Please Log in to see your profile!</h1>
    </div>
    <uploadImageModal></uploadImageModal>

    <!-- Modal -->
    <div class="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content bg-dark">
        <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Warning</h5>
        </div>
        <div class="modal-body">
            Are you sure to delete the Account? This action will be irreversible!
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="deleteAccountAction()">Understood</button>
        </div>
        </div>
    </div>
    </div>
</template>

<script setup>
import { useUtilsStore } from "@/stores/utils.js"
import { useUserDadesStore } from "@/stores/userDades.js"
import { useUserStatusStore } from "@/stores/userStatus.js"
import { useMusicDadesStore } from '@/stores/musicDades.js';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { ref, onMounted, watch } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
import uploadImageModal from "@/components/uploadImageModal.vue";
import { useRouter } from "vue-router";
const router = useRouter();
const utilsStore = useUtilsStore();
const userDadesStore = useUserDadesStore();
const userStatusStore = useUserStatusStore();
const musicDadesStore = useMusicDadesStore();
const username = ref('');
const email = ref('');
const gender = ref('');
const modules = ref([Navigation, Pagination, Scrollbar, A11y]);

function getPlaylistInfo(playlist){
    musicDadesStore.getCurrentPlaylist(playlist);
    musicDadesStore.getPlaylistById(playlist.id);
}

async function save(){

    const response = await userDadesStore.saveNewUserInformation(username.value,email.value,gender.value);
    if(response[0].status === 200){
        userDadesStore.username = response[0].data.data.username;
        userDadesStore.email = response[0].data.data.email;
        userDadesStore.gender = response[0].data.data.name;
    }
    if(response[1] && response[1].status === 200){
        userDadesStore.userImage = response[1].data.url;
    }
    utilsStore.toggleEditMode();
}

async function deleteAccountAction(){
    const response = await userStatusStore.deleteAccount();
    if(response && response.status === 200){
        userDadesStore.cleanUserInformation();
        userStatusStore.isLogged = false;
        router.replace("/home");
    }
}
function goToResetPasswordView(){
    router.push("/reset-password");
}

function goToHomePage(){
    router.push("/home");
}

onMounted(() => {
  username.value = userDadesStore.username;
  email.value = userDadesStore.email;
  gender.value = userDadesStore.gender;
  userDadesStore.tempUserImage = userDadesStore.userImage;
  userDadesStore.getSharedPlaylists();
});

// Ensure to get latest correct user profile values
watch(() => utilsStore.profileEditMode, (newValue, oldValue) => {
    if (newValue && !oldValue){
        username.value = userDadesStore.username;
        email.value = userDadesStore.email;
        gender.value = userDadesStore.gender;
        userDadesStore.tempUserImage = userDadesStore.userImage;
    }
});

onBeforeRouteLeave((to, from, next) => {
  utilsStore.profileEditMode = false;
  next();
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

.resizeContainer{
  width: 70vw;
  left: 25vw;
  transition: left 0.5s, width 0.5s;
}

.information{
    height: 30vh;
    margin: 10px 10px 0px 10px;
    border-radius: 10px 10px 0 0;
    display: flex;
    justify-content: start;
    align-items: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1); 
}

.content{
    border-radius: 0 0 10px 10px;
    margin: 0 10px 10px 10px;
    overflow-x: hidden;
    overflow-y: auto;
    flex-grow: 1;
    position: relative;
}

.imgBox{
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
    background-size: cover; /* Ajusta el tamaño de la imagen al contenedor */
    background-repeat: no-repeat;
}

.imgBoxWithEditMode:hover{
    animation: scale 1.5s infinite linear;
}

@keyframes scale{
    0%{
        scale: 1;
    }
    50%{
        scale: 1.1;
    }
    100%{
        scale: 1;
    }
}

.edit-profile{
    position: absolute;
    right: 70px;
    top: 30px;
    cursor: pointer;
}
.edit-profile:hover{
    color: #06d47b;
}
.close-profile{
    position: absolute;
    right: 30px;
    top: 30px;
    cursor: pointer;
}

.close-profile:hover{
    color: rgb(172, 61, 61);
}
.editProfileIcon, .closeProfileIcon{
    height: 30px;
    width: 30px;
}


form{
    margin: 20px 50px;
}

label{
    font-size: 20px;
    margin: 20px;
    font-weight: bold;
}
.inputContent{
    background-color: transparent;
    color: white;
    border-radius: 5px;
    border: none;
    font-size: 20px;
    margin: 0 15px 0 0;
}

.editContent{
    border: 1px solid rgba(255, 255, 255, 0.5);
}

.saveBtn{
    margin: 20px;
}

.botton-section{
    position: relative;
    margin-top:100px;
}
.signoutBtn{
    position: absolute;
    bottom: 20px;
    right: 10%;
    transform: translate(50%, -50%);
}

.resetPwdBtn{
    position: absolute;
    bottom: 20px;
    left: 10%;
    transform: translate(-50%, -50%);
}
.deleteAccoutBtn{
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translate(-50%, -50%);
}

.sharePlayListSection {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding-bottom: 10px;
    height: 300px;
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
  background-image: linear-gradient(to left top, rgba(237, 65, 65, 0.8), rgba(235, 161, 161, 0.999));
  box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.7);
  height: 250px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: white;
}

.playlist-img {
  display: block;
  height: 75%;
  width: 100%;
  background: bisque;
  margin: auto;
  margin-bottom: 10px;
  background-image: url('../assets/imatgePlaylist.jpg');
  background-position: center;
  background-repeat: repeat;
  background-size: cover;
}
.content::-webkit-scrollbar {
    width: 0;
}

.content::-webkit-scrollbar-thumb {
    background: transparent;
}
</style>