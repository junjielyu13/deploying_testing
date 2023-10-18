<template>
    <div class="noLoggedSidebar d-flex justify-content-center align-items-center bg-dark">
        <div class="text-center">
            <h3>It seems you are not logged in.</h3>
        </div>
        <div class="loginButton">
            <button class="btn btn-outline-light">Log in</button>
        </div>

        <div class="text-center">
            <h3>Don't you have a account?</h3>
        </div>
        <div class="register-link">
            <RouterLink to="/home" style="text-decoration: underline;">Register Now</RouterLink>
        </div>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
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

.register-link{
    margin: 20px 0;
}
</style>