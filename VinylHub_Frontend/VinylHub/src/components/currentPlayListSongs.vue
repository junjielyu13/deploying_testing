<script setup>
import { useUtilsStore} from '@/stores/utils.js';
const utilsStore = useUtilsStore();
const props = defineProps({
    song: Object
})
</script>

<template>
    <div class="row song">
        <div class="col-3">
            <div class="cover">
                <img :src="props.song.cover" alt="img">
            </div>
        </div>
        <div class="col-9 title" :class="{ 'selectedSong' : utilsStore.songSelectedId === song.id}">
            {{ props.song.title }}
        </div>
    </div>
</template>

<style scoped>
    .song {
        cursor: pointer;
        width: 100%;
        height: 50px;
        margin-left: auto;
        margin-right: auto;
        border-radius: 10px;
        line-height: 50px;
    }
    .song:hover {
        background-color: rgb(86, 87, 87);
    }
    .cover{
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .cover img{
        width: 80%;
        height: 80%;
        border-radius: 10px;
    }

    .selectedSong{
        color: green;
        opacity: 1 !important;
    }
</style>