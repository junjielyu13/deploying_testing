<script setup>
const props = defineProps({
    isLogged: Boolean
})
</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark justify-content-start">
        <div class="navigation">
                <ul class="navbar-nav flex-column">
                    <li class="navbar-brand">
                        <router-link class="nav-link rounded text-white d-flex align-items-center" to="/home">
                            <font-awesome-icon :icon="['fas', 'house']" class="homeIcon"/>
                            Home
                        </router-link>
                    </li>
                    <li class="navbar-brand">
                        <router-link class="nav-link rounded text-white d-flex align-items-center" to="/search">
                            <font-awesome-icon :icon="['fas', 'magnifying-glass']" class="magnifyingGlassIcon"/>
                            Search
                        </router-link>
                    </li>
                    <li class="navbar-brand" v-if="isLogged">
                        <router-link class="nav-link rounded text-white d-flex align-items-center" to="/my-library">
                            <font-awesome-icon :icon="['fas', 'music']" class="musicIcon"/>
                        My Library
                    </router-link>
                    </li>
                </ul>
        </div>
    </nav>
</template>

<style scoped>
.navbar {
    border-radius: 0 10px 10px 0;
    width: 100%;
    margin: 10px 0;
}
.navigation{
    width: 100%;
}

.navbar-brand{
    width: 95%;
    margin: auto auto;
}

.navbar-brand a.router-link-active{
    text-decoration: none;
    background-color: hsla(160, 100%, 37%, 0.5);
    transition: 0.4s;
    .homeIcon, .magnifyingGlassIcon, .musicIcon{
        color: #08ff00;
    }
}

.homeIcon, .magnifyingGlassIcon, .musicIcon{
    width: 24px;
    height: 24px;
    margin-right: 10px;
}
</style>