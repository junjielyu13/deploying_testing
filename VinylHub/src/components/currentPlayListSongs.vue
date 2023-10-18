<script setup>
const props = defineProps({
    name: String
})
</script>

<template>
    <div class="row song">
        <div class="col-3">
            <img src="../img/favorite.png" alt="img">
        </div>
        <div class="col-9">
            Lista {{ props.name }}
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
</style>