<template>
<div class="user-container bg-dark" style="">
  <div class="user-content" style="display: flex; align-items: center; ">
    <div class="user-image">
      <!-- <img src="usuario.jpg" alt="Image"> -->
    </div>
    <div class="user-details">
      <h4 class="text-overflow">{{userDadesStore.username.slice(0,10) }}</h4>
    </div>
  </div>
  <div class="edit-profile" @click="goToProfile()">
    <font-awesome-icon :icon="['fas', 'user']" class="profileIcon"/>
  </div>
</div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useUserDadesStore } from "@/stores/userDades.js";
const userDadesStore = useUserDadesStore();
const router = useRouter();
function goToProfile(){
  router.push("/user/profile");
}
</script>

<style scoped>

.user-container {
  display: flex;
  align-items: center;
  flex-direction: row;
  padding: 30px 10px 20px 10px;
  justify-content: space-between;
  border-radius: 10px 0 0 0;
  margin: 10px 0 0 0;
}

.user-image img {
  max-width: 100%;
  height: auto;
  margin-right: 10px;
}

.user-details {
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.profileIcon{
    width: 24px;
    height: 24px;
    cursor: pointer;
}

.text-overflow {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}
</style>