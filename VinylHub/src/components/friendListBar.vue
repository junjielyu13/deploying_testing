<template>
    <div class="bg-dark separator">
        
    </div>
    <div class="friend-list bg-dark" :class="{'d-flex justify-content-center align-items-center': props.friendNumbers===0}">
        <div class="empty-list" v-if="props.friendNumbers===0">
            <h4>Your friend list is empty.</h4>
            <h4>Begin adding friends to start sharing your favorite tunes!</h4>
        </div>
        <ul v-else>
            <li v-for="friendNumber in props.friendNumbers" :key="friendNumber">
                <img src="img.jpg" alt="img"> friend {{ friendNumber }}
            </li>
        </ul>
    </div>
</template>

<script setup>

const props = defineProps({
    friendNumbers: Number
})
</script>

<style scoped>
.separator{
    height: 10vh;
    border-radius: 10px 0 0 0;
}
.friend-list{
    flex-grow: 1;
    overflow-y: auto;
    margin-bottom: 10px;
    border-radius: 0 0 0 10px;
}

ul {
    list-style: none;
    padding-inline-start: 0;
}

ul li {
    height: 50px;
    cursor: pointer;
    border-radius: 10px;
    margin: 0 10px;
    padding-left: 20px;
    line-height: 50px;
}

ul li img {
    padding-right: 10px;
}

li:hover{
    background-color: rgb(86, 87, 87);
}
.friend-list::-webkit-scrollbar {
  width: 15px;
}
.friend-list:hover::-webkit-scrollbar-thumb {
  background-color: #666;
}

.friend-list:hover::-webkit-scrollbar-track {
  background-color: #333;
}

.empty-list{
    padding: 40px;
    text-align: center;
}
</style>