<template>
    <div class="noLoggedSidebar d-flex justify-content-center align-items-center bg-dark">
        <div class="text-center" style="padding: 10px 30px;">
            <h3>It seems you are not logged in.</h3>
        </div>

        <div class="text-center" style="padding: 10px 30px;">
            <h3>Don't you have an account?</h3>
        </div>
        <div class="loginButton" @click="userStatusStore.GoTologinView(router)">
            <button class="btn btn-outline-light">Log in / Register</button>
        </div>
    </div>
</template>

<script setup>
import { useUserStatusStore } from '@/stores/userStatus.js';
import { useRouter } from 'vue-router';
const userStatusStore = useUserStatusStore();
const router = useRouter();
</script>

<style scoped>
.noLoggedSidebar{
    flex-grow: 1;
    flex-direction: column;
    margin: 10px 0;
    border-radius: 10px 0 0 10px;
}

.loginButton{
    margin: 20px 0 50px 0;
}

</style>